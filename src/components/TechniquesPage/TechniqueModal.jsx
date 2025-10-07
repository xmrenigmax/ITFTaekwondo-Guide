// src/components/techniques/TechniqueModal.jsx
export const TechniqueModal = ({ technique, isOpen, onClose }) => {
  if (!isOpen || !technique) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-background border border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-primary">{technique.korean}</h3>
              <p className="text-foreground/80 font-semibold">{technique.english}</p>
            </div>
            <button
              onClick={onClose}
              className="text-foreground/60 hover:text-foreground transition-colors p-2 rounded-lg hover:bg-primary/10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Technique Image */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-8 flex items-center justify-center min-h-64">
            {technique.image ? (
              <img 
                src={technique.image} 
                alt={technique.english}
                className="max-w-full max-h-48 object-contain rounded-lg"
              />
            ) : (
              <div className="text-center">
                <div className="text-6xl mb-4">👊</div>
                <p className="text-foreground/60 text-sm">
                  Technique diagram for {technique.english}
                </p>
                <p className="text-foreground/40 text-xs mt-2">
                  [Add technique photo to JSON data]
                </p>
              </div>
            )}
          </div>

          {/* Detailed Description */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Technique Description</h4>
            <p className="text-foreground/70 leading-relaxed">
              {technique.detailedDescription}
            </p>
          </div>

          {/* Step-by-Step Execution */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Execution Steps</h4>
            <ol className="text-foreground/70 space-y-2 text-sm">
              {technique.steps.map((step, index) => (
                <li key={index} className="flex items-start">
                  <span className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Application & Usage */}
          <div className="bg-primary/5 border border-primary/10 rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-2">Practical Application</h4>
            <p className="text-foreground/70 text-sm">
              {technique.application}
            </p>
          </div>

          {/* Common Mistakes */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Common Mistakes to Avoid</h4>
            <ul className="text-foreground/70 space-y-1 text-sm">
              {technique.commonMistakes.map((mistake, index) => (
                <li key={index}>• {mistake}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}