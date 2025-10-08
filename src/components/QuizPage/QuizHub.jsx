
import { useState } from 'react'
import { QuizCategoryCard } from './QuizCategoryCard'
import { DifficultySelector } from './DifficultySelector'
import { GameTypeSelector } from './GameTypeSelector'
import { QuizCard } from './QuizCard'

// Import all quiz data
import categoriesData from '../../data/quiz/QuizCategories.json'
import mcqData from '../../data/quiz/MCQData.json'
import wordSearchData from '../../data/quiz/WordSearchData.json'
import translationData from '../../data/quiz/TranslationData.json'
import crosswordData from '../../data/quiz/CrosswordData.json'
import flashcardData from '../../data/quiz/FlashCardData.json'
import matchingData from '../../data/quiz/MatchingData.json'

export const QuizHub = ({ onQuizSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState(null)
  const [selectedGameType, setSelectedGameType] = useState(null)

  // Combine all quizzes from different game types
  const allQuizzes = [
    ...mcqData.quizzes,
    ...wordSearchData.quizzes,
    ...translationData.quizzes,
    ...crosswordData.quizzes,
    ...flashcardData.quizzes,
    ...matchingData.quizzes

  ]

  // Filter quizzes based on selection
  const filteredQuizzes = allQuizzes.filter(quiz => {
    const matchesCategory = !selectedCategory || quiz.category === selectedCategory
    const matchesDifficulty = !selectedDifficulty || quiz.difficulty === selectedDifficulty
    const matchesGameType = !selectedGameType || quiz.gameType === selectedGameType
    return matchesCategory && matchesDifficulty && matchesGameType
  })

  const clearFilters = () => {
    setSelectedCategory(null)
    setSelectedDifficulty(null)
    setSelectedGameType(null)
  }

  const hasActiveFilters = selectedCategory || selectedDifficulty || selectedGameType

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
          ITF Taekwon-Do <span className="text-primary">Quiz</span>
        </h1>
        <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
          Test your knowledge, master the art. Challenge yourself with interactive quizzes.
        </p>
      </div>

      {/* Category Selection */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
          Choose a Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categoriesData.quizCategories.map((category) => (
            <QuizCategoryCard
              key={category.id}
              category={category}
              isSelected={selectedCategory === category.id}
              onClick={() => setSelectedCategory(
                selectedCategory === category.id ? null : category.id
              )}
            />
          ))}
        </div>
      </section>

      {/* Game Type Selection */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
          Select Game Type
        </h2>
        <GameTypeSelector
          gameTypes={categoriesData.gameTypes}
          selectedGameType={selectedGameType}
          onGameTypeSelect={setSelectedGameType}
        />
      </section>

      {/* Difficulty Selection */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
          Select Difficulty
        </h2>
        <DifficultySelector
          difficulties={categoriesData.difficultyLevels}
          selectedDifficulty={selectedDifficulty}
          onDifficultySelect={setSelectedDifficulty}
        />
      </section>

      {/* Available Quizzes */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            Available Quizzes ({filteredQuizzes.length})
          </h2>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-primary hover:text-primary-hover text-sm font-medium"
            >
              Clear All Filters
            </button>
          )}
        </div>

        {filteredQuizzes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map((quiz) => (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                gameType={categoriesData.gameTypes.find(g => g.id === quiz.gameType)}
                onSelect={onQuizSelect}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-background border border-border rounded-2xl">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No quizzes found
            </h3>
            <p className="text-foreground/70">
              Try adjusting your category, game type, or difficulty filters
            </p>
          </div>
        )}
      </section>

      {/* Quick Stats */}
      <section className="bg-background border border-border rounded-2xl p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-primary mb-2">
              {allQuizzes.length}
            </div>
            <div className="text-foreground/70 text-sm">Total Quizzes</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary mb-2">
              {categoriesData.quizCategories.length}
            </div>
            <div className="text-foreground/70 text-sm">Categories</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary mb-2">
              {categoriesData.difficultyLevels.length}
            </div>
            <div className="text-foreground/70 text-sm">Difficulty Levels</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary mb-2">
              {categoriesData.gameTypes.length}
            </div>
            <div className="text-foreground/70 text-sm">Game Types</div>
          </div>
        </div>
      </section>
    </div>
  )
}