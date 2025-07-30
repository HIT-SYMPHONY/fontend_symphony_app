import { useState } from 'react'

const useToggleViews = () => {
  const [showMain, setShowMain] = useState(false)
  const [showNoti, setShowNoti] = useState(false)

  return {
    showMain,
    setShowMain,
    showNoti,
    setShowNoti,
  }
}

export default useToggleViews
