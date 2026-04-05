import { useSelector, useDispatch } from 'react-redux'
import { save, clear } from '../store/auth.store'
import { useQueryClient } from '@tanstack/react-query'

const useAuth = () => {
  const user = useSelector((state) => state.auth.auth)
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const saveUser = (payload) => {
    dispatch(save(payload))
  }

  const clearUser = () => {
    queryClient.clear()
    dispatch(clear())
  }

  return {
    user,
    saveUser,
    clearUser,
  }
}

export default useAuth
