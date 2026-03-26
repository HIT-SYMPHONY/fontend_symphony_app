import { useQuery } from '@tanstack/react-query'
import { Skeleton } from 'antd'
import { getCompetitionById } from 'apis/competition.api'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

function CompetitionSubmissionPage() {
  const navigate = useNavigate()
  const { competitionId } = useParams()
  const {
    data: competition,
    isLoading: isLoadingCompetition,
    isError: isErrorCompetition,
  } = useQuery({
    queryKey: ['competition', competitionId],
    queryFn: () => getCompetitionById(competitionId).then((res) => res.data),
    enabled: !!competitionId,
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Không thể tải thông tin cuộc thi.')
      navigate('/home')
    },
  })
  return <div></div>
}

export default CompetitionSubmissionPage
