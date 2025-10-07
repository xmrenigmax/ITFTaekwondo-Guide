
import { useState, useEffect } from 'react'

// Slide data featuring the 5 Tenets of Taekwondo with Korean names and captions
const slides = [
  {
    gradient: "from-primary to-primary/10",
    koreanName: "Ye Ui",
    englishName: "Courtesy",
    description: "Showing respect to instructors, seniors, and fellow students",
    caption: "I shall respect the instructor and seniors"
  },
  {
    gradient: "from-primary to-primary/10", 
    koreanName: "Yom Chi",
    englishName: "Integrity",
    description: "Being honest and having strong moral principles",
    caption: "I shall never misuse Taekwondo"
  },
  {
    gradient: "from-primary to-primary/10",
    koreanName: "In Nae", 
    englishName: "Perseverance",
    description: "Persisting in pursuit of goals despite obstacles",
    caption: "I shall persevere in all endeavours"
  },
  {
    gradient: "from-primary to-primary/10",
    koreanName: "Guk Gi",
    englishName: "Self-Control",
    description: "Maintaining control over mind, body, and actions",
    caption: "I shall exercise self-control in all situations"
  },
  {
    gradient: "from-primary to-primary/10",
    koreanName: "Baekjul Boolgool", 
    englishName: "Indomitable Spirit",
    description: "Showing courage and standing for what is right",
    caption: "I shall be a champion of freedom and justice"
  }
]

export const Slideshow = () => {
  // State to track current active slide
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer) // Cleanup on component unmount
  }, [])

  return (
    // Slideshow container with fixed height for consistent layout
    <section className="relative h-96 md:h-[500px] overflow-hidden">
      
      {/* Slide items - only current slide is visible */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0' // Fade in/out effect
          }`}
        >
          {/* Gradient background using primary theme colors */}
          <div className={`w-full h-full bg-gradient-to-r ${slide.gradient} flex items-center justify-center`}>
            <div className="text-center text-foreground max-w-2xl mx-auto px-4">
              {/* Korean name with smaller font size for elegance */}
              <p className="text-lg md:text-xl text-foreground/80 mb-2 font-light">
                {slide.koreanName}
              </p>
              
              {/* English name as main heading */}
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                {slide.englishName}
              </h3>
              
              {/* Description of the tenet */}
              <p className="text-lg md:text-xl mb-4 text-foreground/90">
                {slide.description}
              </p>
              
              {/* Student oath caption in italic */}
              <p className="text-base md:text-lg text-foreground/70 italic">
                "{slide.caption}"
              </p>
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation dots for manual slide control - now 5 dots for 5 tenets */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)} // Click to navigate to specific slide
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-primary' : 'bg-foreground/30' // Active state styling
            }`}
          />
        ))}
      </div>
    </section>
  )
}