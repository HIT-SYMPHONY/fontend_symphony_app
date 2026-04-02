import { Skeleton } from 'antd'
import React from 'react'

const SubmissionPageSkeleton = () => {
  return (
    <div className='flex flex-col gap-[10px]'>
      {/* Header Skeleton */}
      <div className='flex items-center gap-[15px]'>
        <Skeleton.Button active shape='square' size='small' />
        <Skeleton.Input active size='small' style={{ width: 250 }} />
      </div>

      <div className='flex justify-end'>
        <Skeleton.Button active style={{ width: 100, borderRadius: 10 }} />
      </div>

      <div className='border-2 border-[#eeecec] rounded-[10px] p-[10px]'>
        <Skeleton active paragraph={{ rows: 6 }} />
      </div>

      <div className='border-2 border-[#eeecec] rounded-[10px] p-[10px] mt-4'>
        <Skeleton active title={false} paragraph={{ rows: 4 }} />
        <div className='flex justify-end mt-2'>
          <Skeleton.Button active shape='square' size='large' style={{width: 40, minWidth: 40}} />
        </div>
      </div>
    </div>
  )
}

export default SubmissionPageSkeleton
