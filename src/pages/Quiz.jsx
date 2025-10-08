
// main imports
import { useState, useEffect, useRef } from 'react'
import { QuizHub } from '../components/QuizPage/QuizHub'
import { QuizGame } from '../components/QuizPage/QuizGame'

// Import all the separate quiz data files
import categoriesData from '../data/quiz/QuizCategories.json'
import mcqData from '../data/quiz/MCQData.json'
import wordSearchData from '../data/quiz/WordSearchData.json'
import translationData from '../data/quiz/TranslationData.json'
import crosswordData from '../data/quiz/CrosswordData.json'
import flashcardData from '../data/quiz/FlashCardData.json'
import matchingData from '../data/quiz/MatchingData.json'

// Combine all quiz data for the main page
const combinedQuizData = {
  ...categoriesData,
  allQuizzes: [
    ...mcqData.quizzes,
    ...wordSearchData.quizzes,
    ...translationData.quizzes,
    ...crosswordData.quizzes,
    ...flashcardData.quizzes,
    ...matchingData.quizzes

  ]
}

// Main Quiz Page Component
export const Quiz = () => {
  const [currentView, setCurrentView] = useState('hub') 
  const [selectedQuiz, setSelectedQuiz] = useState(null)
  const gameContainerRef = useRef(null)

  const handleQuizSelect = (quiz) => {
    setSelectedQuiz(quiz)
    setCurrentView('game')
  }

  const handleBackToHub = () => {
    setSelectedQuiz(null)
    setCurrentView('hub')
  }

  useEffect(() => {
    if (currentView === 'game' && gameContainerRef.current) {
      gameContainerRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }, [currentView])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {currentView === 'hub' ? (
          <QuizHub 
            quizData={combinedQuizData}
            onQuizSelect={handleQuizSelect}
          />
        ) : (
          <QuizGame 
            quiz={selectedQuiz}
            onBack={handleBackToHub}
          />
        )}
      </div>
    </div>
  )
}