import { Icon } from '@iconify/react'
import NavigationDropdown from 'components/NavigationDropdown'
import useDebounce from 'hooks/useDebounce'
import React, { useEffect, useMemo, useState } from 'react'
import { Outlet, useNavigate, useParams, useSearchParams } from 'react-router-dom'

function LeaderManageCompetitionPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get('keyword') || '')
  const debouncedSearchQuery = useDebounce(searchQuery, 500)
  useEffect(() => {
    setSearchParams(
      (prevParams) => {
        if (debouncedSearchQuery) {
          prevParams.set('keyword', debouncedSearchQuery)
        } else {
          prevParams.delete('keyword')
        }
        return prevParams
      },
      { replace: true },
    )
  }, [debouncedSearchQuery, setSearchParams])
  const { competitionId } = useParams()
  const linkOptions = useMemo(() => {
    if (!competitionId) return []
    const basePath = `/manage/competitions/${competitionId}`
    return [
      { option: '---Danh mục---', link: basePath },
      { option: 'Giới thiệu', link: `${basePath}/infos` },
      { option: 'Thể lệ', link: `${basePath}/rules` },
      { option: 'Quản lý bài thi', link: `${basePath}/tests` },
      { option: 'Danh sách thí sinh', link: `${basePath}/participants` },
    ]
  }, [competitionId])
  return (
    <div>
      <div className='flex gap-1 items-center mb-4'>
        <Icon
          icon='mdi:book-account'
          className='manage-competition__start__Icon'
          width='40'
          height='40'
          color='#F06C25'
        />
        <h2 className='text-2xl font-bold'>Quản lý cuộc thi</h2>
      </div>
      <div className='flex items-center gap-4 mb-6'>
        <i
          className='fa-solid fa-arrow-left text-primary cursor-pointer text-[1.2rem]'
          onClick={() => navigate(-1)}></i>
        <NavigationDropdown options={linkOptions} />
        <div className='flex flex-1 items-center gap-2 border border-[#b5b5b5] rounded-[30px] p-[5px] pl-[15px] min-w-[200px]'>
          <input
            type='text'
            placeholder='Nhập tìm kiếm...'
            className='border-none outline-none flex-1'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <i className='fa-solid fa-magnifying-glass manage-infor__search__icon' />
        </div>
        <button className='cursor-not-allowed text-[#a2a2a2] border-2 border-[#a2a2a2] py-1 px-4 text-lg rounded-[32px]'>
          <i className='fa-solid fa-plus'></i> <span>Tạo mới</span>
        </button>
      </div>
      <Outlet></Outlet>
    </div>
  )
}

export default LeaderManageCompetitionPage
