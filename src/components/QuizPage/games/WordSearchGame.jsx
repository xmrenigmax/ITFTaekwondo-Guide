
import { useState, useEffect, useCallback } from 'react'

export const WordSearchGame = ({ quiz, onComplete }) => {
  const [grid, setGrid] = useState([])
  const [foundWords, setFoundWords] = useState([])
  const [selectedCells, setSelectedCells] = useState([])
  const [isSelecting, setIsSelecting] = useState(false)
  const [startCell, setStartCell] = useState(null)
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit)
  const [gameState, setGameState] = useState('playing')
  const [wordStatus, setWordStatus] = useState({})

  // Generate grid on mount
  useEffect(() => {
    generateGrid()
  }, [quiz.grid])

  useEffect(() => {
    if (timeLeft > 0 && gameState === 'playing') {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      finishGame()
    }
  }, [timeLeft, gameState])

  const generateGrid = () => {
    const size = quiz.grid.size
    const words = quiz.grid.words.map(w => w.word.toUpperCase())
    
    // Create empty grid
    const emptyGrid = Array(size).fill().map(() => Array(size).fill(''))
    
    // Place words in grid (simplified placement)
    const newGrid = placeWordsInGrid([...emptyGrid], words, size)
    
    // Fill empty spaces with random letters
    const filledGrid = fillEmptySpaces(newGrid, size)
    
    setGrid(filledGrid)
    
    // Initialize word status
    const initialWordStatus = {}
    words.forEach(word => {
      initialWordStatus[word] = false
    })
    setWordStatus(initialWordStatus)
  }

  const placeWordsInGrid = (grid, words, size) => {
    const directions = [
      [0, 1],  // right
      [1, 0],  // down
      [1, 1],  // diagonal down-right
      [1, -1]  // diagonal down-left
    ]

    words.forEach(word => {
      let placed = false
      let attempts = 0
      
      while (!placed && attempts < 100) {
        attempts++
        const direction = directions[Math.floor(Math.random() * directions.length)]
        const row = Math.floor(Math.random() * size)
        const col = Math.floor(Math.random() * size)
        
        if (canPlaceWord(grid, word, row, col, direction, size)) {
          placeWord(grid, word, row, col, direction)
          placed = true
        }
      }
    })
    
    return grid
  }

  const canPlaceWord = (grid, word, row, col, direction, size) => {
    const [dr, dc] = direction
    
    // Check if word fits in grid
    const endRow = row + dr * (word.length - 1)
    const endCol = col + dc * (word.length - 1)
    
    if (endRow < 0 || endRow >= size || endCol < 0 || endCol >= size) {
      return false
    }
    
    // Check if cells are empty or have matching letters
    for (let i = 0; i < word.length; i++) {
      const currentRow = row + dr * i
      const currentCol = col + dc * i
      const cell = grid[currentRow][currentCol]
      
      if (cell !== '' && cell !== word[i]) {
        return false
      }
    }
    
    return true
  }

  const placeWord = (grid, word, row, col, direction) => {
    const [dr, dc] = direction
    
    for (let i = 0; i < word.length; i++) {
      const currentRow = row + dr * i
      const currentCol = col + dc * i
      grid[currentRow][currentCol] = word[i]
    }
  }

  const fillEmptySpaces = (grid, size) => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (grid[row][col] === '') {
          grid[row][col] = letters[Math.floor(Math.random() * letters.length)]
        }
      }
    }
    
    return grid
  }

  const handleCellMouseDown = (row, col) => {
    setIsSelecting(true)
    setStartCell([row, col])
    setSelectedCells([[row, col]])
  }

  const handleCellMouseEnter = (row, col) => {
    if (isSelecting && startCell) {
      const [startRow, startCol] = startCell
      const newSelection = getCellsInDirection(startRow, startCol, row, col)
      setSelectedCells(newSelection)
    }
  }

  const handleCellMouseUp = () => {
    if (selectedCells.length > 0) {
      checkSelectedWord()
    }
    setIsSelecting(false)
    setStartCell(null)
  }

  const getCellsInDirection = (startRow, startCol, currentRow, currentCol) => {
    const rowDiff = currentRow - startRow
    const colDiff = currentCol - startCol
    
    // Determine the primary direction
    let rowStep = 0
    let colStep = 0
    
    if (Math.abs(rowDiff) > Math.abs(colDiff)) {
      // Vertical movement
      rowStep = rowDiff > 0 ? 1 : -1
    } else if (Math.abs(colDiff) > Math.abs(rowDiff)) {
      // Horizontal movement  
      colStep = colDiff > 0 ? 1 : -1
    } else if (rowDiff !== 0 && colDiff !== 0) {
      // Diagonal movement
      rowStep = rowDiff > 0 ? 1 : -1
      colStep = colDiff > 0 ? 1 : -1
    } else {
      // Single cell
      return [[startRow, startCol]]
    }
    
    // Calculate how many cells to include
    const steps = Math.max(Math.abs(rowDiff), Math.abs(colDiff))
    const cells = []
    
    for (let i = 0; i <= steps; i++) {
      const row = startRow + i * rowStep
      const col = startCol + i * colStep
      
      // Only add cells that are within grid bounds
      if (row >= 0 && row < quiz.grid.size && col >= 0 && col < quiz.grid.size) {
        cells.push([row, col])
      } else {
        // Stop if we hit the grid boundary
        break
      }
    }
    
    return cells
  }

  const checkSelectedWord = () => {
    if (selectedCells.length < 2) {
      setSelectedCells([])
      return
    }

    const selectedWord = selectedCells.map(([row, col]) => grid[row][col]).join('')
    const reversedWord = selectedWord.split('').reverse().join('')
    
    // Check if selected word matches any target word
    const targetWords = quiz.grid.words.map(w => w.word.toUpperCase())
    
    let foundWord = null
    if (targetWords.includes(selectedWord)) {
      foundWord = selectedWord
    } else if (targetWords.includes(reversedWord)) {
      foundWord = reversedWord
    }
    
    if (foundWord && !foundWords.includes(foundWord)) {
      const newFoundWords = [...foundWords, foundWord]
      setFoundWords(newFoundWords)
      setWordStatus(prev => ({ ...prev, [foundWord]: true }))
      
      // Highlight the found word cells permanently
      highlightFoundWord(selectedCells)
      
      // Check if game is complete
      if (newFoundWords.length === targetWords.length) {
        setTimeout(() => finishGame(), 500)
      }
    }
    
    setSelectedCells([])
  }


  const finishGame = () => {
    setGameState('finished')
    const score = Math.floor((foundWords.length / quiz.grid.words.length) * quiz.points)
    
    onComplete({
      score,
      totalWords: quiz.grid.words.length,
      foundWords: foundWords.length,
      timeUsed: quiz.timeLimit - timeLeft,
      foundWordsList: foundWords
    })
  }

  const isCellSelected = (row, col) => {
    return selectedCells.some(([r, c]) => r === row && c === col)
  }

  const isWordFound = (word) => {
    return wordStatus[word.toUpperCase()] || false
  }

  if (gameState === 'finished') {
    const score = Math.floor((foundWords.length / quiz.grid.words.length) * quiz.points)
    
    return (
      <div className="text-center space-y-6">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-3xl font-bold text-foreground">Word Search Complete!</h2>
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          <div className="bg-primary/10 rounded-xl p-4">
            <div className="text-2xl font-bold text-primary">{score}</div>
            <div className="text-sm text-foreground/70">Points</div>
          </div>
          <div className="bg-primary/10 rounded-xl p-4">
            <div className="text-2xl font-bold text-primary">
              {foundWords.length}/{quiz.grid.words.length}
            </div>
            <div className="text-sm text-foreground/70">Found</div>
          </div>
          <div className="bg-primary/10 rounded-xl p-4">
            <div className="text-2xl font-bold text-primary">
              {Math.floor((quiz.timeLimit - timeLeft) / 60)}:{(quiz.timeLimit - timeLeft) % 60 < 10 ? '0' : ''}{(quiz.timeLimit - timeLeft) % 60}
            </div>
            <div className="text-sm text-foreground/70">Time</div>
          </div>
        </div>

        {/* Word List */}
        <div className="max-w-2xl mx-auto bg-card rounded-xl p-6 border ">
          <h3 className="text-xl font-bold text-foreground mb-4">Words to Find</h3>
          <div className="grid grid-cols-2 gap-3">
            {quiz.grid.words.map((wordObj, index) => (
              <div key={index} className={`p-3 rounded-lg border-2 ${
                isWordFound(wordObj.word) 
                  ? 'bg-green-50 border-green-200 text-green-800' 
                  : 'bg-gray-50 border-gray-200 text-gray-600'
              }`}>
                <div className="font-semibold">{wordObj.word}</div>
                <div className="text-sm opacity-75">{wordObj.clue}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (grid.length === 0) {
    return <div className="text-center">Generating word search...</div>
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-foreground/60">
          Found {foundWords.length} of {quiz.grid.words.length} words
        </div>
        <div className="text-sm font-semibold text-primary">
          Time: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${(foundWords.length / quiz.grid.words.length) * 100}%` }}
        ></div>
      </div>

      <div className="flex gap-8">
        {/* Word Search Grid */}
        <div className="flex-1">
          <div 
            className="grid gap-1 bg-card rounded-xl p-4 border select-none"
            style={{ 
              gridTemplateColumns: `repeat(${quiz.grid.size}, minmax(0, 1fr))`,
              aspectRatio: '1/1'
            }}
            onMouseLeave={() => {
              if (isSelecting) {
                handleCellMouseUp()
              }
            }}
            onMouseUp={handleCellMouseUp}
          >
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`
                    flex items-center justify-center font-bold text-lg border-2 rounded
                    transition-all duration-200 cursor-pointer select-none
                    ${isCellSelected(rowIndex, colIndex)
                      ? 'bg-primary text-white border-primary shadow-md transform scale-105'
                      : 'bg-background border-primary/30 hover:bg-primary/5'
                    }
                    ${isWordFound(cell) ? 'opacity-50' : ''}
                  `}
                  onMouseDown={() => handleCellMouseDown(rowIndex, colIndex)}
                  onMouseEnter={() => handleCellMouseEnter(rowIndex, colIndex)}
                >
                  {cell}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Word List */}
        <div className="w-64">
          <div className="bg-card rounded-xl p-4 border h-full">
            <h3 className="font-bold text-lg text-foreground mb-4">Words to Find</h3>
            <div className="space-y-2">
              {quiz.grid.words.map((wordObj, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    isWordFound(wordObj.word)
                      ? 'bg-green-100 border-green-300 text-green-800 line-through'
                      : 'bg-background-50 border-gray-200 text-foreground'
                  }`}
                >
                  <div className="font-semibold">{wordObj.word}</div>
                  <div className="text-sm opacity-75">{wordObj.clue}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center text-foreground/60 text-sm">
        Click and drag to select words. Words can be horizontal, vertical, or diagonal.
      </div>

      {/* Score Display */}
      <div className="text-center">
        <div className="inline-block bg-primary/10 rounded-full px-4 py-2">
          <span className="text-sm text-foreground/60 mr-2">Found:</span>
          <span className="font-bold text-primary">{foundWords.length}</span>
          <span className="text-sm text-foreground/60 mx-2">/</span>
          <span className="text-sm text-foreground/60">{quiz.grid.words.length}</span>
        </div>
      </div>
    </div>
  )
}