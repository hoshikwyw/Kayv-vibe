import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BsMusicNoteBeamed } from 'react-icons/bs'

const Track = ({ isPlaying, isActive, activeSong }) => {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate('/now-playing')}
      className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1 sm:flex-none sm:w-[200px] lg:w-[260px] cursor-pointer group"
    >
      <div
        className={`${
          isPlaying && isActive ? "animate-spin-slow" : ""
        } flex w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-retro-sm border-2 border-border overflow-hidden flex-shrink-0 items-center justify-center bg-background-secondary`}
      >
        {activeSong?.attributes?.artwork?.url ? (
          <img
            src={activeSong.attributes.artwork.url}
            alt="cover"
            className="w-full h-full object-cover"
          />
        ) : (
          <BsMusicNoteBeamed className="text-text-muted text-sm" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[12px] sm:text-[13px] font-bold text-text-primary truncate group-hover:text-primary transition-colors">
          {activeSong?.attributes?.name || "No playing song"}
        </p>
        <p className="text-[10px] sm:text-[11px] text-text-muted truncate mt-0.5">
          {activeSong?.attributes?.artistName || "Unknown artist"}
        </p>
      </div>
    </div>
  );
};

export default Track
