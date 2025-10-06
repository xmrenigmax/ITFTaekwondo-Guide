import { cn } from "../lib/utils"
import { useEffect, useState } from "react"
import { ThemeToggle } from "./ThemeToggle"
import { Link } from "react-router-dom" // Add this import

const NavItems = [
  { name: "Techniques", href: "/techniques" },
  { name: "Patterns", href: "/patterns" },
  { name: "Terminology", href: "/terminology" },
]

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <nav
      className={cn(
        "fixed w-full z-10 top-0 left-0 transition-all duration-300",
        scrolled ? "bg-background shadow-lg border-b border-border" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-xl font-bold text-foreground hover:text-primary transition-colors duration-200"
            >
              ITF Taekwondo Guide
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-baseline space-x-4">
              {NavItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="navbar-link px-3 py-2 rounded-md text-sm font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <ThemeToggle />
          </div>

          {/* Mobile menu button - ThemeToggle removed from here */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all duration-200"
            >
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

      {/* Mobile Menu with Theme Toggle */}
      {menuOpen && (
        <div className="md:hidden mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NavItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="navbar-link block px-3 py-2 rounded-md text-base font-medium hover:bg-primary/10 transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
              >
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