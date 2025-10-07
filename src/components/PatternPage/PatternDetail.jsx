
// src/components/PatternPage/PatternDetail.jsx
export const PatternDetail = ({ pattern, onBack }) => {
  
  // Catch errors 
  if (!pattern) return (
    <div className="bg-background border border-border rounded-2xl shadow-lg p-8 text-center">
      <div className="text-4xl mb-4">❌</div>
      <h2 className="text-2xl font-bold text-foreground mb-4">No Pattern Selected</h2>
      <p className="text-foreground/70 mb-6">Please select a pattern to view details.</p>
      <button onClick={onBack} className="text-primary hover:text-primary-hover">
        Back to Patterns
      </button>
    </div>
  )

  // Helper function to get belt color class
  const getBeltColorClass = (beltColor) => {
    const colorMap = {
      // Solid colors
      'White': 'bg-white border-gray-300 text-gray-800',
      'Yellow': 'bg-yellow-400 border-yellow-500 text-yellow-900',
      'Green': 'bg-green-500 border-green-600 text-white',
      'Blue': 'bg-blue-500 border-blue-600 text-white',
      'Red': 'bg-red-500 border-red-600 text-white',
      'Black': 'bg-black border-gray-800 text-white',
      
      // Striped belts
      'White with Yellow Stripe': 'bg-gradient-to-r from-white from-70% to-yellow-400 to-70% border-gray-300 text-gray-800',
      'Yellow with Green Stripe': 'bg-gradient-to-r from-yellow-400 from-70% to-green-500 to-70% border-yellow-500 text-white',
      'Green with Blue Stripe': 'bg-gradient-to-r from-green-500 from-70% to-blue-500 to-70% border-green-600 text-white',
      'Blue with Red Stripe': 'bg-gradient-to-r from-blue-500 from-70% to-red-500 to-70% border-blue-600 text-white',
      'Red with Black Stripe': 'bg-gradient-to-r from-red-500 from-70% to-black to-70% border-red-600 text-white'
    }
    return colorMap[beltColor] || 'bg-gray-200 border-gray-300 text-gray-800'
  }

  return (
    <div className="bg-background border border-border rounded-2xl shadow-lg p-8">
      <button 
        onClick={onBack}
        className="flex items-center text-primary hover:text-primary-hover mb-6 transition-colors"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Patterns
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pattern Diagram & Info */}
        <div>
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-8 mb-6">
            <div className="text-center">
              <div className="text-6xl mb-4">{pattern.diagram || "🌀"}</div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                {pattern.name || pattern.id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </h2>
              <div className="flex items-center justify-center space-x-4">
                <span className="text-foreground/70">
                  {pattern.moveCount} Movements
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getBeltColorClass(pattern.beltColor)}`}>
                  {pattern.beltColor} Belt
                </span>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Meaning</h3>
              <p className="text-foreground/70 leading-relaxed">
                {pattern.meaning}
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-2">Diagram</h3>
              <div className="bg-primary/5 border border-primary/10 rounded-lg p-6 text-center">
                <div className="text-4xl font-mono mb-2">{pattern.patternShape || "+"}</div>
                <p className="text-sm text-foreground/60">
                  {pattern.patternDescription || "Traditional pattern shape"}
                </p>
              </div>
            </div>

            {/* Historical Context */}
            {pattern.historicalContext && (
              <div>
                <h3 className="font-semibold text-foreground mb-2">Historical Context</h3>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  {pattern.historicalContext}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Step-by-Step Instructions */}
        <div>
          <h3 className="text-xl font-bold text-foreground mb-6">Movements</h3>
          
          {pattern.movements && pattern.movements.length > 0 ? (
            <div className="space-y-3">
              {pattern.movements.map((movement, index) => (
                <div key={index} className="flex items-start p-4 bg-primary/5 border border-primary/10 rounded-lg">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 font-semibold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">
                      {movement.stance || "Ready Stance"}
                    </h4>
                    <p className="text-foreground/70 text-sm mt-1">
                      {movement.description}
                    </p>
                    {movement.steps && movement.steps.length > 0 && (
                      <ul className="text-foreground/60 text-xs mt-2 space-y-1">
                        {movement.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex">
                            <span className="mr-2">•</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-foreground/50">
              <div className="text-4xl mb-2">🥋</div>
              <p>Movement details coming soon...</p>
              <p className="text-sm mt-2">Complete movement breakdown in progress</p>
            </div>
          )}

          {/* Pattern Progression */}
          <div className="mt-8 p-4 bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">Pattern Progression</h4>
            <p className="text-foreground/70 text-sm">
              This {pattern.beltRank} pattern contains {pattern.moveCount} movements and focuses on {pattern.focus || "fundamental techniques"}.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}