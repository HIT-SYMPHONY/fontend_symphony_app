import { useQuery } from '@tanstack/react-query'
import TiptapEditor from 'components/TiptapEditor'
import { competitionKeys } from 'constants/queryKeys'
import React from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { safeParse } from 'utils/formatters'

function CompetitionInfosPage() {
  const navigate = useNavigate()
  const { competitionId } = useParams()
  const {
    data: competition,
    isLoading,
    isError,
  } = useQuery({
    queryKey: competitionKeys.detail(competitionId),
    queryFn: () => getCompetitionById(competitionId).then((res) => res.data),
    enabled: !!competitionId,
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Không thể tải thông tin cuộc thi.')
      navigate('/home')
    },
  })

  return (
    <>
      {!isLoading && competition && (
        <TiptapEditor
          value={safeParse(competition.description)}
          editable={false}
          editorClassName='!rounded-lg !min-h-[300px] !max-h-[300px]'></TiptapEditor>
      )}
    </>
  )
}

export default CompetitionInfosPage
