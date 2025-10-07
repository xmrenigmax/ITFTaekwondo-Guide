// src/components/techniques/TechniquesOverview.jsx
import { cn } from '../../lib/utils'

export const TechniquesOverview = ({ onCategorySelect }) => {
  const categoryCards = [
    {
      id: 'stances',
      title: 'Stances (Sogi)',
      description: 'Foundation positions for power, balance, and mobility in all patterns',
      count: '18 stances',
      color: 'from-primary to-primary/20'
    },
    {
      id: 'strikes', 
      title: 'Strikes (Jireugi)',
      description: 'Punching techniques and hand attacks for maximum impact',
      count: '8 strikes',
      color: 'from-primary to-primary/20'
    },
    {
      id: 'blocks',
      title: 'Blocks (Makgi)',
      description: 'Defensive techniques to protect, deflect, and counter attacks',
      count: '24 blocks',
      color: 'from-primary to-primary/20'
    },
    {
      id: 'kicks',
      title: 'Kicks (Chagi)',
      description: 'Powerful leg techniques and dynamic foot attacks for all ranges', 
      count: '17 kicks',
      color: 'from-primary to-primary/20'
    },
    {
      id: 'thrusts',
      title: 'Thrusts (Tzireugi)',
      description: 'Spear hands, palm heels, and pushing techniques for close combat',
      count: '5 thrusts',
      color: 'from-primary to-primary/20'
    },
    {
      id: 'punches',
      title: 'Punches (Jirugi)',
      description: 'Powerful hand strikes delivered with precision and speed',
      count: '6 punches',
      color: 'from-primary to-primary/20'
    }
  ]

  return (
    <div className="py-8">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-foreground mb-4">
          Technique Categories
        </h2>
        <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
          Explore comprehensive breakdowns of all ITF Taekwondo techniques. 
          Each category includes step-by-step guidance and training applications.
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categoryCards.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className="group text-left bg-background border border-border rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            {/* Category Header with Gradient Accent */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {category.title}
              </h3>
              
              {/* Description */}
              <p className="text-foreground/70 leading-relaxed mb-4">
                {category.description}
              </p>
            </div>

            {/* Footer with Count and CTA */}
            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <span className="text-primary font-semibold text-lg">
                {category.count}
              </span>
              
              <div className="flex items-center text-primary font-semibold text-sm group-hover:translate-x-1 transition-transform">
                Explore
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Hover Gradient Overlay */}
            <div className={cn(
              "absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none",
              category.color
            )} />
          </button>
        ))}
      </div>

      {/* Quick Stats Footer */}
      <div className="mt-16 text-center">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-8 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Complete Technique Library
          </h3>
          <p className="text-foreground/70 mb-4">
            All <span className="text-primary font-semibold">78 techniques</span> organized by category, 
            with detailed instructions, applications, and training tips for every belt level.
          </p>
          <p className="text-foreground/60 text-sm">
            From basic white belt fundamentals to advanced black belt applications
          </p>
        </div>
      </div>
    </div>
  )
}