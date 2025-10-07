
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    // Footer with gradient border and subtle background
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main footer content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand section */}
          <div className="md:col-span-2">
            <Link to="/" className="text-2xl font-bold text-foreground hover:text-primary transition-colors">
              ITF Taekwondo Guide
            </Link>
            <p className="mt-4 text-foreground/70 max-w-md">
              Your comprehensive digital guide for mastering the art of foot and fist through 
              traditional ITF patterns and techniques since 1955.
            </p>
            
            {/* Social links */}
            <div className="mt-6 flex space-x-4">
              <a 
                href="#" 
                className="text-foreground/60 hover:text-primary transition-colors p-2 hover:bg-primary/10 rounded-md"
                aria-label="YouTube"
              >
                <span className="text-lg">🎥</span>
              </a>
              <a 
                href="#" 
                className="text-foreground/60 hover:text-primary transition-colors p-2 hover:bg-primary/10 rounded-md"
                aria-label="Instagram"
              >
                <span className="text-lg">📸</span>
              </a>
              <a 
                href="#" 
                className="text-foreground/60 hover:text-primary transition-colors p-2 hover:bg-primary/10 rounded-md"
                aria-label="Facebook"
              >
                <span className="text-lg">👥</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/techniques" className="text-foreground/70 hover:text-primary transition-colors">
                  Techniques
                </Link>
              </li>
              <li>
                <Link to="/patterns" className="text-foreground/70 hover:text-primary transition-colors">
                  Patterns
                </Link>
              </li>
              <li>
                <Link to="/drills" className="text-foreground/70 hover:text-primary transition-colors">
                  Drills
                </Link>
              </li>
              <li>
                <Link to="/quiz" className="text-foreground/70 hover:text-primary transition-colors">
                  Knowledge Quiz
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terminology" className="text-foreground/70 hover:text-primary transition-colors">
                  Terminology
                </Link>
              </li>
              <li>
                <Link to="/history" className="text-foreground/70 hover:text-primary transition-colors">
                  History
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar with copyright and credits */}
        <div className="py-6 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <div className="text-foreground/60 text-sm">
            © 2025 ITF Taekwondo Guide.
          </div>
          
          {/* Credit to you! */}
          <div className="mt-2 md:mt-0">
            <p className="text-foreground/50 text-sm">
              Built by{' '}
              <span className="text-primary font-semibold">xmrenigmax</span>
            </p>
          </div>
        </div>

        {/* Inspirational quote */}
        <div className="pb-6 text-center">
          <p className="text-foreground/40 text-sm italic">
            "The ultimate goal of Taekwondo is to eliminate fighting by discouraging the stronger's 
            oppression of the weaker."
          </p>
        </div>

      </div>
    </footer>
  )
}