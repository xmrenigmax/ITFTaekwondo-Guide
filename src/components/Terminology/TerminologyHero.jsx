

export const TerminologyHero = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/50 via-primary/10 to-background flex items-center justify-center relative overflow-hidden pt-20 sm:pt-0">
      {/* Professional Background Elements */}
      <div className="absolute inset-0 opacity-5">
        {/* Korean Text Pattern */}
        <div className="absolute top-1/4 left-1/4 text-6xl font-korean rotate-12">태권도</div>
        <div className="absolute top-1/3 right-1/4 text-5xl font-korean -rotate-12">정신</div>
        <div className="absolute bottom-1/4 left-1/3 text-4xl font-korean rotate-6">기술</div>
        <div className="absolute bottom-1/3 right-1/3 text-6xl font-korean -rotate-6">수련</div>
        <div className="absolute top-1/2 left-1/2 text-8xl font-korean -translate-x-1/2 -translate-y-1/2 opacity-10">도장</div>
        
        {/* Geometric Patterns */}
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-primary/20 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 border-2 border-primary/20 rotate-45"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-primary/20 rounded-full opacity-30"></div>
      </div>
      
      <div className="text-center relative z-10 max-w-4xl mx-auto px-4">
        {/* Main Title */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 tracking-tight">
            ITF <span className="text-primary">Terminology</span>
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
        </div>
        
        {/* Subtitle */}
        <p className="text-xl sm:text-2xl lg:text-3xl text-foreground/80 mb-8 leading-relaxed font-light">
          Master the Language of Traditional <span className="font-semibold text-primary">Taekwon-Do</span>
        </p>
        
        {/* Description */}
        <p className="text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto mb-12 leading-relaxed">
          Comprehensive dictionary of Korean commands, techniques, and philosophy 
          with authentic audio pronunciation. Essential knowledge for dedicated practitioners.
        </p>
        
        {/* Feature Indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-foreground/60">
          <div className="flex items-center gap-3 bg-background/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Authentic Audio Pronunciation</span>
          </div>
          <div className="flex items-center gap-3 bg-background/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Progressive Belt Learning</span>
          </div>
          <div className="flex items-center gap-3 bg-background/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span>Comprehensive Categories</span>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-foreground/50 uppercase tracking-wider">Explore</span>
          <div className="animate-bounce">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}