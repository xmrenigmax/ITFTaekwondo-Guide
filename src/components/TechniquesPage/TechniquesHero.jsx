// src/components/techniques/TechniquesHero.jsx
export const TechniquesHero = () => {
  return (
    <section className="pt-16 bg-gradient-to-br from-background to-primary/30 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          
          {/* Main Heading with Impact */}
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
            ITF <span className="text-primary">Techniques</span>
          </h1>
          
          {/* Subheading with Real Stats */}
          <p className="text-xl md:text-2xl text-foreground/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            Master <span className="text-primary font-semibold">78 core techniques</span> that form the foundation 
            of traditional ITF Taekwondo.
          </p>
          
          {/* Technique Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto mb-12">
            {/* Stances */}
            <div className="bg-background/80 backdrop-blur-sm border border-border rounded-xl p-6 text-center hover:scale-105 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl font-bold text-primary mb-2">18</div>
              <div className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">Stances</div>
            </div>
            
            {/* Kicks */}
            <div className="bg-background/80 backdrop-blur-sm border border-border rounded-xl p-6 text-center hover:scale-105 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl font-bold text-primary mb-2">17</div>
              <div className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">Kicks</div>
            </div>
            
            {/* Punches */}
            <div className="bg-background/80 backdrop-blur-sm border border-border rounded-xl p-6 text-center hover:scale-105 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl font-bold text-primary mb-2">6</div>
              <div className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">Punches</div>
            </div>
            
            {/* Strikes */}
            <div className="bg-background/80 backdrop-blur-sm border border-border rounded-xl p-6 text-center hover:scale-105 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl font-bold text-primary mb-2">8</div>
              <div className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">Strikes</div>
            </div>
            
            {/* Thrusts */}
            <div className="bg-background/80 backdrop-blur-sm border border-border rounded-xl p-6 text-center hover:scale-105 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl font-bold text-primary mb-2">5</div>
              <div className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">Thrusts</div>
            </div>
            
            {/* Blocks */}
            <div className="bg-background/80 backdrop-blur-sm border border-border rounded-xl p-6 text-center hover:scale-105 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl font-bold text-primary mb-2">24</div>
              <div className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">Blocks</div>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-8 max-w-2xl mx-auto">
            <p className="text-foreground/80 text-lg mb-3 font-medium">
              <span className="text-primary font-semibold">Ready to master your form?</span> Explore each category 
              for detailed breakdowns and step-by-step guidance.
            </p>
            <p className="text-foreground/60 text-sm">
              Comprehensive training resources for students of all belt levels.
            </p>
          </div>
          
        </div>
      </div>
    </section>
  )
}