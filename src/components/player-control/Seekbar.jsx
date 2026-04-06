import React from "react";

const Seekbar = ({ value, min, max, onInput, setSeekTime, appTime }) => {
  const getTime = (time) =>
    `${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;

  const progress = max > 0 ? (value / max) * 100 : 0;

  return (
    <div className="hidden sm:flex items-center gap-2 w-full max-w-lg">
      <span className="text-[10px] text-text-muted font-retro-mono w-8 text-right tabular-nums">
        {value === 0 ? "0:00" : getTime(value)}
      </span>
      <div className="flex-1 relative h-5 flex items-center group cursor-pointer">
        <div className="w-full h-1 rounded-full bg-background-tertiary overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-[width] duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <input
          type="range"
          step="any"
          value={value}
          min={min}
          max={max}
          onInput={onInput}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
        />
        <div
          className="absolute w-3 h-3 bg-primary border-2 border-border rounded-full shadow-sm pointer-events-none transition-[left] duration-100 -translate-x-1/2 opacity-0 group-hover:opacity-100"
          style={{ left: `${progress}%` }}
        />
      </div>
      <span className="text-[10px] text-text-muted font-retro-mono w-8 tabular-nums">
        {max === 0 ? "0:00" : getTime(max)}
      </span>
    </div>
  );
};

export default Seekbar;
