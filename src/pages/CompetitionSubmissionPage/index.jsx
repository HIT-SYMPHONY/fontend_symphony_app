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
  getMyCommentInCompetition,
  updateMyComment,
} from 'apis/commentCompetition.api'
import { commentCompetitionCreationSchema } from 'utils/commentCompetition'
import TiptapEditor from 'components/TiptapEditor'
import { getCompetitionById } from 'apis/competition.api'
import TextMessage from 'components/TextMessage'
import SubmissionPageSkeleton from 'components/SubmissionPageSkeleton'
import ApiErrorDisplay from 'components/ApiErrorDisplay'
import { commentCompetitionKeys, competitionKeys } from 'constants/queryKeys'

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
    queryKey: competitionKeys.detail(competitionId),
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
    queryKey: commentCompetitionKeys.myComment(competitionId),
    queryFn: () => getMyCommentInCompetition(competitionId),
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
      queryClient.invalidateQueries({ queryKey: commentCompetitionKeys.myComment(competitionId) })
    },
    onError: (error, variables, context) => {
      const message = error.response?.data?.message || 'Lỗi khi nộp bài.'
      toast.error(
        typeof message === 'object'
          ? Object.values(message).join('\n')
          : message,
        { id: context },
      )
      setIsModalVisible(false)
    },
  })

  const updateCommentMutation = useMutation({
    mutationFn: (payload) => updateMyComment(competitionId, payload),
    onMutate: () => toast.loading('Đang cập nhật...'),
    onSuccess: (data, variables, context) => {
      toast.success('Cập nhật bài thành công!', { id: context })
      setIsModalVisible(false)
      queryClient.invalidateQueries({ queryKey: commentCompetitionKeys.myComment(competitionId) })
    },
    onError: (error, variables, context) => {
      const message = error.response?.data?.message || 'Lỗi khi cập nhật bài.'
      toast.error(
        typeof message === 'object'
          ? Object.values(message).join('\n')
          : message,
        { id: context },
      )
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
        content: pendingFormData.content
          ? JSON.stringify(pendingFormData.content)
          : '',
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

  const isRealCommentError =
    myCommentError &&
    myCommentError.response?.status !== 404 &&
    myCommentError.response?.status !== 400

  if (competitionError || isRealCommentError) {
    return (
      <ApiErrorDisplay
        refetchQueries={[refetchCompetition, refetchMyComment]}
      />
    )
  }

  if (!competitionData) {
    return <TextMessage text='Không tìm thấy bài kiểm tra.'></TextMessage>
  }

  const isPendingMutate =
    createCommentMutation.isPending || updateCommentMutation.isPending

  return (
    <>
      <div className='flex flex-col gap-[10px]'>
        <div className='flex items-center gap-[15px]'>
          <i
            className='fa-solid fa-arrow-left cursor-pointer text-[30px] text-[#ff6911]'
            onClick={() => navigate(-1)}></i>
          <h2 className='text-xl font-semibold'>
            {competitionData?.name || 'Tên cuộc thi'}
          </h2>
        </div>

        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-[20px]'></div>

          <div className='rounded-[10px] bg-[#ff6911] px-[10px] py-[5px]'>
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
              <strong className='text-xl font-bold text-[#ff0000]'>
                00:00:00
              </strong>
            )}
          </div>
        </div>

        <div className='rounded-[10px] border-2 border-[#eeecec] p-[10px] shadow-[0_4px_8px_rgba(0,0,0,0.1)]'>
          <strong className='mb-2 block'>Đề bài: </strong>
          <TiptapEditor
            value={competitionData?.content}
            editable={false}
            editorClassName='!max-h-[300px]'
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='rounded-[10px] border-2 border-[#eeecec] p-[10px] shadow-[0_4px_8px_rgba(0,0,0,0.1)]'>
            <p className='mb-[4px] block font-bold'>
              Trả lời
              {isSubmitted && !isExpired && (
                <span className='ml-2 text-sm font-semibold text-green-600'>
                  (Bạn đã nộp bài, có thể chỉnh sửa trước khi hết giờ)
                </span>
              )}
              {isExpired && (
                <span className='ml-2 text-sm font-normal text-red-600'>
                  (Đã hết thời gian làm bài)
                </span>
              )}
              :
            </p>

            <div className='flex items-end gap-4 rounded-[10px] pb-[10px]'>
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

              <div className='mb-[10px] flex flex-col gap-2'>
                {!isExpired && (
                  <button
                    type='submit'
                    title={isSubmitted ? 'Cập nhật' : 'Nộp bài'}
                    disabled={isPendingMutate}
                    className='flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-orange-50'>
                    {isPendingMutate ? (
                      <span className='text-[12px] text-[#F06C25]'>
                        Đang tải...
                      </span>
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
                    className='flex h-[40px] w-[40px] items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200'
                    onClick={() =>
                      navigate(`/competitions/${competitionId}/score`)
                    }>
                    <Icon
                      icon='material-symbols:grading'
                      color='#3b82f6'
                      width='30'
                      height='30'
                    />
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
        <p className='mt-1 text-sm text-gray-500'>
          Bạn vẫn có thể tiếp tục chỉnh sửa miễn là chưa hết thời gian.
        </p>
      </Modal>
    </>
  )
}

export default CompetitionSubmissionPage
