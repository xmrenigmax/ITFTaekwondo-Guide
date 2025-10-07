

import PatternData from '/src/data/patterns/Patterns.json'

// PatternMatrix Component
export const PatternMatrix = ({ onPatternSelect }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-foreground mb-8">
        Pattern Matrix
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {PatternData.patterns.map((pattern) => (
          <div 
            key={pattern.id}
            className="bg-background border border-border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-primary/50"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                {pattern.diagram || "🥋"}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {pattern.name}
              </h3>
              <p className="text-foreground/70 text-sm mb-3">
                {pattern.moveCount} Movements • {pattern.beltColor} Belt
              </p>
              <button 
                onClick={() => onPatternSelect(pattern)}
                className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}