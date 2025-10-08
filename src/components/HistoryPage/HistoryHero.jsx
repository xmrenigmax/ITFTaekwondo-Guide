/**
 * HistoryHero Component
 * 
 * Grand hero section for the ITF Taekwondo History page.
 * Features compelling historical context, professional typography, and engaging
 * visual elements to showcase the rich heritage and legacy.
 * 
 * Features:
 * - Impactful typography with crimson gradient background
 * - Historical milestones with visual indicators
 * - Professional spacing and visual hierarchy
 * - Accessibility-compliant semantic structure
 * - Responsive design for all screen sizes
 * 
 * @returns {JSX.Element} History hero section component
 */
export const HistoryHero = () => {
  // ===== DATA DEFINITIONS =====

  /**
   * Historical milestone data showcasing key ITF development points
   * @type {Array}
   */
  const historicalMilestones = [
    { year: '1955', label: 'Founded', description: 'Official naming of Taekwon-Do by General Choi Hong Hi' },
    { year: '1966', label: 'ITF Established', description: 'International Taekwon-Do Federation founded with 9 countries' },
    { year: '1972', label: 'Encyclopedia', description: '15-volume technical encyclopedia published' },
    { year: '140+', label: 'Countries', description: 'Global presence across six continents' },
    { year: '24', label: 'Patterns', description: 'Complete tul system from Chon-Ji to Tong-Il' },
    { year: '60M+', label: 'Practitioners', description: 'Millions trained worldwide since foundation' }
  ]

  // ===== RENDER METHODS =====

  /**
   * Renders individual milestone card with hover effects
   * @param {Object} milestone - Milestone data object
   * @param {number} index - Array index for key and animation delay
   * @returns {JSX.Element} Milestone card component
   */
  const renderMilestoneCard = (milestone, index) => (
    <div
      key={milestone.label}
      className="
        bg-background/80 backdrop-blur-sm border border-border rounded-xl p-6 text-center 
        hover:scale-105 hover:border-primary/50 hover:shadow-lg 
        transition-all duration-300 cursor-default
        focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2
      "
      role="article"
      aria-label={`${milestone.year} ${milestone.label}: ${milestone.description}`}
      tabIndex={0}
      style={{
        animationDelay: `${index * 100}ms`
      }}
    >
      {/* Milestone Year */}
      <div 
        className="text-3xl font-bold text-primary mb-2"
        aria-live="polite"
      >
        {milestone.year}
      </div>
      
      {/* Milestone Label */}
      <div className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">
        {milestone.label}
      </div>
    </div>
  )

  /**
   * Renders the main heading section with impact typography
   * @returns {JSX.Element} Main heading component
   */
  const renderMainHeading = () => (
    <div className="mb-8">
       <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-4 tracking-tight drop-shadow-lg">
        ITF <span className="text-blue-800 animate-gradient bg-gradient-to-r from-blue-800 via-blue-600 to-blue-800 bg-clip-text text-transparent">Legacy</span>
      </h1>
       <div className="w-32 h-1 bg-gradient-to-r from-blue-800 to-blue-600 mx-auto mb-6 rounded-full shadow-lg"></div>
      <p className="text-base sm:text-lg lg:text-xl text-foreground/70 max-w-4xl mx-auto leading-relaxed">
        Journey through the remarkable evolution of International Taekwon-Do Federation, 
        from its visionary founding by General Choi Hong Hi to its current global 
        prominence as a traditional martial art and way of life.
      </p>
    </div>
  )
  

  /**
   * Renders the milestones grid with historical data
   * @returns {JSX.Element} Milestones grid component
   */
  const renderMilestonesGrid = () => (
    <div 
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-4xl mx-auto mb-16"
      role="grid"
      aria-label="ITF Taekwondo historical milestones"
    >
      {historicalMilestones.map(renderMilestoneCard)}
    </div>
  )

  /**
   * Renders the historical context section with founding story
   * @returns {JSX.Element} Historical context component
   */
  const renderHistoricalContext = () => (
    <div 
      className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-8 max-w-2xl mx-auto"
      role="region"
      aria-label="Historical foundation story"
    >
      <p className="text-foreground/80 text-lg mb-3 font-medium leading-relaxed">
        <span className="text-blue-700 font-semibold">April 11, 1955</span> marks the birth of Taekwon-Do, 
        when General Choi Hong Hi officially named the art "the way of the foot and fist."
      </p>
      <p className="text-foreground/60 text-sm">
        From Korean military roots to worldwide martial art phenomenon.
      </p>
    </div>
  )

  // ===== MAIN COMPONENT RENDER =====

  return (
    <section 
      className="
        relative min-h-[80vh] flex items-center justify-center 
        bg-gradient-to-br from-primary/50 via-primary/40 to-primary/100 
        border-b border-primary/30 overflow-hidden"
      role="banner"
      aria-label="ITF Taekwondo History Introduction"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          
          {renderMainHeading()}
          {renderMilestonesGrid()}
          {renderHistoricalContext()}
          
        </div>
      </div>
    </section>
  )
}