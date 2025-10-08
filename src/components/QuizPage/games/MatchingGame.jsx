
import { useState, useEffect } from 'react'

export const MatchingGame = ({ quiz, onComplete }) => {
  const [pairs, setPairs] = useState([])
  const [selectedCard, setSelectedCard] = useState(null)
  const [matchedPairs, setMatchedPairs] = useState([])
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit)
  const [gameState, setGameState] = useState('playing')

  // Initialize game
  useEffect(() => {
    const shuffledPairs = [...quiz.pairs, ...quiz.pairs.map(pair => ({
      ...pair,
      id: pair.id + '-copy',
      isKorean: !pair.isKorean
    }))].sort(() => Math.random() - 0.5)
    
    setPairs(shuffledPairs.map(pair => ({
      ...pair,
      isFlipped: false,
      isMatched: false
    })))
  }, [quiz.pairs])

  useEffect(() => {
    if (timeLeft > 0 && gameState === 'playing') {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      finishGame()
    }
  }, [timeLeft, gameState])

  const handleCardClick = (index) => {
    if (pairs[index].isFlipped || pairs[index].isMatched) return

    const newPairs = [...pairs]
    newPairs[index].isFlipped = true
    setPairs(newPairs)

    if (selectedCard === null) {
      setSelectedCard(index)
    } else {
      // Check for match
      const firstCard = pairs[selectedCard]
      const secondCard = pairs[index]
      
      const isMatch = firstCard.id.replace('-copy', '') === secondCard.id.replace('-copy', '')
      
      if (isMatch) {
        // Update pairs first
        newPairs[selectedCard].isMatched = true
        newPairs[index].isMatched = true
        setPairs(newPairs)
        
        // Then update matchedPairs with the new count
        const newMatchedPairs = [...matchedPairs, firstCard.id.replace('-copy', '')]
        setMatchedPairs(newMatchedPairs)
        
        // Check if game is complete using the NEW count
        if (newMatchedPairs.length === quiz.pairs.length) {
          setTimeout(() => finishGame(newMatchedPairs.length), 500)
        }
      } else {
        setTimeout(() => {
          const resetPairs = [...pairs]
          resetPairs[selectedCard].isFlipped = false
          resetPairs[index].isFlipped = false
          setPairs(resetPairs)
        }, 1000)
      }
      setSelectedCard(null)
    }
  }

  const finishGame = (finalMatchedCount = matchedPairs.length) => {
    setGameState('finished')
    const score = Math.floor((finalMatchedCount / quiz.pairs.length) * quiz.points)
    
    onComplete({
      score,
      totalPairs: quiz.pairs.length,
      matchedPairs: finalMatchedCount,
      timeUsed: quiz.timeLimit - timeLeft
    })
  }

  if (gameState === 'finished') {
    const matchedCount = matchedPairs.length
    const score = Math.floor((matchedCount / quiz.pairs.length) * quiz.points)
    
    return (
      <div className="text-center space-y-6">
        <div className="text-6xl mb-4">🃏</div>
        <h2 className="text-3xl font-bold text-foreground">Matching Complete!</h2>
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          <div className="bg-primary/10 rounded-xl p-4">
            <div className="text-2xl font-bold text-primary">{score}</div>
            <div className="text-sm text-foreground/70">Points</div>
          </div>
          <div className="bg-primary/10 rounded-xl p-4">
            <div className="text-2xl font-bold text-primary">
              {matchedCount}/{quiz.pairs.length}
            </div>
            <div className="text-sm text-foreground/70">Matched</div>
          </div>
          <div className="bg-primary/10 rounded-xl p-4">
            <div className="text-2xl font-bold text-primary">
              {Math.floor((quiz.timeLimit - timeLeft) / 60)}:{(quiz.timeLimit - timeLeft) % 60 < 10 ? '0' : ''}{(quiz.timeLimit - timeLeft) % 60}
            </div>
            <div className="text-sm text-foreground/70">Time</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-foreground/60">
          Matched {matchedPairs.length} of {quiz.pairs.length} pairs
        </div>
        <div className="text-sm font-semibold text-primary">
          Time: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${(matchedPairs.length / quiz.pairs.length) * 100}%` }}
        ></div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-4 gap-4">
        {pairs.map((pair, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(index)}
            className={`aspect-square cursor-pointer transition-transform duration-300 ${
              pair.isFlipped || pair.isMatched ? '' : 'hover:scale-105'
            }`}
          >
            <div className={`w-full h-full rounded-xl border-2 transition-all duration-300 flex items-center justify-center p-4 text-center ${
              pair.isMatched
                ? 'bg-green-500 text-white border-green-500'
                : pair.isFlipped
                ? 'bg-primary text-white border-primary'
                : 'bg-background border-primary hover:bg-primary/10'
            }`}>
              {pair.isFlipped || pair.isMatched ? (
                <div>
                  <div className="font-bold text-lg">
                    {pair.isKorean ? pair.korean : pair.english}
                  </div>
                  {pair.isFlipped && pair.romanized && (
                    <div className="text-sm opacity-80 mt-1">
                      ({pair.romanized})
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-2xl">?</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="text-center text-foreground/60 text-sm">
        Click cards to find matching Korean-English pairs
      </div>
    </div>
  )
}