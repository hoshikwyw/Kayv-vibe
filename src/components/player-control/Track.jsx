import React from 'react'
import { BsMusicNoteBeamed } from 'react-icons/bs'

const Track = ({ isPlaying, isActive, activeSong }) => {
  return (
    <div className="flex items-center gap-3 w-[200px] lg:w-[260px]">
      <div
        className={`${
          isPlaying && isActive ? "animate-spin-slow" : ""
        } hidden sm:flex w-12 h-12 rounded-retro-sm border-2 border-border overflow-hidden flex-shrink-0 items-center justify-center bg-background-secondary`}
      >
        {activeSong?.attributes?.artwork?.url ? (
          <img
            src={activeSong.attributes.artwork.url}
            alt="cover"
            className="w-full h-full object-cover"
          />
        ) : (
          <BsMusicNoteBeamed className="text-text-muted" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-bold text-text-primary truncate">
          {activeSong?.attributes?.name || "No playing song"}
        </p>
        <p className="text-[11px] text-text-muted truncate mt-0.5">
          {activeSong?.attributes?.artistName || "Unknown artist"}
        </p>
      </div>
    </div>
  );
};

export default Track
