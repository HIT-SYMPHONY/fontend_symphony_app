import { useEffect, useState, useRef } from 'react'
import { api } from '../apis'
const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Use a ref to track if the component is still mounted. This prevents
  // state updates on an unmounted component, which can cause memory leaks.
  const isMounted = useRef(true)

  useEffect(() => {
    // Set the mounted ref to true when the component mounts
    isMounted.current = true

    // Prevent fetching if the URL is not provided
    if (!url) {
      setLoading(false)
      return
    }

    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        // Use the private 'api' instance, which automatically adds the Bearer token
        // and handles token refreshing via its interceptors.
        const response = await api.get(url)

        // Only update state if the component is still mounted
        if (isMounted.current) {
          // The interceptor already extracts the `.data` part of the response,
          // so `response` is the actual data payload.
          setData(response)
        }
      } catch (err) {
        // Only update state if the component is still mounted
        if (isMounted.current) {
          setError(err)
        }
      } finally {
        // Only update state if the component is still mounted
        if (isMounted.current) {
          setLoading(false)
        }
      }
    }

    fetchData()

    // The cleanup function for the useEffect hook.
    // This runs when the component unmounts.
    return () => {
      isMounted.current = false
    }
  }, [url]) // This effect re-runs whenever the URL prop changes.

  return { data, loading, error }
}

export default useFetch
