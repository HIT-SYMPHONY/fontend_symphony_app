import { useEffect } from 'react'

/**
 * A custom hook that triggers a callback when a click is detected outside of a specified element.
 * @param {React.RefObject} ref - The ref attached to the element to monitor.
 * @param {function} handler - The function to call when an outside click is detected.
 */
const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      // Do nothing if clicking re's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
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
  }, [ref, handler])
}

export default useOnClickOutside
