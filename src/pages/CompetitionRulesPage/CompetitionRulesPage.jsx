import { useQuery } from '@tanstack/react-query'
import TiptapEditor from 'components/TiptapEditor'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { safeParse } from 'utils/formatters'
import TextMessage from 'components/TextMessage'
import { Skeleton } from 'antd'

function CompetitionRulesPage() {
  const navigate = useNavigate()
  const { competitionId } = useParams()
  const {
    data: competition,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['competition', competitionId],
    queryFn: () => getCompetitionById(competitionId).then((res) => res.data),
    enabled: !!competitionId,
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Không thể tải thông tin cuộc thi.')
      navigate('/home')
    },
  })
  if (isLoading) return <Skeleton active></Skeleton>

  return (
    <>
      <TiptapEditor
        value={safeParse(competition.rule)}
        editable={false}
        editorClassName='!rounded-lg !min-h-[300px] !max-h-[300px]'></TiptapEditor>
    </>
  )
}

export default CompetitionRulesPage
