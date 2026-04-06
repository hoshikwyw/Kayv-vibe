import React from 'react'
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs"

const PlayPause = ({ isPlaying, activeSong, song, handlePause, handlePlay }) => (
  isPlaying && activeSong?.attributes.name === song.attributes.name ? (
    <button
      onClick={handlePause}
      className="w-11 h-11 flex items-center justify-center bg-primary border-2 border-border rounded-full shadow-retro-sm hover:bg-primary-light transition-colors"
    >
      <BsFillPauseFill size={18} className="text-white" />
    </button>
  ) : (
    <button
      onClick={handlePlay}
      className="w-11 h-11 flex items-center justify-center bg-primary border-2 border-border rounded-full shadow-retro-sm hover:bg-primary-light transition-colors"
    >
      <BsFillPlayFill size={18} className="text-white ml-0.5" />
    </button>
  )
)

export default PlayPause
