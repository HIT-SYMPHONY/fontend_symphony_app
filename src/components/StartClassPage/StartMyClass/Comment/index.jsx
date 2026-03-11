import React from 'react'
import { Icon } from '@iconify/react'
import { useNavigate, useParams } from 'react-router-dom'
import TiptapEditor from 'components/TiptapEditor'
import './style.scss'
import { useQuery } from '@tanstack/react-query'
import { getPostById } from 'apis/post.api'
import { getMyCommentInPost } from 'apis/commentPost.api'

const Comment = () => {
  const navigate = useNavigate()
  const { examId } = useParams()
  const { data: postData, isLoading: loadingPost } = useQuery({
    queryKey: ['post', examId],
    queryFn: () => getPostById(examId),
    enabled: !!examId,
    select: (response) => response?.data || response,
  })
  const { data: myComment, isLoading: loadingComment } = useQuery({
    queryKey: ['myComment', examId],
    queryFn: () => getMyCommentInPost(examId),
    enabled: !!examId,
    retry: false,
    select: (response) => response?.data || response,
  })
  console.log(myComment)
  if (loadingPost || loadingComment) {
    return <div>Đang tải dữ liệu...</div>
  }
  return (
    <>
      <div className='comment'>
        <div className='comment__left'>
          <div className='comment__left-title'>
            <i className='fa-solid fa-arrow-left' onClick={() => navigate(-1)}></i>
            <h2>{postData?.classRoomName || 'Tên lớp học'}</h2>
          </div>
          <div className='comment__left__one'>
            <strong className='comment__left__one__than'>1</strong>
            <strong className='comment__left__one__more'>
              <i className='fa-solid fa-angles-right'></i>
            </strong>
            <strong>{postData?.title || 'Bài kiểm tra'}</strong>
          </div>

          <div className='comment__left__two'>
            <strong>Nội dung: </strong>
            <div className='mt-2'>
              <TiptapEditor value={postData?.content} editable={false} />
            </div>
          </div>
          <div className='comment__left__three' style={{ marginTop: '20px' }}>
            <strong>Nhận xét: </strong>
            <div className='mt-2'>
              <TiptapEditor value={myComment?.feedback} editable={false} />
            </div>
          </div>
        </div>

        <div className='comment__right'>
          <div className='comment__right__diem'>
            <span>Điểm</span>
            <h2>
              {myComment?.score !== undefined && myComment?.score !== null ? myComment.score : '-'}
            </h2>
          </div>
          <h3 className='comment__right__nop'>
            <span>ĐÃ</span>
            <span>NỘP</span>
          </h3>
        </div>
      </div>
    </>
  )
}

export default Comment
