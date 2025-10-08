import { useState, useEffect } from 'react'

export const TranslationGame = ({ quiz, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [userInput, setUserInput] = useState('')
  const [score, setScore] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit)
  const [gameState, setGameState] = useState('playing')
  const [feedback, setFeedback] = useState({ show: false, isCorrect: false, message: '' })
  const [answeredQuestions, setAnsweredQuestions] = useState([])

  // Initialize game
  useEffect(() => {
    if (quiz.questions && quiz.questions.length > 0) {
      setCurrentQuestion(quiz.questions[0])
    }
  }, [quiz.questions])

  useEffect(() => {
    if (timeLeft > 0 && gameState === 'playing') {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      finishGame()
    }
  }, [timeLeft, gameState])

  const normalizeAnswer = (answer) => {
    return answer.toLowerCase().trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
  }

  const isAnswerCorrect = (userAnswer, correctAnswer) => {
    const normalizedUser = normalizeAnswer(userAnswer)
    const normalizedCorrect = normalizeAnswer(correctAnswer)
    
    // Exact match
    if (normalizedUser === normalizedCorrect) return true
    
    // Allow minor spelling variations for kids
    const commonVariations = {
      'colour': 'color',
      'favourite': 'favorite',
      'centre': 'center',
      'honour': 'honor',
      'defence': 'defense'
    }
    
    if (commonVariations[normalizedUser] === normalizedCorrect || 
        commonVariations[normalizedCorrect] === normalizedUser) {
      return true
    }
    
    // Allow answers without articles for simplicity
    const withoutArticles = (str) => str.replace(/^(a|an|the)\s+/i, '')
    if (withoutArticles(normalizedUser) === withoutArticles(normalizedCorrect)) {
      return true
    }

    // Allow plural/singular variations for simple cases
    if ((normalizedUser + 's' === normalizedCorrect) || 
        (normalizedUser === normalizedCorrect + 's') ||
        (normalizedUser + 'es' === normalizedCorrect) ||
        (normalizedUser === normalizedCorrect + 'es')) {
      return true
    }
    
    return false
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!userInput.trim()) return

    const isCorrect = isAnswerCorrect(userInput, currentQuestion.english)
    const pointsEarned = Math.floor(quiz.points / quiz.questions.length)
    
    if (isCorrect) {
      setScore(prev => prev + pointsEarned)
      setFeedback({
        show: true,
        isCorrect: true,
        message: 'Correct! 🎉'
      })
    } else {
      setFeedback({
        show: true,
        isCorrect: false,
        message: `Almost! The answer is "${currentQuestion.english}"`
      })
    }

    // Record the answered question
    const newAnsweredQuestions = [...answeredQuestions, {
      ...currentQuestion,
      userAnswer: userInput,
      isCorrect,
      points: isCorrect ? pointsEarned : 0
    }]
    setAnsweredQuestions(newAnsweredQuestions)

    // Move to next question after delay
    setTimeout(() => {
      setFeedback({ show: false, isCorrect: false, message: '' })
      
      const nextIndex = currentIndex + 1
      if (nextIndex < quiz.questions.length) {
        setCurrentIndex(nextIndex)
        setCurrentQuestion(quiz.questions[nextIndex])
        setUserInput('')
      } else {
        // Use the updated answeredQuestions to finish the game
        const correctCount = newAnsweredQuestions.filter(q => q.isCorrect).length
        const finalScore = newAnsweredQuestions.reduce((total, q) => total + q.points, 0)
        
        setGameState('finished')
        onComplete({
          score: finalScore,
          totalQuestions: quiz.questions.length,
          correctAnswers: correctCount,
          timeUsed: quiz.timeLimit - timeLeft,
          answeredQuestions: newAnsweredQuestions
        })
      }
    }, 2000)
  }

  const handleSkip = () => {
    setFeedback({
      show: true,
      isCorrect: false,
      message: `Skipped! The answer was "${currentQuestion.english}"`
    })

    // Record skipped question
    const newAnsweredQuestions = [...answeredQuestions, {
      ...currentQuestion,
      userAnswer: 'skipped',
      isCorrect: false,
      points: 0
    }]
    setAnsweredQuestions(newAnsweredQuestions)

    setTimeout(() => {
      setFeedback({ show: false, isCorrect: false, message: '' })
      
      const nextIndex = currentIndex + 1
      if (nextIndex < quiz.questions.length) {
        setCurrentIndex(nextIndex)
        setCurrentQuestion(quiz.questions[nextIndex])
        setUserInput('')
      } else {
        // Use the updated answeredQuestions to finish the game
        const correctCount = newAnsweredQuestions.filter(q => q.isCorrect).length
        const finalScore = newAnsweredQuestions.reduce((total, q) => total + q.points, 0)
        
        setGameState('finished')
        onComplete({
          score: finalScore,
          totalQuestions: quiz.questions.length,
          correctAnswers: correctCount,
          timeUsed: quiz.timeLimit - timeLeft,
          answeredQuestions: newAnsweredQuestions
        })
      }
    }, 1500)
  }

  const playAudio = () => {
    if (currentQuestion.audio) {
      const audio = new Audio(currentQuestion.audio)
      audio.play().catch(e => console.log('Audio play failed:', e))
    }
  }

  const finishGame = () => {
    const correctCount = answeredQuestions.filter(q => q.isCorrect).length
    const finalScore = answeredQuestions.reduce((total, q) => total + q.points, 0)
    
    setGameState('finished')
    onComplete({
      score: finalScore,
      totalQuestions: quiz.questions.length,
      correctAnswers: correctCount,
      timeUsed: quiz.timeLimit - timeLeft,
      answeredQuestions
    })
  }

  if (gameState === 'finished') {
    const correctCount = answeredQuestions.filter(q => q.isCorrect).length
    const finalScore = answeredQuestions.reduce((total, q) => total + q.points, 0)
    
    return (
      <div className="text-center space-y-6">
        <div className="text-6xl mb-4">📝</div>
        <h2 className="text-3xl font-bold text-foreground">Translation Complete!</h2>
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          <div className="bg-primary/10 rounded-xl p-4">
            <div className="text-2xl font-bold text-primary">{finalScore}</div>
            <div className="text-sm text-foreground/70">Points</div>
          </div>
          <div className="bg-primary/10 rounded-xl p-4">
            <div className="text-2xl font-bold text-primary">
              {correctCount}/{quiz.questions.length}
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

        {/* Results Summary */}
        <div className="max-w-2xl mx-auto bg-card rounded-xl p-6 border space-y-4">
          <h3 className="text-xl font-bold text-foreground">Your Answers</h3>
          {answeredQuestions.map((question, index) => (
            <div key={index} className={`p-4 rounded-lg border-2 ${
              question.isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex justify-between items-start">
                <div className="text-left">
                  <div className="font-semibold text-foreground">{question.romanized}</div>
                  <div className="text-sm text-foreground/60">{question.korean}</div>
                  <div className="text-sm mt-1">
                    Your answer: <span className={question.isCorrect ? "text-green-600" : "text-red-600"}>
                      {question.userAnswer}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-bold ${question.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                    {question.isCorrect ? '✓' : '✗'}
                  </div>
                  <div className="text-sm text-foreground/60">+{question.points}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!currentQuestion) {
    return <div className="text-center">Loading game...</div>
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-foreground/60">
          Question {currentIndex + 1} of {quiz.questions.length}
        </div>
        <div className="text-sm font-semibold text-primary">
          Time: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex) / quiz.questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Game Area */}
      <div className="bg-card rounded-2xl p-8 shadow-lg border text-center space-y-6">
        {/* Word to Translate */}
        <div className="space-y-4">
          <div className="text-foreground/60 text-sm">Write the English translation:</div>
          <div className="text-4xl font-bold text-primary mb-2">
            {currentQuestion.romanized}
          </div>
          <div className="text-2xl text-foreground/80">
            {currentQuestion.korean}
          </div>
          
          {/* Audio Button */}
          {currentQuestion.audio && (
            <button
              onClick={playAudio}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              <span>🔊</span>
              Listen
            </button>
          )}
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type the English translation..."
              className="w-full px-4 py-3 text-lg border-2 border-primary rounded-xl focus:outline-none focus:border-primary/70 bg-background text-center"
              disabled={feedback.show}
              autoFocus
            />
          </div>

          {/* Feedback Message */}
          {feedback.show && (
            <div className={`p-4 rounded-xl text-lg font-semibold ${
              feedback.isCorrect 
                ? 'bg-green-100 text-green-800 border border-green-300' 
                : 'bg-red-100 text-red-800 border border-red-300'
            }`}>
              {feedback.message}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 justify-center pt-4">
            <button
              type="button"
              onClick={handleSkip}
              disabled={feedback.show}
              className="px-6 py-3 border-2 border-foreground/20 text-foreground/70 rounded-xl hover:bg-foreground/5 disabled:opacity-50 transition-colors"
            >
              Skip
            </button>
            <button
              type="submit"
              disabled={feedback.show || !userInput.trim()}
              className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 disabled:opacity-50 transition-colors font-semibold"
            >
              Check Answer
            </button>
          </div>
        </form>
      </div>

      {/* Instructions */}
      <div className="text-center text-foreground/60 text-sm">
        Type the English meaning of the Korean word. Don't worry about capitalization or small spelling mistakes!
      </div>

      {/* Score Display */}
      <div className="text-center">
        <div className="inline-block bg-primary/10 rounded-full px-4 py-2">
          <span className="text-sm text-foreground/60 mr-2">Score:</span>
          <span className="font-bold text-primary">{score}</span>
          <span className="text-sm text-foreground/60 ml-2">/ {quiz.points}</span>
        </div>
      </div>
    </div>
  )
}