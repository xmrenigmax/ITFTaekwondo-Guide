
import { useState, useEffect } from 'react'

export const MCQGame = ({ quiz, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0) // Track correct count directly
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit)
  const [gameState, setGameState] = useState('playing') // 'playing', 'finished'

  const currentQ = quiz.questions[currentQuestion]
  const pointsPerQuestion = Math.floor(quiz.points / quiz.questions.length)

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && gameState === 'playing') {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      finishGame()
    }
  }, [timeLeft, gameState])

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex)
    
    // Check if correct
    let newScore = score
    let newCorrectCount = correctAnswers
    
    if (answerIndex === currentQ.correctAnswer) {
      newScore = score + pointsPerQuestion
      newCorrectCount = correctAnswers + 1
      setScore(newScore)
      setCorrectAnswers(newCorrectCount)
    }

    // Move to next question or finish
    setTimeout(() => {
      if (currentQuestion < quiz.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      } else {
        finishGame(newScore, newCorrectCount)
      }
    }, 1000)
  }

  const finishGame = (finalScore = score, finalCorrectCount = correctAnswers) => {
    setGameState('finished')
    onComplete({
      score: finalScore,
      totalQuestions: quiz.questions.length,
      correctAnswers: finalCorrectCount, // Use the directly tracked count
      timeUsed: quiz.timeLimit - timeLeft
    })
  }

  if (gameState === 'finished') {
    return (
      <div className="text-center space-y-6">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold text-foreground">Quiz Complete!</h2>
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          <div className="bg-primary/10 rounded-xl p-4">
            <div className="text-2xl font-bold text-primary">{score}</div>
            <div className="text-sm text-foreground/70">Points</div>
          </div>
          <div className="bg-primary/10 rounded-xl p-4">
            <div className="text-2xl font-bold text-primary">
              {correctAnswers}/{quiz.questions.length}
            </div>
            <div className="text-sm text-foreground/70">Correct</div>
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
          Question {currentQuestion + 1} of {quiz.questions.length}
        </div>
        <div className="text-sm font-semibold text-primary">
          Time: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-foreground mb-6">
          {currentQ.question}
        </h3>
        
        {/* Options */}
        <div className="grid grid-cols-1 gap-3 max-w-2xl mx-auto">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={selectedAnswer !== null}
              className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                selectedAnswer === null
                  ? 'bg-background border-border hover:border-primary/50 hover:bg-primary/5'
                  : selectedAnswer === index
                  ? index === currentQ.correctAnswer
                    ? 'bg-green-500 text-white border-green-500'
                    : 'bg-red-500 text-white border-red-500'
                  : index === currentQ.correctAnswer
                  ? 'bg-green-500 text-white border-green-500'
                  : 'bg-background border-border opacity-50'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-3 font-semibold ${
                  selectedAnswer === null
                    ? 'border-primary text-primary'
                    : selectedAnswer === index
                    ? index === currentQ.correctAnswer
                      ? 'border-white text-white'
                      : 'border-white text-white'
                    : index === currentQ.correctAnswer
                    ? 'border-white text-white'
                    : 'border-gray-300 text-gray-300'
                }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span>{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Explanation (when answered) */}
      {selectedAnswer !== null && (
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mt-6">
          <h4 className="font-semibold text-primary mb-2">Explanation:</h4>
          <p className="text-foreground/70">{currentQ.explanation}</p>
        </div>
      )}
    </div>
  )
}