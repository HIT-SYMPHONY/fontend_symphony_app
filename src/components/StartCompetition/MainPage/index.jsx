import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import {
  useInfiniteQuery,
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { Skeleton } from 'antd'
import { getAllCompetitions } from '../../../apis/competition.api'
import { registerCompetition } from '../../../apis/competitionUser.api'
import { getMyCompetitions } from '../../../apis/user.api'
import {
  formatDate,
  safeParse,
  translateStatus,
} from '../../../utils/formatters'
import LoadMoreButton from '../../LoadMoreButton'
import EndOfListMessage from '../../EndOfListMessage'
import './style.scss'
import TextMessage from 'components/TextMessage'
import TiptapEditor from 'components/TiptapEditor'
import ApiErrorDisplay from 'components/ApiErrorDisplay'
import { competitionKeys, userKeys } from 'constants/queryKeys'

const MainCompetition = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()
  const globalSearch = searchParams.get('q') || ''
  const [loadingId, setLoadingId] = useState(null)

  const listParams = {
    sortBy: 'startTime',
    isAscending: false,
    keyword: globalSearch,
  }
  const myParams = { status: 'ONGOING' }

  const {
    data: competitionsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingCompetitions,
    error: competitionsError,
  } = useInfiniteQuery({
    queryKey: competitionKeys.list(listParams),
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getAllCompetitions({
        ...listParams,
        pageNum: pageParam,
      })
      return response.data
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.pageNum < lastPage.meta.totalPages) {
        return lastPage.meta.pageNum + 1
      }
      return undefined
    },
  })

  const { data: myCompetitions = [], isLoading: isLoadingMyCompetitions } =
    useQuery({
      queryKey: userKeys.myCompetitions(),
      queryFn: async () => {
        const response = await getMyCompetitions(myParams)
        return response.data
      },
    })

  const mutation = useMutation({
    mutationFn: (competitionId) => registerCompetition(competitionId),
    onMutate: (id) => setLoadingId(id),
    onSuccess: () => {
      toast.success('Đăng ký tham gia thành công!')
      queryClient.invalidateQueries({ queryKey: competitionKeys.lists() })
      queryClient.invalidateQueries({ queryKey: userKeys.myCompetitions() })
    },
    onError: (error) => {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Có lỗi xảy ra khi đăng ký.')
      }
    },
    onSettled: () => setLoadingId(null),
  })

  const handleButtonClick = (e, contest) => {
    e.stopPropagation()
    if (contest.status === 'COMPLETED') return

    if (contest.isRegistered) {
      navigate(`/competitions/${contest.id}`)
    } else {
      mutation.mutate(contest.id)
    }
  }

  const competitions =
    competitionsData?.pages.flatMap((page) => page.items) || []
  const firstMyCompetition = myCompetitions[0]

  if (competitionsError) {
    return (
      <ApiErrorDisplay
        title='Lỗi tải dữ liệu'
        subTitle='Không thể tải danh sách cuộc thi. Vui lòng thử lại.'
      />
    )
  }

  return (
    <div className='competition'>
      {/* ================= LEFT SECTION ================= */}
      <div className='competition__left'>
        <div className='competition__left__title'>
          <Icon
            icon='streamline-ultimate:ranking-stars-ribbon-bold'
            width='30'
            height='30'
            className='competition__left__title__icon'
          />
          <h2>Cuộc thi</h2>
        </div>

        {/* HERO IMAGE */}
        <div className='competition__left__board'>
          {isLoadingCompetitions ? (
            <Skeleton.Node active style={{ width: '100%', height: '250px' }}>
              <Icon
                icon='lucide:image'
                color='#bfbfbf'
                width='40'
                height='40'
              />
            </Skeleton.Node>
          ) : competitions[0]?.image ? (
            <img src={competitions[0]?.image} alt={competitions[0]?.name} />
          ) : null}
          <i className='fa-solid fa-circle-info board'></i>
        </div>

        <div className='competition__left__bang'>
          {isLoadingCompetitions &&
            Array.from({ length: 4 }).map((_, idx) => (
              <div
                className='competition__left__bang__box'
                key={`skeleton-${idx}`}>
                <div className='competition__left__bang__box__board'>
                  <Skeleton.Image
                    active
                    style={{ width: '300px', height: '100px' }}
                  />
                </div>
                <div className='competition__left__bang__box__information flex w-full flex-col justify-center py-2'>
                  <Skeleton
                    active
                    title={{ width: '80%' }}
                    paragraph={{ rows: 2, width: ['40%', '60%'] }}
                  />
                </div>
              </div>
            ))}

          {!isLoadingCompetitions && competitions.length === 0 && (
            <TextMessage text={'Chưa có cuộc thi nào.'}></TextMessage>
          )}

          {!isLoadingCompetitions &&
            competitions.map((contest) => (
              <div
                className='competition__left__bang__box'
                key={contest.id}
                onClick={() => navigate(`/competitions/${contest.id}`)}>
                <div className='competition__left__bang__box__board'>
                  {contest.image && (
                    <img src={contest.image} alt={contest.name} />
                  )}
                </div>
                <div className='competition__left__bang__box__information'>
                  <h4 className='text-xl font-semibold'>{contest.name}</h4>
                  <div className='competition__left__bang__box__information__list items-center'>
                    <span className='competition__left__bang__box__information__list__span1 my-1 rounded-md px-1 text-lg'>
                      {translateStatus(contest.status)}
                    </span>
                    <button
                      className={`competition__left__bang__box__information__list__span2 py-1 font-semibold ${
                        contest.status === 'COMPLETED' ? '!bg-[#828282]' : ''
                      }`}
                      onClick={(e) => handleButtonClick(e, contest)}
                      disabled={
                        loadingId === contest.id ||
                        contest.status === 'COMPLETED'
                      }>
                      {loadingId === contest.id
                        ? 'Đang xử lý...'
                        : contest.status === 'COMPLETED'
                          ? 'Kết thúc'
                          : contest.isRegistered
                            ? 'Làm bài'
                            : 'Đăng ký'}
                    </button>
                    <i className='fa-solid fa-circle-info '></i>
                  </div>
                  <p>Ngày bắt đầu: {formatDate(contest.startTime)}</p>
                </div>
              </div>
            ))}

          {!isLoadingCompetitions && competitions.length > 0 && (
            <>
              <LoadMoreButton
                isLoading={isFetchingNextPage}
                hasMore={hasNextPage}
                onClick={() => fetchNextPage()}
              />
              <EndOfListMessage
                isLoading={isLoadingCompetitions}
                hasMore={hasNextPage}
                itemCount={competitions.length}
                itemName='cuộc thi'
              />
            </>
          )}
        </div>
      </div>

      <div className='competition__among'></div>

      {/* ================= RIGHT SECTION ================= */}
      <div className='competition__right'>
        <h2>Bạn đang tham gia</h2>
        <div className='competition__right__body'>
          {isLoadingMyCompetitions ? (
            <div className='competition__right__body__board'>
              <Skeleton.Image
                active
                style={{ width: '100%', height: '120px' }}
              />
            </div>
          ) : myCompetitions.length > 0 ? (
            <div
              className={`competition__right__body__board ${
                !firstMyCompetition?.image && '!bg-[#ccc]'
              }`}
              onClick={() =>
                navigate(`/competitions/${firstMyCompetition?.id}`)
              }>
              {firstMyCompetition?.image ? (
                <img
                  src={firstMyCompetition.image}
                  alt={firstMyCompetition.name}
                />
              ) : (
                <h1 className='text-xl'>{firstMyCompetition?.name}</h1>
              )}
            </div>
          ) : (
            <TextMessage text='Bạn chưa tham gia cuộc thi nào.'></TextMessage>
          )}
          <hr />
        </div>

        <h3>Giới thiệu</h3>
        <div>
          {isLoadingMyCompetitions ? (
            <Skeleton
              active
              title={false}
              paragraph={{ rows: 6 }}
              className='mt-4'
            />
          ) : firstMyCompetition?.description ? (
            <TiptapEditor
              value={safeParse(firstMyCompetition.description)}
              editable={false}
              editorClassName='!rounded-lg'></TiptapEditor>
          ) : (
            <TextMessage text='Chưa có giới thiệu.'></TextMessage>
          )}
        </div>
      </div>
    </div>
  )
}

export default MainCompetition
