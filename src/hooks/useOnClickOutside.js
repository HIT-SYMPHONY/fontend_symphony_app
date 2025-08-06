import { useEffect } from 'react'
const useOnClickOutside = (refs, handler) => {
  useEffect(() => {
    const listener = (event) => {
      const isClickInside = refs.some((ref) => ref.current && ref.current.contains(event.target))
      if (isClickInside) {
        return
      }
      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [refs, handler])
}

export default useOnClickOutside
