import { cn } from '../../../lib/utils'
import { useState, useCallback } from 'react'
import { TechniqueModal } from '../TechniqueModal'
import punchesData from '../../../data/techniques/punches.json'

/**
 * PunchesCategory Component
 * 
 * Comprehensive category page for ITF Taekwondo punching techniques (Jirugi).
 * Features belt progression timeline, technique cards, and training principles
 * for mastering powerful hand strikes and precision attacks.
 * 
 * Features:
 * - Belt progression timeline with gradient color coding
 * - Interactive technique cards with modal details
 * - Training principles and safety guidelines for punching
 * - Statistics and mastery progression
 * - Responsive design with professional spacing
 * 
 * @returns {JSX.Element} Punches category interface
 */
export const PunchesCategory = () => {
  // ===== STATE MANAGEMENT =====
  
  /** @type {[Object|null, Function]} Currently selected technique for modal display */
  const [selectedTechnique, setSelectedTechnique] = useState(null)

  // ===== EVENT HANDLERS =====

  /**
   * Handles technique selection for modal display
   * @param {Object} technique - The selected technique object
   */
  const handleTechniqueSelect = useCallback((technique) => {
    setSelectedTechnique(technique)
  }, [])

  /**
   * Handles modal close with state cleanup
   */
  const handleModalClose = useCallback(() => {
    setSelectedTechnique(null)
  }, [])

  /**
   * Handles keyboard navigation for technique cards
   * @param {React.KeyboardEvent} event - Keyboard event
   * @param {Object} technique - The technique to select
   */
  const handleTechniqueKeyDown = useCallback((event, technique) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleTechniqueSelect(technique)
    }
  }, [handleTechniqueSelect])

  // ===== COMPUTED VALUES =====

  /**
   * Calculates total number of punching techniques across all belt levels
   * @type {number}
   */
  const totalTechniques = punchesData.beltLevels.reduce(
    (total, level) => total + level.techniques.length, 
    0
  )

  // ===== RENDER METHODS =====

  /**
   * Renders the main page header with category information
   * @returns {JSX.Element} Page header component
   */
  const renderPageHeader = () => (
    <div className="text-center mb-16">
      <h1 className="text-4xl font-bold text-foreground mb-6">
        {punchesData.category} <span className="text-primary">({punchesData.koreanName})</span>
      </h1>
      <p className="text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
        {punchesData.description}
      </p>
    </div>
  )

  /**
   * Renders individual belt level section in the timeline
   * @param {Object} beltLevel - Belt level data object
   * @param {number} index - Array index for alternating layout
   * @returns {JSX.Element} Belt level component
   */
  const renderBeltLevel = (beltLevel, index) => (
    <div key={index} className="relative">
      <div className={cn(
        "relative z-10 max-w-2xl mx-auto p-8 rounded-2xl border border-border bg-background/80 backdrop-blur-sm shadow-sm",
        index % 2 === 0 ? "ml-auto" : "mr-auto"
      )}>
        {/* Belt Color Header */}
        <div className={cn(
          "absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-full text-black font-bold text-sm uppercase tracking-wide bg-gradient-to-r shadow-md",
          beltLevel.beltColor
        )}>
          {beltLevel.belt}
        </div>

        {/* Techniques Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {beltLevel.techniques.map((technique, techIndex) => (
            <button
              key={techIndex}
              onClick={() => handleTechniqueSelect(technique)}
              onKeyDown={(e) => handleTechniqueKeyDown(e, technique)}
              className="
                text-left bg-background border border-border rounded-xl p-6 
                hover:shadow-lg hover:border-primary/50 hover:scale-105 
                transition-all duration-300 focus:outline-none focus:ring-2 
                focus:ring-primary focus:ring-offset-2
              "
              aria-label={`Learn about ${technique.english} (${technique.korean}) punching technique`}
            >
              <h4 className="text-lg font-bold text-primary mb-2">
                {technique.korean}
              </h4>
              <p className="text-foreground/80 font-semibold mb-3">
                {technique.english}
              </p>
              <p className="text-foreground/70 text-sm mb-3 leading-relaxed">
                {technique.description}
              </p>
              <div 
                className="flex items-center text-primary text-xs font-semibold"
                aria-hidden="true"
              >
                Click for details
                <svg 
                  className="ml-1 w-3 h-3" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7" 
                  />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  /**
   * Renders the belt progression timeline for punching techniques
   * @returns {JSX.Element} Timeline component
   */
  const renderBeltProgression = () => (
    <div className="mb-20">
      <h2 className="text-2xl font-bold text-foreground mb-12 text-center">
        Belt Progression
      </h2>
      
      <div className="relative">
        {/* Timeline Line - Simplified gradient for punching progression */}
        <div 
          className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-gray-300 to-blue-500 rounded-full"
          aria-hidden="true"
        />
        
        {/* Belt Levels Container */}
        <div 
          className="space-y-16"
          role="list"
          aria-label="Punching techniques by belt level"
        >
          {punchesData.beltLevels.map(renderBeltLevel)}
        </div>
      </div>
    </div>
  )

  /**
   * Renders training principles and safety guidelines for punching
   * @returns {JSX.Element} Training principles component
   */
  const renderTrainingPrinciples = () => (
    <div 
      className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-8 max-w-4xl mx-auto"
      role="region"
      aria-label="Punching technique training principles"
    >
      <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
        {punchesData.category} Training Principles
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Key Focus Areas */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground text-lg">Key Focus Areas</h4>
          <ul 
            className="text-foreground/70 space-y-3 text-sm"
            role="list"
          >
            {punchesData.trainingPrinciples.focusAreas.map((area, index) => (
              <li key={index} className="flex items-start">
                <span className="text-primary mr-3 mt-0.5 flex-shrink-0" aria-hidden="true">•</span>
                <span>{area}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Safety Considerations */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground text-lg">Safety Considerations</h4>
          <ul 
            className="text-foreground/70 space-y-3 text-sm"
            role="list"
          >
            {punchesData.trainingPrinciples.safety.map((safetyTip, index) => (
              <li key={index} className="flex items-start">
                <span className="text-primary mr-3 mt-0.5 flex-shrink-0" aria-hidden="true">•</span>
                <span>{safetyTip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )

  /**
   * Renders quick statistics section for punching techniques
   * @returns {JSX.Element} Statistics component
   */
  const renderStatistics = () => (
    <div className="mt-16 text-center">
      <div 
        className="inline-flex items-center space-x-12 text-foreground/60 text-sm"
        role="region"
        aria-label="Punching technique statistics"
      >
        <div>
          <div className="text-2xl font-bold text-primary">
            {totalTechniques}
          </div>
          <div>Total {punchesData.category}</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-primary">
            {punchesData.beltLevels.length}
          </div>
          <div>Belt Levels</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-primary">2+</div>
          <div>Years to Master</div>
        </div>
      </div>
    </div>
  )

  // ===== MAIN COMPONENT RENDER =====

  return (
    <div className="py-12">
      {renderPageHeader()}
      {renderBeltProgression()}
      {renderTrainingPrinciples()}
      {renderStatistics()}

      {/* Technique Modal */}
      <TechniqueModal 
        technique={selectedTechnique}
        isOpen={!!selectedTechnique}
        onClose={handleModalClose}
      />
    </div>
  )
}