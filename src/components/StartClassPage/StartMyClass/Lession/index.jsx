import React, { Suspense } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { getLessonById } from '../../../../apis/lesson.api'
import TextMessage from '../../../TextMessage'
import EditorPlaceholder from '../../../EditorPlaceHolder'
import { safeParse } from '../../../../utils/formatters'
import { lessonKeys } from 'constants/queryKeys'

import './style.scss'

const TiptapEditor = React.lazy(() => import('../../../TiptapEditor'))

const Lesson = () => {
  const navigate = useNavigate()
  const { lessonId } = useParams()

  const {
    data: lesson,
    isLoading,
    isError,
  } = useQuery({
    queryKey: lessonKeys.detail(lessonId), 
    queryFn: () => getLessonById(lessonId).then((res) => res.data),
    enabled: !!lessonId,
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Không thể tải thông tin bài học.')
      navigate('/home')
    },
  })

  const content = safeParse(lesson?.content)

  if (isLoading) {
    return <TextMessage text='Đang tải bài học...' />
  }

  if (isError || !lesson) {
    return <TextMessage text='Không thể hiển thị bài học.' />
  }

  return (
    <div className='viewlession'>
      <div className='viewlession-title'>
        <h2 className='text-4xl font-bold'>{lesson?.className || 'N/A'}</h2>
      </div>

      <div className='viewlession__one !p-0'>
        <strong className='text-2xl font-bold'>{lesson?.title || 'N/A'}</strong>
        <strong className='than'>
          <i className='fa-solid fa-angles-right'></i>
        </strong>
        <strong className='text-2xl font-bold'>Đề cương bài học</strong>
      </div>
      <strong className='text-xl'>Nội dung</strong>
      {lesson.content ? (
        <Suspense fallback={<EditorPlaceholder />}>
          <TiptapEditor value={content} editable={false} editorClassName='!max-h-[600px] shadow-sm'  />
        </Suspense>
      ) : (
        <p>Chưa có nội dung.</p>
      )}
    </div>
  )
}

export default Lesson
