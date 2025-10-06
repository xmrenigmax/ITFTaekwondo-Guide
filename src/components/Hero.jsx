// components/HeroSection.jsx
import { Link } from 'react-router-dom'

export const Hero = () => {
  return (
    // Hero section - full viewport height with fixed positioning for navbar
    <section className="pt-16 h-screen flex items-center justify-center relative overflow-hidden">
      
      {/* Background container with image and overlay effects */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/image/hero-taekwondo.jpg')", // Main hero image
          backgroundSize: "cover",      // Ensures image covers entire area
          backgroundPosition: "center", // Centers the image
          backgroundRepeat: "no-repeat" // Prevents tiling
        }}
      >
        {/* Dark overlay to improve text contrast on background image */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Gradient overlay that blends with site theme colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-transparent to-primary/20"></div>
      </div>
      
      {/* Main content container - positioned above background layers */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        
        {/* Main heading with ITF Taekwondo branding - Adjusted for mobile */}
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 md:mb-6 drop-shadow-lg mt-8 md:mt-0">
          ITF <span className="text-primary">Taekwondo</span> 
        </h1>
        
        {/* Subheading with founding date and tagline */}
        <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-6 md:mb-8 drop-shadow-md">
          Est. April 11th, 1955 • The Art of Foot and Fist
        </p>
        
        {/* Description paragraph explaining the site purpose */}
        <p className="text-base md:text-lg text-white/80 mb-6 md:mb-8 max-w-2xl mx-auto drop-shadow-md px-4">
          Master General Choi Hong Hi's legacy. Your complete guide to patterns, 
          techniques, and philosophy of traditional Taekwondo.
        </p>
        
        {/* Call-to-action buttons for main site sections */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
          
          {/* Primary CTA button - Techniques section */}
          <Link 
            to="/techniques" 
            className="bg-primary hover:bg-primary-hover text-white px-6 md:px-8 py-3 text-base md:text-lg font-semibold rounded-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow-glow"
          >
            Explore Techniques
          </Link>
          
          {/* Secondary CTA button - Patterns section - Fixed dark mode hover */}
          <Link 
            to="/patterns" 
            className="border-2 border-white text-white hover:bg-white hover:text-primary px-6 md:px-8 py-3 text-base md:text-lg font-semibold rounded-md transition-all duration-200 hover:translate-y-[-2px]"
          >
            Learn Patterns
          </Link>
          
        </div>
      </div>
    </section>
  )
}