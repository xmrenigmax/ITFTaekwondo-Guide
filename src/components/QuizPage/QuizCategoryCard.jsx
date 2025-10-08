

export const QuizCategoryCard = ({ category, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left hover:scale-105 hover:shadow-lg ${
        isSelected
          ? 'bg-primary text-white border-primary shadow-md'
          : 'bg-background border-border hover:border-primary/50'
      }`}
    >
      <div className="text-3xl mb-3">{category.icon}</div>
      <h3 className="text-xl font-bold mb-2">{category.name}</h3>
      <p className="text-sm opacity-80 leading-relaxed">
        {category.description}
      </p>
      <div className="mt-3 text-xs opacity-70">
        {category.totalQuizzes} quizzes available
      </div>
    </button>
  )
}