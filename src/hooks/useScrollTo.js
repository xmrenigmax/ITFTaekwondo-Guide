
import { useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const useScrollTo = () => {
  const location = useLocation()
  
  const scrollTo = useCallback((target = 'top', behavior = 'smooth') => {
    console.log(`Scrolling to: ${target}`)
    
    // First scroll attempt
    if (target === 'top') {
      window.scrollTo({ top: 0, left: 0, behavior })
    } else if (typeof target === 'string' && target.startsWith('#')) {
      const element = document.getElementById(target.slice(1))
      if (element) {
        element.scrollIntoView({ behavior, block: 'start' })
      } else {
        console.warn(`Element with id "${target.slice(1)}" not found`)
      }
    } else if (typeof target === 'number') {
      window.scrollTo({ top: target, left: 0, behavior })
    } else if (typeof target === 'string') {
      // Assume it's a CSS selector
      const element = document.querySelector(target)
      if (element) {
        element.scrollIntoView({ behavior, block: 'start' })
      } else {
        console.warn(`Element with selector "${target}" not found`)
      }
    }
    
    // Double-scroll technique for reliability
    setTimeout(() => {
      if (target === 'top' && window.scrollY > 0) {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      } else if (typeof target === 'string' && target.startsWith('#')) {
        const element = document.getElementById(target.slice(1))
        element?.scrollIntoView({ behavior: 'instant', block: 'start' })
      }
    }, 50)
  }, [])

  // Auto-scroll on route changes
  useEffect(() => {
    scrollTo('top', 'smooth')
  }, [location.pathname, scrollTo])

  return scrollTo
}