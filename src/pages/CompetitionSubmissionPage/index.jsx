import React, { useState, useEffect, useRef } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Modal, Statistic } from 'antd'

import {
  createCommentCompetition,
  getMyCommentsInCompetition,
  updateMyComment,
} from 'apis/commentCompetition.api'
import { commentCompetitionCreationSchema } from 'utils/commentCompetition'
import TiptapEditor from 'components/TiptapEditor'
import { getCompetitionById } from 'apis/competition.api'
import TextMessage from 'components/TextMessage'
import SubmissionPageSkeleton from 'components/SubmissionPageSkeleton'
import ApiErrorDisplay from 'components/ApiErrorDisplay'

const { Timer } = Statistic

const CompetitionSubmissionPage = () => {
  const navigate = useNavigate()
  const { competitionId } = useParams()
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
    resolver: yupResolver(commentCompetitionCreationSchema),
  })

  const {
    data: competitionData,
    isLoading: loadingCompetition,
    error: competitionError,
    refetch: refetchCompetition,
  } = useQuery({
    queryKey: ['competition', competitionId],
    queryFn: () => getCompetitionById(competitionId),
    enabled: !!competitionId,
    select: (response) => response?.data || response,
  })

  const {
    data: myCommentData,
    isLoading: loadingMyComment,
    isSuccess: hasSubmittedPrev,
    error: myCommentError,
    refetch: refetchMyComment,
  } = useQuery({
    queryKey: ['competition-comment', competitionId],
    queryFn: () => getMyCommentsInCompetition(competitionId),
    enabled: !!competitionId,
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
    if (competitionData?.endTime) {
      const deadlineMs = new Date(competitionData.endTime).getTime()

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
  }, [competitionData])

  const createCommentMutation = useMutation({
    mutationFn: (payload) => createCommentCompetition(competitionId, payload),
    onMutate: () => toast.loading('Đang nộp bài...'),
    onSuccess: (data, variables, context) => {
      toast.success('Nộp bài thành công!', { id: context })
      setSubmit(true)
      setIsModalVisible(false)
      queryClient.invalidateQueries(['competition-comment', competitionId])
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
    mutationFn: (payload) => updateMyComment(competitionId, payload),
    onMutate: () => toast.loading('Đang cập nhật...'),
    onSuccess: (data, variables, context) => {
      toast.success('Cập nhật bài thành công!', { id: context })
      setIsModalVisible(false)
      queryClient.invalidateQueries(['competition-comment', competitionId])
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
    if (!competitionId) {
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

  if (loadingCompetition || loadingMyComment) return <SubmissionPageSkeleton />
  if (competitionError || myCommentError)
    return (
      <ApiErrorDisplay refetchQueries={[refetchCompetition, refetchMyComment]}></ApiErrorDisplay>
    )
  if (!competitionData) return <TextMessage text='Không tìm thấy bài kiểm tra.'></TextMessage>

  const isPendingMutate = createCommentMutation.isPending || updateCommentMutation.isPending

  return (
    <>
      <div className='flex flex-col gap-[10px]'>
        <div className='flex items-center gap-[15px]'>
          <i
            className='fa-solid fa-arrow-left text-[#ff6911] text-[30px] cursor-pointer'
            onClick={() => navigate(-1)}></i>
          <h2 className='text-xl font-semibold'>{competitionData?.name || 'Tên cuộc thi'}</h2>
        </div>

        <div className='flex justify-between items-center'>
          <div className='flex gap-[20px] items-center'></div>

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
          <strong className='block mb-2'>Đề bài: </strong>
          <TiptapEditor
            value={competitionData?.content}
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
                    onClick={() => navigate(`/competitions/${competitionId}/score`)}>
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

export default CompetitionSubmissionPage
