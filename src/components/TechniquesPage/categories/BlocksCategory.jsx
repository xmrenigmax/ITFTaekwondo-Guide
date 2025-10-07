
// BlocksCategory
import { cn } from '../../../lib/utils'
import { useState } from 'react'
import { TechniqueModal } from '../TechniqueModal'
import blocksData from '../../../data/techniques/blocks.json'

// BlocksCategory Component
export const BlocksCategory = () => {
  const [selectedTechnique, setSelectedTechnique] = useState(null)

  // Render
  return (
    <div className="py-8">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-foreground mb-4">
          {blocksData.category} <span className="text-primary">({blocksData.koreanName})</span>
        </h2>
        <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
          {blocksData.description}
        </p>
      </div>

      {/* Belt Progression Timeline */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
          Belt Progression
        </h3>
        
        <div className="relative">
          {/* Timeline Line - Full spectrum for blocks! */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-gray-300 via-yellow-400 via-green-500 via-blue-500 to-red-600 rounded-full"></div>
          
          {/* Belt Levels */}
          <div className="space-y-12">
            {blocksData.beltLevels.map((beltLevel, index) => (
              <div key={index} className="relative">
                <div className={cn(
                  "relative z-10 max-w-2xl mx-auto p-8 rounded-2xl border border-border bg-background/80 backdrop-blur-sm",
                  index % 2 === 0 ? "ml-auto" : "mr-auto"
                )}>
                  {/* Belt Color Header */}
                  <div className={cn(
                    "absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-full text-white font-bold text-sm uppercase tracking-wide bg-gradient-to-r",
                    beltLevel.beltColor
                  )}>
                    {beltLevel.belt}
                  </div>

                  {/* Techniques Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    {beltLevel.techniques.map((technique, techIndex) => (
                      <button
                        key={techIndex}
                        onClick={() => setSelectedTechnique(technique)}
                        className="text-left bg-background border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/50 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
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
                        <div className="flex items-center text-primary text-xs font-semibold">
                          Click for details
                          <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technique Modal */}
      <TechniqueModal 
        technique={selectedTechnique}
        isOpen={!!selectedTechnique}
        onClose={() => setSelectedTechnique(null)}
      />

      {/* Training Tips Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-8 max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
          {blocksData.category} Training Principles
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Key Focus Areas</h4>
            <ul className="text-foreground/70 space-y-2 text-sm">
              {blocksData.trainingPrinciples.focusAreas.map((area, index) => (
                <li key={index}>• {area}</li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Safety Considerations</h4>
            <ul className="text-foreground/70 space-y-2 text-sm">
              {blocksData.trainingPrinciples.safety.map((safetyTip, index) => (
                <li key={index}>• {safetyTip}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center space-x-8 text-foreground/60 text-sm">
          <div>
            <div className="text-2xl font-bold text-primary">
              {blocksData.beltLevels.reduce((total, level) => total + level.techniques.length, 0)}
            </div>
            <div>Total {blocksData.category}</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">
              {blocksData.beltLevels.length}
            </div>
            <div>Belt Levels</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">7+</div>
            <div>Years to Master</div>
          </div>
        </div>
      </div>
    </div>
  )
}