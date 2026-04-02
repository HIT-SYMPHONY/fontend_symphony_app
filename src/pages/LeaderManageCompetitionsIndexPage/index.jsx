import React from 'react'
import HITLogo from 'assets/img/HitLogo.svg'
function LeaderManageCompetitionsIndexPage() {
  return (
    <div>
      <p className='text-center text-neutral-grey text-2xl font-semibold mt-8'>Hãy chọn danh mục thông tin!</p>
      <div className='flex items-center justify-center'>
        <img src={HITLogo} alt='Hit logo' className='max-w-[550px]' />
      </div>
    </div>
  )
}

export default LeaderManageCompetitionsIndexPage
