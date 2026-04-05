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
import TiptapEditor from 'components/TiptapEditor'
import { commentPostKeys, postKeys } from 'constants/queryKeys'

const { Timer } = Statistic

const Exam = () => {
  const navigate = useNavigate()
  const { classId, examId } = useParams()
  const queryClient = useQueryClient()

  const [submit, setSubmit] = useState(false)
  const [targetTime, setTargetTime] = useState(null)
  const [isWarningTime, setIsWarninogTime] = useState(false)
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
    queryKey: postKeys.detail(examId),
    queryFn: () => getPostById(examId),
    enabled: !!examId,
    select: (response) => response?.data || response,
  })

  const {
    data: myCommentData,
    isLoading: loadingMyComment,
    isSuccess: hasSubmittedPrev,
  } = useQuery({
    queryKey: commentPostKeys.myCommentInPost(examId), // REFACTORED
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
      queryClient.invalidateQueries({ queryKey: commentPostKeys.myCommentInPost(examId) })
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
      queryClient.invalidateQueries({ queryKey: commentPostKeys.myCommentInPost(examId) })
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

  const handleTimeUp = () => {
    if (hasEndedRef.current) return
    hasEndedRef.current = true
    setIsExpired(true)
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
      <div className='flex flex-col gap-[10px]'>
        <div className='flex items-center gap-[15px]'>
          <i
            className='fa-solid fa-arrow-left text-[#ff6911] text-[30px] cursor-pointer'
            onClick={() => navigate(-1)}></i>
          <h2 className='text-xl font-semibold'>{postData.classRoomName || 'Tên lớp học'}</h2>
        </div>

        <div className='flex justify-between items-center'>
          <div className='flex gap-[20px] items-center'>
            <strong className='bg-[#ff6911] text-[#ffefe4] w-[35px] h-[35px] rounded-[10px] flex justify-center items-center'>
              1
            </strong>
            <strong className='text-[#ff6911]'>
              <i className='fa-solid fa-angles-right'></i>
            </strong>
            <strong>{postData.title}</strong>
          </div>

          <div className='py-[5px] px-[10px] bg-[#ff6911] rounded-[10px]'>
            {targetTime ? (
              <Timer
                type='countdown'
                value={targetTime}
                onFinish={handleTimeUp}
                onChange={handleTimerChange}
                format='HH:mm:ss'
                valueStyle={{
                  color: isWarningTime || isExpired ? '#ff0000' : '#ffefe4',
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  lineHeight: 'inherit',
                }}
              />
            ) : (
              <strong className='text-[#ff0000] text-xl font-bold'>00:00:00</strong>
            )}
          </div>
        </div>

        <div className='border-2 border-[#eeecec] rounded-[10px] p-[10px] shadow-[0_4px_8px_rgba(0,0,0,0.1)]'>
          <strong className='block mb-2'>Nội dung bài kiểm tra: </strong>
          <TiptapEditor
            value={postData.content}
            editable={false}
            editorClassName='!max-h-[300px]'
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='border-2 border-[#eeecec] rounded-[10px] p-[10px] shadow-[0_4px_8px_rgba(0,0,0,0.1)]'>
            <p className='block mb-[4px] font-bold'>
              Trả lời
              {isSubmitted && !isExpired && (
                <span className='text-green-600 text-sm ml-2 font-semibold'>
                  (Bạn đã nộp bài, có thể chỉnh sửa trước khi hết giờ)
                </span>
              )}
              {isExpired && (
                <span className='text-red-600 text-sm ml-2 font-normal'>
                  (Đã hết thời gian làm bài)
                </span>
              )}
              :
            </p>

            <div className='rounded-[10px] flex gap-4 pb-[10px] items-end'>
              <Controller
                name='content'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TiptapEditor
                    value={field.value}
                    onChange={field.onChange}
                    error={error}
                    editable={!isExpired}
                    editorClassName='!max-h-[200px]'
                    className='flex-1'
                  />
                )}
              />

              <div className='flex flex-col mb-[10px] gap-2'>
                {!isExpired && (
                  <button
                    type='submit'
                    title={isSubmitted ? 'Cập nhật' : 'Nộp bài'}
                    disabled={isPendingMutate}
                    className='w-[40px] h-[40px] rounded-full flex items-center justify-center cursor-pointer hover:bg-orange-50 transition-colors'>
                    {isPendingMutate ? (
                      <span className='text-[12px] text-[#F06C25]'>Đang tải...</span>
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
                      />
                    )}
                  </button>
                )}

                {isSubmitted && (
                  <button
                    type='button'
                    title='Xem điểm'
                    className='w-[40px] h-[40px] flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors'
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
