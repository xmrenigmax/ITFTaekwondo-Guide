import { Link } from 'react-router-dom'

/**
 * Social Media Configuration
 * @type {Array<{platform: string, url: string, icon: JSX.Element, label: string}>}
 */
const socialLinks = [
  {
    platform: 'youtube',
    url: 'https://www.youtube.com/@trenictkdonlinetraining459',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
    label: 'YouTube Channel'
  },
  {
    platform: 'instagram',
    url: 'https://www.instagram.com/trenictkd/',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    label: 'Instagram Profile'
  },
  {
    platform: 'facebook',
    url: 'https://www.facebook.com/TrenicTaekwonDo/',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    label: 'Facebook Page'
  }
]

/**
 * Footer Component
 * 
 * Professional footer with comprehensive site navigation, social media links,
 * and attribution. Features responsive design and accessibility compliance.
 * 
 * Features:
 * - Responsive grid layout with optimized content organization
 * - Professional social media icons with proper branding
 * - Comprehensive site navigation links
 * - Developer attribution with LinkedIn integration
 * - Inspirational Taekwondo philosophy quote
 * - Accessibility-compliant link structure
 * 
 * @returns {JSX.Element} Footer component
 * 
 * @example
 * <Footer />
 */
export const Footer = () => {
  /**
   * Renders individual social media link with icon
   * @param {Object} social - Social media configuration object
   * @param {number} index - Array index for key prop
   * @returns {JSX.Element} Social media link component
   */
  const renderSocialLink = (social, index) => (
    <a 
      key={index}
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className="
        text-foreground/60 hover:text-primary transition-all duration-200 
        p-2 hover:bg-primary/10 rounded-md focus:outline-none 
        focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background
      "
      aria-label={social.label}
    >
      {social.icon}
    </a>
  )

  /**
   * Renders navigation link list
   * @param {Array} links - Array of link objects
   * @param {string} title - Section title
   * @returns {JSX.Element} Navigation link section
   */
  const renderLinkSection = (links, title) => (
    <div>
      <h3 className="text-lg font-semibold text-foreground mb-4">
        {title}
      </h3>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <Link 
              to={link.href} 
              className="text-foreground/70 hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 rounded-sm"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <footer 
      className="bg-background border-t border-border"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ===== MAIN FOOTER CONTENT ===== */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="md:col-span-2">
            <Link 
              to="/" 
              className="text-2xl font-bold text-foreground hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
              aria-label="ITF Taekwondo Guide - Home"
            >
              ITF Taekwondo Guide
            </Link>
            <p className="mt-4 text-foreground/70 max-w-md leading-relaxed">
              Your comprehensive digital guide for mastering the art of foot and fist through 
              traditional ITF patterns and techniques since 1955.
            </p>
            
            {/* Social Media Links */}
            <div className="mt-6 flex space-x-2" role="list" aria-label="Social media links">
              {socialLinks.map(renderSocialLink)}
            </div>
          </div>

          {/* Quick Links Section */}
          {renderLinkSection([
            { name: "Techniques", href: "/techniques" },
            { name: "Patterns", href: "/patterns" },
            { name: "Drills", href: "/drills" },
            { name: "Knowledge Quiz", href: "/quiz" }
          ], "Quick Links")}

          {/* Resources Section */}
          {renderLinkSection([
            { name: "Terminology", href: "/terminology" },
            { name: "History", href: "/history" }
          ], "Resources")}
        </div>

        {/* ===== BOTTOM BAR ===== */}
        <div className="py-6 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <div className="text-foreground/60 text-sm">
            © {new Date().getFullYear()} ITF Taekwondo Guide. All rights reserved.
          </div>
          
          {/* Developer Attribution */}
          <div className="mt-2 md:mt-0">
            <p className="text-foreground/50 text-sm">
              Built by{' '}
              <a 
                href="https://www.linkedin.com/in/mrrileyjordan/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary font-semibold hover:text-primary/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 rounded-sm underline"
                aria-label="Visit Riley Jordan's LinkedIn profile"
              >
                xmrenigmax
              </a>
            </p>
          </div>
        </div>

        {/* ===== INSPIRATIONAL QUOTE ===== */}
        <div className="pb-6 text-center">
          <p className="text-foreground/40 text-sm italic max-w-2xl mx-auto leading-relaxed">
            "The ultimate goal of Taekwondo is to eliminate fighting by discouraging the stronger's 
            oppression of the weaker with a power that must be based on humanity, justice, morality, 
            wisdom, and faith, thus helping to build a better and more peaceful world."
          </p>
          <p className="text-foreground/30 text-xs mt-2">— General Choi Hong Hi</p>
        </div>

      </div>
    </footer>
  )
}