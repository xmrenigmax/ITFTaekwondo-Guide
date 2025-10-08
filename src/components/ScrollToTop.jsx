
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const ScrollController = ({ 
  triggers = [],
  dependencies = [],
  onRouteChange = true,
  behavior = 'smooth',
  scrollTo = 'top', // 'top', 'bottom', or element ID
  children 
}) => {
  const location = useLocation()

  useEffect(() => {
    if (onRouteChange) {
      scrollToPosition(scrollTo, behavior)
    }
  }, [location.pathname, onRouteChange, behavior, scrollTo])

  useEffect(() => {
    if (triggers.some(trigger => trigger)) {
      scrollToPosition(scrollTo, behavior)
    }
  }, [...triggers, ...dependencies, behavior, scrollTo])

  const scrollToPosition = (position, behavior) => {
    if (position === 'top') {
      window.scrollTo({ top: 0, left: 0, behavior })
    } else if (position === 'bottom') {
      window.scrollTo({ top: document.body.scrollHeight, behavior })
    } else if (typeof position === 'string' && position.startsWith('#')) {
      const element = document.getElementById(position.slice(1))
      element?.scrollIntoView({ behavior })
    }
  }

  return children || null
}