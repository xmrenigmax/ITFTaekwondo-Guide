
export const DifficultySelector = ({ difficulties, selectedDifficulty, onDifficultySelect }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {difficulties.map((difficulty) => (
        <button
          key={difficulty.id}
          onClick={() => onDifficultySelect(
            selectedDifficulty === difficulty.id ? null : difficulty.id
          )}
          className={`px-6 py-3 rounded-full border-2 transition-all duration-200 font-medium ${
            selectedDifficulty === difficulty.id
              ? 'bg-primary text-white border-primary shadow-md'
              : 'bg-background border-border hover:bg-primary/10 hover:border-primary/50'
          }`}
        >
          <span className="mr-2">{difficulty.icon}</span>
          {difficulty.name}
        </button>
      ))}
    </div>
  )
}