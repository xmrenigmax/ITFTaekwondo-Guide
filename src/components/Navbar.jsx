import { cn } from "../lib/utils"
import { useEffect, useState, useRef } from "react"
import { ThemeToggle } from "./ThemeToggle"
import { Link, useLocation } from "react-router-dom"

// Separate main nav items from additional pages
const MainNavItems = [
  { name: "Techniques", href: "/techniques" },
  { name: "Patterns", href: "/patterns" },
  { name: "History", href: "/history" }
]

// Additional pages for dropdown (to hide in more menu)
const AdditionalNavItems = [
  { name: "Terminology", href: "/terminology" },
  { name: "Drills", href: "/drills" },
  { name: "Quiz", href: "/quiz" },
]
// Navbar component with responsive design and dynamic styling
export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const location = useLocation()
  const dropdownRef = useRef(null) // Ref for dropdown

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }

    {/* Attach and clean up event listener */}
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    {/* Attach and clean up scroll listener */}
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  // Check if we're on the home page AND not scrolled (hero section visible)
  const isOnHeroSection = location.pathname === "/" && !scrolled

  return (
    <nav
      className={cn(
        "fixed w-full z-50 top-0 left-0 transition-all duration-300", 
        scrolled ? "bg-background shadow-lg border-b border-border" : "bg-transparent",
        isOnHeroSection ? "text-white" : "text-foreground")}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className={cn(
                "text-xl font-bold transition-colors duration-200",isOnHeroSection 
                  ? "text-white hover:text-primary"
                  : "text-foreground hover:text-primary")}>
              ITF Taekwondo Guide
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-baseline space-x-4">
              {/* Main navigation items */}
              {MainNavItems.map((item) => (
                <Link key={item.name} to={item.href}
                  className={cn("px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",isOnHeroSection
                      ? "text-white hover:text-primary hover:bg-white/10"
                      : "navbar-link")}>
                  {item.name}
                </Link>
              ))}
              
              {/* Dropdown for additional pages */}
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={cn("px-3 py-2 rounded-md text-sm font-medium flex items-center transition-all duration-200",isOnHeroSection
                      ? "text-white hover:text-primary hover:bg-white/10"
                      : "navbar-link")}>
                  More
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Dropdown menu with higher z-index */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-background border border-border py-1 z-60">
                    {AdditionalNavItems.map((item) => (
                      <Link key={item.name} to={item.href}
                        className="block px-4 py-2 text-sm text-foreground hover:bg-primary/10 transition-colors"
                        onClick={() => setDropdownOpen(false)}>
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className={cn("inline-flex items-center justify-center p-2 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",isOnHeroSection
                  ? "text-white hover:text-primary hover:bg-white/10"
                  : "text-foreground hover:text-primary hover:bg-primary/10")}>
              <span className="sr-only">Open main menu</span>
              {!menuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with higher z-index */}
      {menuOpen && (
        <div className="md:hidden mobile-menu z-50">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Show all navigation items in mobile */}
            {[...MainNavItems, ...AdditionalNavItems].map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="navbar-link block px-3 py-2 rounded-md text-base font-medium hover:bg-primary/10 transition-colors duration-200"
                onClick={() => setMenuOpen(false)}>
                {item.name}
              </Link>
            ))}
            {/* Theme Toggle in Mobile Menu */}
            <div className="px-3 py-4 border-t border-border mt-2">
              <div className="flex items-center justify-between">
                <span className="text-base font-medium text-foreground">Theme</span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )   
}