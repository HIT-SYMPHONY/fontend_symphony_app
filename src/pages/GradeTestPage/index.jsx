import React, { useState, useEffect } from 'react'
import TiptapEditor from 'components/TiptapEditor'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'

import { getCommetPostById, markCommentPost } from 'apis/commentPost.api'
import { gradingSchema } from 'utils/commentPostValidate'
import { commentPostKeys } from 'constants/queryKeys'

function GradeTestPage() {
  const { commentId } = useParams()
  const queryClient = useQueryClient()

  const [isEditing, setIsEditing] = useState(false)

  // Fetch Student's Submission
  const { data: commentPostData, isLoading: loadingCommentPost } = useQuery({
    queryKey: commentPostKeys.detail(commentId),
    queryFn: () => getCommetPostById(commentId),
    enabled: !!commentId,
    select: (response) => response?.data || response,
  })

  // Setup Form
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

  // Pre-fill form when data is loaded or edit mode is toggled
  useEffect(() => {
    if (commentPostData) {
      let parsedFeedback = commentPostData.feedback
      try {
        parsedFeedback = JSON.parse(commentPostData.feedback)
      } catch (e) {
        // Fallback if it's already an object or raw text
      }
      reset({
        score: commentPostData.score ?? '', // Pre-fill score if it exists
        feedback: parsedFeedback || '',
      })
    }
  }, [commentPostData, reset, isEditing])

  // Mutation for saving the grade
  const markCommentMutation = useMutation({
    mutationFn: (payload) => markCommentPost(commentId, payload),
    onMutate: () => toast.loading('Đang lưu điểm...'),
    onSuccess: (data, variables, context) => {
      toast.success('Chấm điểm thành công!', { id: context })
      setIsEditing(false) 
      queryClient.invalidateQueries({ queryKey: commentPostKeys.detail(commentId) })
    },
    onError: (error, variables, context) => {
      const message = error.response?.data?.message || 'Lỗi khi lưu điểm.'
      toast.error(typeof message === 'object' ? Object.values(message).join('\n') : message, {
        id: context,
      })
    },
  })

  const onSubmit = (data) => {
    // Format payload for the backend
    const payload = {
      score: Number(data.score),
      // Stringify feedback exactly like we did when students submit answers
      feedback: data.feedback ? JSON.stringify(data.feedback) : null,
    }
    markCommentMutation.mutate(payload)
  }

  // Show toast error if user tries to save an invalid score
  useEffect(() => {
    if (errors.score) {
      toast.error(errors.score.message)
    }
  }, [errors.score])

  if (loadingCommentPost) return <div className='p-6'>Đang tải dữ liệu bài làm...</div>
  if (!commentPostData) return <div className='p-6'>Không tìm thấy bài nộp.</div>

  return (
    // We wrap the entire layout in a form so the "LƯU" button acts as a submit trigger
    <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4'>
      {/* Left Column: Content & Feedback */}
      <div className='flex flex-1 flex-col'>
        <div className='mb-4'>
          <p className='text-lg font-semibold mb-2'>
            Bài làm của <span className='text-primary'>{commentPostData.fullName}</span> (
            {commentPostData.studentCode}):
          </p>
          {/* Read-only editor for the student's submitted answer */}
          <TiptapEditor
            value={commentPostData.content}
            editable={false}
            editorClassName='shadow-md !min-h-[200px]'
          />
        </div>

        <div>
          <p className='text-lg font-semibold mb-2'>Nhận xét: </p>
          {/* Editable editor for the teacher's feedback */}
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

      {/* Right Column: Floating Action Buttons */}
      <div className='self-end flex flex-col gap-6 mb-[12px] min-w-[100px]'>
        {/* Score Display / Input Block */}
        <div className='flex rounded-[20px] text-white flex-col text-center text-2xl bg-primary p-3 shadow-lg'>
          <p className='text-sm font-semibold mb-1 uppercase tracking-wider'>Điểm</p>
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
                  className='w-16 h-10 mx-auto text-black text-center text-xl font-bold rounded-lg outline-none focus:ring-2 focus:ring-white'
                  autoFocus
                />
              )}
            />
          ) : (
            <p className='font-bold'>{commentPostData?.score ?? '-'}</p>
          )}
        </div>

        {/* Action Button Block */}
        {isEditing ? (
          <div className='flex flex-col gap-2'>
            <button
              type='submit'
              disabled={markCommentMutation.isPending}
              className='flex rounded-[20px] text-white flex-col text-center items-center justify-center text-xl font-bold bg-primary p-4 shadow-lg hover:bg-orange-600 transition-colors cursor-pointer border-none'>
              <p>{markCommentMutation.isPending ? '...' : 'LƯU'}</p>
            </button>
            <button
              type='button'
              onClick={() => {
                setIsEditing(false)
                reset() // Revert changes if cancelled
              }}
              className='text-gray-500 text-sm font-semibold hover:text-gray-700 underline mt-1 text-center'>
              Hủy
            </button>
          </div>
        ) : (
          <button
            type='button'
            onClick={() => setIsEditing(true)}
            className='flex rounded-[20px] text-white flex-col text-center items-center justify-center text-xl font-bold bg-[#A2A2A2] p-4 shadow-lg hover:bg-gray-500 transition-colors cursor-pointer border-none'>
            <p>SỬA</p>
            <p>NX</p>
          </button>
        )}
      </div>
    </form>
  )
}

export default GradeTestPage
