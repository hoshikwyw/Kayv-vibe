import React from "react";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import {
  BsArrowRepeat,
  BsFillPauseFill,
  BsFillPlayFill,
  BsShuffle,
} from "react-icons/bs";

const ControlBtns = ({
  isPlaying,
  repeat,
  setRepeat,
  shuffle,
  setShuffle,
  currentSongs,
  handlePlayPause,
  handlePrev,
  handleNext,
}) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setRepeat((prev) => !prev)}
        className={`hidden sm:flex w-7 h-7 items-center justify-center rounded-full transition-colors ${
          repeat ? "text-primary" : "text-text-muted hover:text-text-primary"
        }`}
      >
        <BsArrowRepeat size={13} />
      </button>

      {currentSongs?.length && (
        <button
          onClick={handlePrev}
          className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-border text-text-primary hover:bg-background-secondary transition-colors"
        >
          <MdSkipPrevious size={18} />
        </button>
      )}

      <button
        onClick={handlePlayPause}
        className="w-11 h-11 flex items-center justify-center bg-primary border-2 border-border rounded-full shadow-retro-sm hover:bg-primary-light active:shadow-none active:translate-x-px active:translate-y-px transition-all"
      >
        {isPlaying ? (
          <BsFillPauseFill size={18} className="text-white" />
        ) : (
          <BsFillPlayFill size={18} className="text-white ml-0.5" />
        )}
      </button>

      {currentSongs?.length && (
        <button
          onClick={handleNext}
          className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-border text-text-primary hover:bg-background-secondary transition-colors"
        >
          <MdSkipNext size={18} />
        </button>
      )}

      <button
        onClick={() => setShuffle((prev) => !prev)}
        className={`hidden sm:flex w-7 h-7 items-center justify-center rounded-full transition-colors ${
          shuffle ? "text-primary" : "text-text-muted hover:text-text-primary"
        }`}
      >
        <BsShuffle size={12} />
      </button>
    </div>
  );
};

export default ControlBtns;
