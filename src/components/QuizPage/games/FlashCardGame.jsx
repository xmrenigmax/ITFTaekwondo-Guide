
import { useState, useEffect, useRef } from 'react'

export const FlashcardGame = ({ quiz, onComplete }) => {
  const [currentCard, setCurrentCard] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit)
  const [gameState, setGameState] = useState('playing')
  const audioRef = useRef(null)

  const currentCardData = quiz.cards[currentCard]

  useEffect(() => {
    if (timeLeft > 0 && gameState === 'playing') {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      finishGame()
    }
  }, [timeLeft, gameState])

  const playAudio = () => {
    if (audioRef.current && currentCardData.audio) {
      audioRef.current.play()
    }
  }

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped)
  }
  const handleNextCard = (remembered) => {
    let newScore = score
    
    if (remembered) {
      newScore = score + Math.floor(quiz.points / quiz.cards.length)
      setScore(newScore)
    }

    if (currentCard < quiz.cards.length - 1) {
      setCurrentCard(currentCard + 1)
      setIsFlipped(false)
    } else {
      // Calculate final score properly
      const finalScore = remembered ? newScore : score
      finishGame(finalScore)
    }
  }

  // Update finishGame to accept score parameter
  const finishGame = (finalScore = score) => {
    setGameState('finished')
    const rememberedCount = Math.round((finalScore / (quiz.points / quiz.cards.length)))
    onComplete({
      score: finalScore,
      totalCards: quiz.cards.length,
      rememberedCards: rememberedCount,
      timeUsed: quiz.timeLimit - timeLeft
    })
  }

  if (gameState === 'finished') {
    return (
      <div className="text-center space-y-6">
        <div className="text-6xl mb-4">🎴</div>
        <h2 className="text-3xl font-bold text-foreground">Flashcards Complete!</h2>
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          <div className="bg-primary/10 rounded-xl p-4">
            <div className="text-2xl font-bold text-primary">{score}</div>
            <div className="text-sm text-foreground/70">Points</div>
          </div>
          <div className="bg-primary/10 rounded-xl p-4">
            <div className="text-2xl font-bold text-primary">
              {Math.round((score / (quiz.points / quiz.cards.length)))}/{quiz.cards.length}
            </div>
            <div className="text-sm text-foreground/70">Remembered</div>
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
          Card {currentCard + 1} of {quiz.cards.length}
        </div>
        <div className="text-sm font-semibold text-primary">
          Time: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentCard + 1) / quiz.cards.length) * 100}%` }}
        ></div>
      </div>

      {/* Flashcard */}
      <div className="flex justify-center">
        <div 
          onClick={handleCardFlip}
          className="w-80 h-48 cursor-pointer perspective-1000"
        >
          <div className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}>
            {/* Front of card */}
            <div className="absolute w-full h-full bg-background border-2 border-primary rounded-2xl p-6 backface-hidden flex flex-col items-center justify-center">
              <h3 className="text-2xl font-bold text-foreground text-center mb-4">
                {currentCardData.front}
              </h3>
              <p className="text-foreground/60 text-sm">Click to flip</p>
            </div>

            {/* Back of card */}
            <div className="absolute w-full h-full bg-primary text-white rounded-2xl p-6 backface-hidden rotate-y-180 flex flex-col items-center justify-center">
              <h3 className="text-2xl font-bold text-center mb-2">
                {currentCardData.back}
              </h3>
              {currentCardData.romanized && (
                <p className="text-white/80 text-lg mb-2">({currentCardData.romanized})</p>
              )}
              <p className="text-white/70 text-sm text-center mb-4">
                {currentCardData.meaning}
              </p>
              {currentCardData.audio && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    playAudio()
                  }}
                  className="bg-white text-primary px-4 py-2 rounded-lg font-semibold hover:bg-white/90 transition-colors"
                >
                  🔊 Play Audio
                </button>
              )}
              <audio ref={audioRef} src={currentCardData.audio} preload="none" />
            </div>
          </div>
        </div>
      </div>

      {/* Remember Buttons (only when flipped) */}
      {isFlipped && (
        <div className="flex justify-center gap-4">
          <button
            onClick={() => handleNextCard(false)}
            className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
          >
            Need Practice
          </button>
          <button
            onClick={() => handleNextCard(true)}
            className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
          >
            I Remember!
          </button>
        </div>
      )}
    </div>
  )
}