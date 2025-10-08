
export const QuizCard = ({ quiz, gameType, onSelect }) => {
  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: 'bg-green-500',
      medium: 'bg-blue-500', 
      hard: 'bg-red-500'
    }
    return colors[difficulty] || 'bg-gray-500'
  }

  return (
    <div 
      onClick={() => onSelect(quiz)}
      className="bg-background border border-border rounded-2xl p-6 hover:shadow-lg hover:border-primary/50 hover:scale-105 transition-all duration-300 cursor-pointer"
    >
      {/* Game Type & Difficulty */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{gameType?.icon}</span>
          <span className="text-sm text-foreground/70">{gameType?.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getDifficultyColor(quiz.difficulty)}`}>
            {quiz.difficulty.toUpperCase()}
          </span>
          <span className="text-sm text-foreground/60">{quiz.points} pts</span>
        </div>
      </div>

      {/* Quiz Title */}
      <h3 className="text-xl font-bold text-foreground mb-2">{quiz.title}</h3>
      
      {/* Description */}
      <p className="text-foreground/70 text-sm mb-4 leading-relaxed">
        {quiz.description}
      </p>

      {/* Quiz Info */}
      <div className="flex items-center justify-between text-sm text-foreground/60">
        <div className="flex items-center gap-4">
          {quiz.questionCount && <span>{quiz.questionCount} questions</span>}
          <span>{Math.floor(quiz.timeLimit / 60)} min</span>
        </div>
        <button className="text-primary hover:text-primary-hover font-medium">
          Start {gameType?.name} →
        </button>
      </div>
    </div>
  )
}