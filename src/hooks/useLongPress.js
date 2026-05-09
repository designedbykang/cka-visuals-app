import { useRef } from 'react'

export function useLongPress(onLongPress, delay = 600) {
  const timer = useRef(null)

  function start() {
    timer.current = setTimeout(() => {
      onLongPress()
    }, delay)
  }

  function cancel() {
    clearTimeout(timer.current)
  }

  return {
    onMouseDown: start,
    onMouseUp: cancel,
    onMouseLeave: cancel,
    onTouchStart: start,
    onTouchEnd: cancel,
  }
}
