
import { Link } from 'react-router-dom'

// featured grid component for homepage
export const FeaturedGrid = () => {
  // Featured sections data with icons and descriptions
  const featuredSections = [
    {
      name: "Techniques",
      href: "/techniques",
      icon: "🥋", 
      description: "Master strikes, blocks, stances, and kicks with detailed form breakdowns",
      gradient: "from-red-500 to-red-600", // Red gradient for techniques
      badge: "Core"
    },
    {
      name: "Patterns (Tul)",
      href: "/patterns", 
      icon: "🌀", 
      description: "Learn all 24 ITF patterns from Chon-Ji to Tong-Il with step-by-step guides",
      gradient: "from-orange-500 to-red-500", // Orange-red gradient
      badge: "24 Forms"
    },
    {
      name: "Drills",
      href: "/drills",
      icon: "⚡", 
      description: "Practice combinations, footwork, and sparring drills to improve your skills",
      gradient: "from-yellow-500 to-orange-500", // Yellow-orange gradient
      badge: "Training"
    },
    {
      name: "Terminology", 
      href: "/terminology",
      icon: "📚", 
      description: "Learn Korean commands, counting, and technical terms with pronunciation",
      gradient: "from-green-500 to-blue-500", // Green-blue gradient
      badge: "Language"
    },
    {
      name: "History",
      href: "/history",
      icon: "📜", 
      description: "Explore ITF's rich heritage from General Choi Hong Hi to global expansion",
      gradient: "from-purple-500 to-pink-500", // Purple-pink gradient
      badge: "Legacy"
    },
    {
      name: "Quiz",
      href: "/quiz",
      icon: "🎯", 
      description: "Test your knowledge with interactive quizzes on techniques, patterns, and theory",
      gradient: "from-blue-500 to-purple-500", // Blue-purple gradient
      badge: "Interactive"
    }
  ]

  return (
    // Featured sections with subtle background for visual separation
    <section className="py-16 bg-gradient-to-b from-background to-background/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section header with compelling call-to-action */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Dive into ITF Taekwondo
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Comprehensive resources for every aspect of ITF Taekwondo, 
            from fundamental techniques to advanced patterns and interactive learning.
          </p>
        </div>

        {/* Grid layout for featured sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredSections.map((section, index) => (
            <Link
              key={section.name}
              to={section.href}
              className="group block" 
            >
              {/* Individual feature card with hover animations */}
              <div className="h-full bg-background border border-border rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-primary/50 group-hover:glow">
                
                {/* Icon container with dynamic gradient background */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${section.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl">{section.icon}</span>
                </div>

                {/* Badge for additional context */}
                <div className="inline-block bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded-full mb-3">
                  {section.badge}
                </div>

                {/* Section title */}
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {section.name}
                </h3>

                {/* Description text */}
                <p className="text-foreground/70 mb-4 leading-relaxed">
                  {section.description}
                </p>

                {/* Call-to-action link with hover effect */}
                <div className="flex items-center text-primary font-semibold group-hover:translate-x-1 transition-transform duration-200">
                  Explore Section
                  <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Additional call-to-action for mobile users */}
        <div className="text-center mt-12">
          <p className="text-foreground/60 text-sm">
            Can't find what you're looking for? Check out our complete sitemap in the navigation menu.
          </p>
        </div>

      </div>
    </section>
  )
}