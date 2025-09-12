import React, { useEffect, useRef } from "react";

const PlayBtn = ({
  activeSong,
  isPlaying,
  volume,
  seekTime,
  onEnded,
  onTimeUpdate,
  onLoadedData,
  repeat,
}) => {
  const ref = useRef(null);

  // ✅ Pick correct audio source (Shazam or Apple Music)
  const audioSrc =
    activeSong?.hub?.actions?.find((a) => a.type === "uri")?.uri || // Shazam
    activeSong?.attributes?.previews?.[0]?.url || // Apple Music
    "";

  // ✅ Handle play / pause
  useEffect(() => {
    if (ref.current) {
      if (isPlaying) {
        ref.current.play().catch((err) => {
          console.warn("Audio play failed:", err);
        });
      } else {
        ref.current.pause();
      }
    }
  }, [isPlaying, audioSrc]);

  // ✅ Sync volume
  useEffect(() => {
    if (ref.current) {
      ref.current.volume = volume;
    }
  }, [volume]);

  // ✅ Sync seek time
  useEffect(() => {
    if (ref.current && seekTime >= 0) {
      ref.current.currentTime = seekTime;
    }
  }, [seekTime]);

  return (
    <audio
      src={audioSrc}
      ref={ref}
      preload="auto"
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
  );
};

export default PlayBtn;
