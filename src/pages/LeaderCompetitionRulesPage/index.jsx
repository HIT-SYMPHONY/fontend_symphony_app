import { useQuery } from '@tanstack/react-query'
import { Skeleton } from 'antd'
import { getCompetitionById } from 'apis/competition.api'
import ApiErrorDisplay from 'components/ApiErrorDisplay'
import TiptapEditor from 'components/TiptapEditor'
import { competitionKeys } from 'constants/queryKeys'
import { useParams } from 'react-router-dom'
import { safeParse } from 'utils/formatters'

function LeaderCompetitionRulesPage() {
  const { competitionId } = useParams()
  const labelClass = 'text-neutral-grey mb-2'
  const {
    data: competition,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: competitionKeys.detail(competitionId),
    queryFn: () => getCompetitionById(competitionId).then((res) => res.data),
    enabled: !!competitionId,
  })
  if (isLoading) {
    return (
      <>
        <div className='border-3 border-[#F0F0F0] shadow-[0px_0px_4px_2px_#0000000D] rounded-[32px] px-4 py-4'>
          <div className='flex items-center font-semibold text-2xl gap-2 mb-2'>
            <i className='fa-solid fa-circle-info text-primary'></i>
            <span>Thể lệ</span>
          </div>
          <div className='font-semibold text-xl pl-8'>
            <div className='mt-2'>
              <p className={labelClass}>Nội dung</p>
              <Skeleton paragraph= {{rows: 6}}></Skeleton>
            </div>
          </div>
        </div>
      </>
    )
  }

  if (isError) {
    return <ApiErrorDisplay title='Lỗi tải thông tin cuộc thi' refetchQueries={[refetch]} />
  }
  return (
    <div className='border-3 border-[#F0F0F0] shadow-[0px_0px_4px_2px_#0000000D] rounded-[32px] px-4 py-4'>
      <div className='flex items-center font-semibold text-2xl gap-2 mb-2'>
        <i className='fa-solid fa-circle-info text-primary'></i>
        <span>Thể lệ</span>
      </div>
      <div className='font-semibold text-xl pl-8 '>
        <div className='mt-2'>
          <p className={labelClass}>Nội dung</p>
          <TiptapEditor
            value={safeParse(competition?.rule)}
            editable={false}
            editorClassName='!min-h-[300px] !max-h-[400px]'
          />
        </div>
      </div>
    </div>
  )
}

export default LeaderCompetitionRulesPage
