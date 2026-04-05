import React from 'react'
import { Icon } from '@iconify/react'
import { useNavigate, useParams } from 'react-router-dom'
import TiptapEditor from 'components/TiptapEditor'
import { useQuery } from '@tanstack/react-query'
import { getPostById } from 'apis/post.api'
import { getMyCommentInPost } from 'apis/commentPost.api'
import { postKeys, commentPostKeys } from 'constants/queryKeys'

const Comment = () => {
  const navigate = useNavigate()
  const { examId } = useParams()

 const { data: postData, isLoading: loadingPost } = useQuery({
    queryKey: postKeys.detail(examId), 
    queryFn: () => getPostById(examId),
    enabled: !!examId,
    select: (response) => response?.data || response,
  })

  const { data: myComment, isLoading: loadingComment } = useQuery({
    queryKey: commentPostKeys.myCommentInPost(examId),
    queryFn: () => getMyCommentInPost(examId),
    enabled: !!examId,
    retry: false,
    select: (response) => response?.data || response,
  })

  if (loadingPost || loadingComment) {
    return <div>Đang tải dữ liệu...</div>
  }

  return (
    <>
      <div className='flex justify-between box-border'>
        <div className='flex flex-col gap-[10px] flex-1'>
          <div className='flex items-center gap-[15px]'>
            <i
              className='fa-solid fa-arrow-left text-[#ff6911] text-[30px] cursor-pointer'
              onClick={() => navigate(-1)}></i>
            <h2 className='text-xl font-bold'>{postData?.classRoomName || 'Tên lớp học'}</h2>
          </div>

          <div className='flex items-center gap-[20px]'>
            <strong className='w-[35px] h-[35px] bg-[#ff6911] rounded-[10px] text-[#fdfdfd] flex justify-center items-center'>
              1
            </strong>
            <strong className='text-[#ff6911]'>
              <i className='fa-solid fa-angles-right'></i>
            </strong>
            <strong>{postData?.title || 'Bài kiểm tra'}</strong>
          </div>

          <div className='border-2 border-[#eeecec] rounded-[10px] p-[10px] shadow-[0_4px_8px_rgba(0,0,0,0.1)] w-full'>
            <strong>Nội dung: </strong>
            <div className='mt-2'>
              <TiptapEditor value={postData?.content} editable={false} />
            </div>
          </div>

          <div className='border-2 border-[#eeecec] rounded-[10px] p-[10px] shadow-[0_4px_8px_rgba(0,0,0,0.1)] w-full mt-[20px]'>
            <strong>Nhận xét: </strong>
            <div className='mt-2'>
              <TiptapEditor value={myComment?.feedback} editable={false} />
            </div>
          </div>
        </div>

        <div className='flex flex-col justify-end px-4 pt-4 gap-[20px]'>
          <div className='p-[12px] bg-[#ff6911] rounded-[10px] text-[#fdfdfd] flex flex-col items-center'>
            <span>Điểm</span>
            <h2 className='text-2xl font-bold m-0'>
              {myComment?.score !== undefined && myComment?.score !== null ? myComment.score : '-'}
            </h2>
          </div>

          <h3 className='text-center bg-[#a2a2a2] rounded-[10px] text-[#fdfdfd] flex flex-col justify-center items-center p-2 m-0'>
            <span className='text-xl font-bold'>ĐÃ</span>
            <span className='text-xl font-bold'>NỘP</span>
          </h3>
        </div>
      </div>
    </>
  )
}

export default Comment
