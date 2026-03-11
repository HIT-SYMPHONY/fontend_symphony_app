import React, { useState, useEffect, useRef } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Modal, Statistic } from 'antd'

import { getPostById } from '../../../../apis/post.api'
import { createCommentPost, getMyCommentInPost, updateMyComment } from 'apis/commentPost.api'
import { commentPostCreationSchema } from '../../../../utils/commentPostValidate.js'
import './style.scss'
import TiptapEditor from 'components/TiptapEditor'

const { Timer } = Statistic

const Exam = () => {
  const navigate = useNavigate()
  const { classId, examId } = useParams()
  const queryClient = useQueryClient()

  const [submit, setSubmit] = useState(false)

  const [targetTime, setTargetTime] = useState(null)
  const [isWarningTime, setIsWarningTime] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [pendingFormData, setPendingFormData] = useState(null)

  const [isExpired, setIsExpired] = useState(false)

  const hasEndedRef = useRef(false)

  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      content: '', 
    },
    resolver: yupResolver(commentPostCreationSchema),
  })

  const {
    data: postData,
    isLoading: loadingPost,
    error: postError,
  } = useQuery({
    queryKey: ['post', examId],
    queryFn: () => getPostById(examId),
    enabled: !!examId,
    select: (response) => response?.data || response,
  })

  const {
    data: myCommentData,
    isLoading: loadingMyComment,
    isSuccess: hasSubmittedPrev,
  } = useQuery({
    queryKey: ['myComment', examId],
    queryFn: () => getMyCommentInPost(examId),
    enabled: !!examId,
    retry: false,
    select: (response) => response?.data || response,
  })

  const isSubmitted = submit || hasSubmittedPrev

  useEffect(() => {
    if (myCommentData?.content) {
      try {
        const parsedContent = JSON.parse(myCommentData.content)
        setValue('content', parsedContent)
      } catch (e) {
        setValue('content', myCommentData.content)
      }
    }
  }, [myCommentData, setValue])

  useEffect(() => {
    if (postData?.deadline) {
      const deadlineMs = new Date(postData.deadline).getTime()

      if (deadlineMs <= Date.now()) {
        setIsExpired(true)
        if (!hasEndedRef.current) {
          hasEndedRef.current = true
          toast.error('Bài kiểm tra đã hết hạn!')
        }
        return
      }

      setTargetTime(deadlineMs)
    }
  }, [postData])

  const createCommentMutation = useMutation({
    mutationFn: (payload) => createCommentPost(examId, payload),
    onMutate: () => toast.loading('Đang nộp bài...'),
    onSuccess: (data, variables, context) => {
      toast.success('Nộp bài thành công!', { id: context })
      setSubmit(true)
      setIsModalVisible(false)
      queryClient.invalidateQueries(['myComment', examId])
    },
    onError: (error, variables, context) => {
      const message = error.response?.data?.message || 'Lỗi khi nộp bài.'
      toast.error(typeof message === 'object' ? Object.values(message).join('\n') : message, {
        id: context,
      })
      setIsModalVisible(false)
    },
  })

  const updateCommentMutation = useMutation({
    mutationFn: (payload) => updateMyComment(examId, payload),
    onMutate: () => toast.loading('Đang cập nhật...'),
    onSuccess: (data, variables, context) => {
      toast.success('Cập nhật bài thành công!', { id: context })
      setIsModalVisible(false)
      queryClient.invalidateQueries(['myComment', examId])
    },
    onError: (error, variables, context) => {
      const message = error.response?.data?.message || 'Lỗi khi cập nhật bài.'
      toast.error(typeof message === 'object' ? Object.values(message).join('\n') : message, {
        id: context,
      })
      setIsModalVisible(false)
    },
  })

  const onSubmit = (data) => {
    if (!examId) {
      toast.error('Không có ID bài kiểm tra để nộp.')
      return
    }
    setPendingFormData(data)
    setIsModalVisible(true) 
  }

  const handleConfirmSubmit = () => {
    if (pendingFormData) {
      const formattedPayload = {
        content: pendingFormData.content ? JSON.stringify(pendingFormData.content) : '',
      }

      if (isSubmitted) {
        updateCommentMutation.mutate(formattedPayload)
      } else {
        createCommentMutation.mutate(formattedPayload)
      }
    }
  }

  // Fires dynamically when the countdown reaches 0
  const handleTimeUp = () => {
    if (hasEndedRef.current) return
    hasEndedRef.current = true
    setIsExpired(true) // Lock the exam
    toast.error('Hết giờ làm bài!')
  }

  const handleTimerChange = (val) => {
    if (val <= 300000 && !isWarningTime) {
      setIsWarningTime(true)
    }
  }

  if (loadingPost || loadingMyComment) return <div>Đang tải dữ liệu...</div>
  if (postError) return <div>Lỗi khi tải bài kiểm tra. Vui lòng thử lại.</div>
  if (!postData) return <div>Không tìm thấy bài kiểm tra.</div>

  const isPendingMutate = createCommentMutation.isPending || updateCommentMutation.isPending

  return (
    <>
      <div className='exam'>
        <div className='exam-title'>
          <i className='fa-solid fa-arrow-left' onClick={() => navigate(-1)}></i>
          <h2>{postData.classRoomName || 'Tên lớp học'}</h2>
        </div>
        <div className='exam__one'>
          <div className='exam__one__tap'>
            <strong className='exam__one__tap__than'>1</strong>
            <strong className='tapthan'>
              <i className='fa-solid fa-angles-right'></i>
            </strong>
            <strong>{postData.title}</strong>
          </div>

          <div className='exam__one__time'>
            {targetTime ? (
              <Timer
                type='countdown' // antd expects type="countdown" instead of <Countdown /> when importing from Statistic
                value={targetTime}
                onFinish={handleTimeUp}
                onChange={handleTimerChange}
                format='HH:mm:ss'
                valueStyle={{
                  color: isWarningTime || isExpired ? '#ff0000' : '#fff',
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  lineHeight: 'inherit',
                }}
              />
            ) : (
              <strong style={{ color: '#ff0000', fontSize: '1.25rem', fontWeight: 'bold' }}>
                00:00:00
              </strong>
            )}
          </div>
        </div>
        <div className='exam__two'>
          <strong>Nội dung bài kiểm tra: </strong>
          <TiptapEditor
            value={postData.content} // Readonly display of the prompt
            editable={false}
            editorClassName='!max-h-[300px]'
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='exam__nop'>
            <p className='exam__label'>
              Trả lời
              {isSubmitted && !isExpired && (
                <span className='text-green-600 text-sm ml-2'>
                  (Bạn đã nộp bài, có thể chỉnh sửa trước khi hết giờ)
                </span>
              )}
              {isExpired && (
                <span className='text-red-600 text-sm ml-2'>(Đã hết thời gian làm bài)</span>
              )}
              :
            </p>
            <div className='exam__input-wrapper'>
              <Controller
                name='content'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TiptapEditor
                    value={field.value}
                    onChange={field.onChange}
                    error={error}
                    editable={!isExpired} // Prevent editing if time is up
                    editorClassName='!max-h-[200px]'
                  />
                )}
              />

              {/* Action Buttons Wrapper */}
              <div className='exam__input-wrapper-actions'>
                {/* Only show Submit/Update button if the exam is NOT expired */}
                {!isExpired && (
                  <button
                    type='submit'
                    title={isSubmitted ? 'Cập nhật' : 'Nộp bài'}
                    disabled={isPendingMutate}>
                    {isPendingMutate ? (
                      <span style={{ fontSize: '12px', color: '#F06C25' }}>Đang tải...</span>
                    ) : (
                      <Icon
                        icon={
                          isSubmitted
                            ? 'boxicons:edit'
                            : 'streamline-flex:mail-send-email-message-circle-solid'
                        }
                        color='#F06C25'
                        width='30'
                        height='30'
                        className='exam__submit'
                      />
                    )}
                  </button>
                )}

                {/* Score Navigation Button (Always visible if they submitted) */}
                {isSubmitted && (
                  <button
                    type='button'
                    title='Xem điểm'
                    className='exam__submit-button bg-gray-100 hover:bg-gray-200 transition-colors'
                    onClick={() => navigate(`/my-classes/${classId}/exams/${examId}/score`)}>
                    <Icon icon='material-symbols:grading' color='#3b82f6' width='30' height='30' />
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>

      <Modal
        title={isSubmitted ? 'Xác nhận cập nhật bài' : 'Xác nhận nộp bài'}
        open={isModalVisible}
        onOk={handleConfirmSubmit}
        onCancel={() => setIsModalVisible(false)}
        okText={isSubmitted ? 'Cập nhật' : 'Nộp bài'}
        cancelText='Hủy'
        confirmLoading={isPendingMutate}
        centered>
        <p>
          {isSubmitted
            ? 'Bạn có chắc chắn muốn thay đổi câu trả lời của mình không?'
            : 'Bạn có chắc chắn muốn nộp bài không?'}
        </p>
        <p className='text-gray-500 text-sm mt-1'>
          Bạn vẫn có thể tiếp tục chỉnh sửa miễn là chưa hết thời gian.
        </p>
      </Modal>
    </>
  )
}

export default Exam
