
import { useState, useEffect, useRef } from 'react'
import { MCQGame } from './games/MCQGame'
import { FlashcardGame } from './games/FlashCardGame'
import { MatchingGame } from './games/MatchingGame'
import { TranslationGame } from './games/TranslationGame'
import { WordSearchGame } from './games/WordSearchGame'
import { useScrollTo } from '../../hooks/useScrollTo'

export const QuizGame = ({ quiz, onBack }) => {
  const [gameState, setGameState] = useState('ready') // 'ready', 'playing', 'finished'
  const [gameResults, setGameResults] = useState(null)
  const scrollToTop = useScrollTo('top')

  const handleGameComplete = (results) => {
    setGameResults(results)
    setGameState('finished')
  }

  const handlePlayAgain = () => {
    setGameState('ready')
    setGameResults(null)
  }

  useEffect(() => {
    if (gameState === 'playing' || gameState === 'finished') {
      scrollToTop('smooth')
    }
  }, [gameState, scrollToTop])

  const handleStartGame = () => {
    setGameState('playing')
    setTimeout(() => {
      scrollToTop('smooth')
    }, 100)
  }

  // Render the appropriate game component
  const renderGame = () => {
    switch (quiz.gameType) {
      case 'mcq':
        return <MCQGame quiz={quiz} onComplete={handleGameComplete} />
      case 'flashcards':
        return <FlashcardGame quiz={quiz} onComplete={handleGameComplete} />
      case 'matching':
        return <MatchingGame quiz={quiz} onComplete={handleGameComplete} />
      case 'translation':
        return <TranslationGame quiz={quiz} onComplete={handleGameComplete} />
      case 'wordsearch':
        return <WordSearchGame quiz={quiz} onComplete={handleGameComplete} />
      default:
        return (
          <div className="text-center">
            <div className="text-4xl mb-4">🚧</div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Game Coming Soon</h2>
            <p className="text-foreground/70">This game type is under development!</p>
          </div>
        )
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-primary hover:text-primary-hover transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Quizzes
        </button>
        
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">{quiz.title}</h1>
          <p className="text-foreground/70">{quiz.description}</p>
        </div>

        <div className="w-20"></div>
      </div>

       {/* Game Content */}
      <div className="bg-background border border-border rounded-2xl p-8">
        {gameState === 'ready' && (
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">🎯</div>
            <h2 className="text-2xl font-bold text-foreground">Ready to Start?</h2>
            <p className="text-foreground/70 max-w-md mx-auto">
              {quiz.questionCount && `${quiz.questionCount} questions • `}
              {quiz.cards && `${quiz.cards.length} cards • `}
              {quiz.pairs && `${quiz.pairs.length} pairs to match • `}
              {Math.floor(quiz.timeLimit / 60)} minute time limit
            </p>
            <button
              onClick={handleStartGame}
              className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Start Game
            </button>
          </div>
        )}

        {gameState === 'playing' && renderGame()}

        {gameState === 'finished' && gameResults && (
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-3xl font-bold text-foreground">Game Complete!</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-primary/10 rounded-xl p-4">
                <div className="text-2xl font-bold text-primary">{gameResults.score}</div>
                <div className="text-sm text-foreground/70">Score</div>
              </div>
              
              {gameResults.totalQuestions && (
                <div className="bg-primary/10 rounded-xl p-4">
                  <div className="text-2xl font-bold text-primary">
                    {gameResults.correctAnswers}/{gameResults.totalQuestions}
                  </div>
                  <div className="text-sm text-foreground/70">Correct</div>
                </div>
              )}
              
              {gameResults.totalCards && (
                <div className="bg-primary/10 rounded-xl p-4">
                  <div className="text-2xl font-bold text-primary">
                    {gameResults.rememberedCards}/{gameResults.totalCards}
                  </div>
                  <div className="text-sm text-foreground/70">Remembered</div>
                </div>
              )}
              
              {gameResults.totalPairs && (
                <div className="bg-primary/10 rounded-xl p-4">
                  <div className="text-2xl font-bold text-primary">
                    {gameResults.matchedPairs}/{gameResults.totalPairs}
                  </div>
                  <div className="text-sm text-foreground/70">Matched</div>
                </div>
              )}
              
              <div className="bg-primary/10 rounded-xl p-4">
                <div className="text-2xl font-bold text-primary">
                  {Math.floor(gameResults.timeUsed / 60)}:{gameResults.timeUsed % 60 < 10 ? '0' : ''}{gameResults.timeUsed % 60}
                </div>
                <div className="text-sm text-foreground/70">Time Used</div>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={handlePlayAgain}
                className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg transition-colors"
              >
                Play Again
              </button>
              <button
                onClick={onBack}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Back to Quizzes
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Quiz Info Footer */}
      <div className="mt-6 grid grid-cols-3 gap-4 text-center text-sm">
        <div className="bg-primary/10 rounded-lg p-3">
          <div className="font-semibold text-primary">
            {quiz.questionCount ? 'Questions' : quiz.cards ? 'Cards' : quiz.pairs ? 'Pairs' : 'Items'}
          </div>
          <div>{quiz.questionCount || quiz.cards?.length || quiz.pairs?.length}</div>
        </div>
        <div className="bg-primary/10 rounded-lg p-3">
          <div className="font-semibold text-primary">Time Limit</div>
          <div>{Math.floor(quiz.timeLimit / 60)} minutes</div>
        </div>
        <div className="bg-primary/10 rounded-lg p-3">
          <div className="font-semibold text-primary">Points</div>
          <div>{quiz.points} total</div>
        </div>
      </div>
    </div>
  )
}