import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'

import TiptapEditor from 'components/TiptapEditor'
import {
  markCommentCompetiton,
  getCommentCompetitionById,
} from 'apis/commentCompetition.api'
import { gradingSchema } from 'utils/commentCompetition'
import { commentCompetitionKeys } from 'constants/queryKeys'

function GradeCompetitionPage() {
  const { testId : commentId } = useParams()
  const queryClient = useQueryClient()

  const [isEditing, setIsEditing] = useState(false)

  const { data: commentData, isLoading: loadingComment } = useQuery({
    queryKey: commentCompetitionKeys.detail(commentId),
    queryFn: () => getCommentCompetitionById(commentId),
    enabled: !!commentId,
    select: (response) => response?.data || response,
  })

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(gradingSchema),
    defaultValues: {
      score: '',
      feedback: '',
    },
  })

  useEffect(() => {
    if (commentData) {
      let parsedFeedback = commentData.feedback
      try {
        parsedFeedback = JSON.parse(commentData.feedback)
      } catch (e) {
      }
      reset({
        score: commentData.score ?? '', 
        feedback: parsedFeedback || '',
      })
    }
  }, [commentData, reset, isEditing])

  // Mutation for saving the grade
  const markCommentMutation = useMutation({
    mutationFn: (payload) => markCommentCompetiton(commentId, payload),
    onMutate: () => toast.loading('Đang lưu điểm...'),
    onSuccess: (data, variables, context) => {
      toast.success('Chấm điểm thành công!', { id: context })
      setIsEditing(false) 
      queryClient.invalidateQueries({
        queryKey: commentCompetitionKeys.detail(commentId),
      })
    },
    onError: (error, variables, context) => {
      const message = error.response?.data?.message || 'Lỗi khi lưu điểm.'
      toast.error(
        typeof message === 'object'
          ? Object.values(message).join('\n')
          : message,
        {
          id: context,
        },
      )
    },
  })

  const onSubmit = (data) => {
    const payload = {
      score: Number(data.score),
      feedback: data.feedback ? JSON.stringify(data.feedback) : null,
    }
    markCommentMutation.mutate(payload)
  }

  useEffect(() => {
    if (errors.score) {
      toast.error(errors.score.message)
    }
  }, [errors.score])


  if (loadingComment)
    return <div className='p-6'>Đang tải dữ liệu bài làm...</div>
  if (!commentData) return <div className='p-6'>Không tìm thấy bài nộp.</div>

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4'>
      <div className='flex flex-1 flex-col'>
        <div className='mb-4'>
          <p className='mb-2 text-lg font-semibold'>
            Bài làm của{' '}
            <span className='text-primary'>{commentData.fullName}</span> (
            {commentData.studentCode}):
          </p>
          <TiptapEditor
            value={commentData.content}
            editable={false}
            editorClassName='shadow-md !min-h-[200px]'
          />
        </div>

        <div>
          <p className='mb-2 text-lg font-semibold'>Nhận xét: </p>
          <Controller
            name='feedback'
            control={control}
            render={({ field }) => (
              <TiptapEditor
                value={field.value}
                onChange={field.onChange}
                editable={true}
                editorClassName={`shadow-md !min-h-[200px] ${
                  isEditing ? 'border-2 border-primary/50' : ''
                }`}
              />
            )}
          />
        </div>
      </div>

      <div className='mb-[12px] flex min-w-[100px] flex-col gap-6 self-end'>
        <div className='flex flex-col rounded-[20px] bg-primary p-3 text-center text-2xl text-white shadow-lg'>
          <p className='mb-1 text-sm font-semibold uppercase tracking-wider'>
            Điểm
          </p>
          {isEditing ? (
            <Controller
              name='score'
              control={control}
              render={({ field }) => (
                <input
                  type='number'
                  step='0.1'
                  min='0'
                  max='10'
                  {...field}
                  className='mx-auto h-10 w-16 rounded-lg text-center text-xl font-bold text-black outline-none focus:ring-2 focus:ring-white'
                  autoFocus
                />
              )}
            />
          ) : (
            <p className='font-bold'>{commentData?.score ?? '-'}</p>
          )}
        </div>

        {isEditing ? (
          <div className='flex flex-col gap-2'>
            <button
              type='submit'
              disabled={markCommentMutation.isPending}
              className='flex cursor-pointer flex-col items-center justify-center rounded-[20px] border-none bg-primary p-4 text-center text-xl font-bold text-white shadow-lg transition-colors hover:bg-orange-600'>
              <p>{markCommentMutation.isPending ? '...' : 'LƯU'}</p>
            </button>
            <button
              type='button'
              onClick={() => {
                setIsEditing(false)
                reset() 
              }}
              className='mt-1 text-center text-sm font-semibold text-gray-500 underline hover:text-gray-700'>
              Hủy
            </button>
          </div>
        ) : (
          <button
            type='button'
            onClick={() => setIsEditing(true)}
            className='flex cursor-pointer flex-col items-center justify-center rounded-[20px] border-none bg-[#A2A2A2] p-4 text-center text-xl font-bold text-white shadow-lg transition-colors hover:bg-gray-500'>
            <p>SỬA</p>
            <p>NX</p>
          </button>
        )}
      </div>
    </form>
  )
}

export default GradeCompetitionPage
