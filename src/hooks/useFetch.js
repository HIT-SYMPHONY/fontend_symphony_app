import { useEffect, useState, useRef } from 'react'
import { api } from '../apis'
import useAuth from './useAuth' 

const useFetch = (url) => {
  const { user } = useAuth() 
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const isMounted = useRef(true)

  useEffect(() => {
    isMounted.current = true
    if (!url || !user) {
      setLoading(false)
      return
    }

    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await api.get(url)
        if (isMounted.current) {
          setData(response)
        }
      } catch (err) {
        if (isMounted.current) {
          setError(err)
        }
      } finally {
        if (isMounted.current) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted.current = false
    }
  }, [url, user])

  return { data, loading, error }
}

export default useFetch
