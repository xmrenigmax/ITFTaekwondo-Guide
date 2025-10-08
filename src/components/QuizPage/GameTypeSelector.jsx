
export const GameTypeSelector = ({ gameTypes, selectedGameType, onGameTypeSelect }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {gameTypes.map((gameType) => (
        <button
          key={gameType.id}
          onClick={() => onGameTypeSelect(
            selectedGameType === gameType.id ? null : gameType.id
          )}
          className={`flex items-center px-5 py-3 rounded-xl border-2 transition-all duration-200 font-medium ${
            selectedGameType === gameType.id
              ? 'bg-primary text-white border-primary shadow-md'
              : 'bg-background border-border hover:bg-primary/10 hover:border-primary/50'
          }`}
        >
          <span className="text-xl mr-3">{gameType.icon}</span>
          <div className="text-left">
            <div className="font-semibold">{gameType.name}</div>
            <div className="text-xs opacity-80">{gameType.description}</div>
          </div>
        </button>
      ))}
    </div>
  )
}