import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from 'antd'

import { getMyCompetitions } from 'apis/user.api'
import { userKeys } from 'constants/queryKeys'
import TextMessage from 'components/TextMessage'
import ApiErrorDisplay from 'components/ApiErrorDisplay'
import { translateStatus } from 'utils/formatters'
import './style.scss'
import CompetitionCommentAccordion from 'components/ComeptitionCommentAccordion/ComeptitionCommentAccordion'

const TableCompetition = ({ onSetSub }) => {
  const [expandedItems, setExpandedItems] = useState({})

  const {
    data: competitions = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: userKeys.myCompetitions(),
    queryFn: () =>
      getMyCompetitions().then((res) => res.data?.items || res.data || []),
  })

  const toggleAccordion = (competitionId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [competitionId]: !prev[competitionId],
    }))
  }

  if (isError) {
    return (
      <ApiErrorDisplay
        title='Lỗi tải danh sách cuộc thi'
        refetchQueries={[refetch]}
      />
    )
  }

  return (
    <div className='table-result'>
      {/* HEADER */}
      <div className='table-result__head'>
        <div className='table-result__head__icon'>
          <Icon
            icon='fluent:clipboard-text-32-filled'
            width='30'
            height='30'
            className='table-result__head__icon__fill'
          />
          <h2>Bảng kết quả</h2>
        </div>
        <div className='table-result__head__toggle'>
          <p className='cursor-pointer' onClick={() => onSetSub(true)}>
            Học tập
          </p>
          <p className='toggle cursor-pointer' onClick={() => onSetSub(false)}>
            Cuộc thi
          </p>
        </div>
      </div>

      {/* INITIAL LOADING STATE */}
      {isLoading && (
        <div className='p-4'>
          <Skeleton
            active
            avatar={{ size: 80, shape: 'square' }}
            paragraph={{ rows: 2 }}
          />
          <Skeleton
            active
            avatar={{ size: 80, shape: 'square' }}
            paragraph={{ rows: 2 }}
            className='mt-4'
          />
        </div>
      )}

      {/* EMPTY STATE */}
      {!isLoading && competitions.length === 0 && (
        <TextMessage text='Bạn chưa tham gia cuộc thi nào.' />
      )}

      {/* BODY LIST */}
      <div className='table-result__body'>
        {competitions.map((competition) => {
          const isExpanded = !!expandedItems[competition.id]

          return (
            <div className='body' key={competition.id}>
              {/* Competition Header Row */}
              <div
                className='body__img cursor-pointer'
                onClick={() => toggleAccordion(competition.id)}>
                {/* Image or Fallback */}
                <div className='body__img__hinhanh flex items-center justify-center overflow-hidden'>
                  {competition.image ? (
                    <img
                      src={competition.image}
                      alt='competition cover'
                      className='h-full w-full object-cover'
                    />
                  ) : (
                    <Icon
                      icon='streamline-ultimate:ranking-stars-ribbon-bold'
                      className='text-3xl text-gray-400'
                    />
                  )}
                </div>

                <div className='flex flex-1 items-center gap-1 pr-5'>
                  <div className='flex-1'>
                    <h3>{competition.name || 'Chưa cập nhật'}</h3>
                    <span className='rounded-[4px] bg-neutral-light p-1 text-primary'>
                      {translateStatus(competition.status)}
                    </span>
                  </div>
                  <div>
                    <Icon
                      icon={
                        isExpanded ? 'mingcute:up-fill' : 'mingcute:down-fill'
                      }
                      width='24'
                      height='24'
                      className='space__mau text-primary'
                    />
                  </div>
                </div>
              </div>

              {isExpanded && (
                <CompetitionCommentAccordion competition={competition} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TableCompetition
