
import PatternData from '/src/data/patterns/Patterns.json'

// PatternSidebar Component
export const PatternSidebar = ({ selectedPattern, onPatternSelect }) => {
  // Group patterns by belt color
  const beltGroups = PatternData.patterns.reduce((groups, pattern) => {
    const belt = `${pattern.beltColor} Belt`
    if (!groups[belt]) groups[belt] = []
    groups[belt].push(pattern)
    return groups
  }, {})

  return (
    <div className="bg-background border border-border rounded-2xl shadow-lg p-6 sticky top-24 max-h-[80vh] overflow-y-auto">
      <h3 className="text-xl font-bold text-foreground mb-6">
        All Patterns
      </h3>
      
      <div className="space-y-6">
        {Object.entries(beltGroups).map(([belt, patterns]) => (
          <div key={belt}>
            <h4 className="font-semibold text-foreground/80 mb-3 text-sm uppercase tracking-wide border-b border-border pb-2">
              {belt}
            </h4>
            <div className="space-y-2">
              {patterns.map((pattern) => (
                <button
                  key={pattern.id}
                  onClick={() => onPatternSelect(pattern)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                    selectedPattern?.id === pattern.id 
                      ? 'bg-primary text-white shadow-md' 
                      : 'hover:bg-primary/10 text-foreground/80 hover:text-foreground'
                  }`}
                >
                  {pattern.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}