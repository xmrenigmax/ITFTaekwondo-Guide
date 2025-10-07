// Basic audio player component for playing pronunciation audio files
import { useState, useRef } from 'react'

export const AudioPlayer = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleEnded = () => {
    setIsPlaying(false)
  }

  return (
    <div className="flex items-center">
      <audio
        ref={audioRef}
        src={audioSrc}
        onEnded={handleEnded}
        preload="none"
      />
      <button
        onClick={togglePlay}
        className="flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full hover:bg-primary-hover transition-colors"
        aria-label={isPlaying ? "Pause pronunciation" : "Play pronunciation"}
      >
        {isPlaying ? (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6zM14 4h4v16h-4z"/>
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        )}
      </button>
    </div>
  )
}