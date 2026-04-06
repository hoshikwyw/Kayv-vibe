import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { nextSong, playPause, prevSong } from "../redux/services/PlayerSlice";
import PlayBtn from "../components/player-control/PlayBtn";
import {
  BsFillPauseFill,
  BsFillPlayFill,
  BsShuffle,
  BsArrowRepeat,
  BsMusicNoteBeamed,
  BsChevronDown,
  BsHeadphones,
} from "react-icons/bs";
import { MdSkipNext, MdSkipPrevious, MdQueueMusic } from "react-icons/md";
import {
  BsFillVolumeUpFill,
  BsVolumeDownFill,
  BsFillVolumeMuteFill,
} from "react-icons/bs";

const NowPlaying = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { activeSong, currentSongs, currentIndex, isPlaying, isActive } =
    useSelector((state) => state.player);

  const [playTime, setPlayTime] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [showQueue, setShowQueue] = useState(false);

  useEffect(() => {
    if (!activeSong?.attributes?.name) {
      navigate("/");
    }
  }, [activeSong, navigate]);

  useEffect(() => {
    if (currentSongs.length) dispatch(playPause(true));
  }, [currentIndex]);

  const handlePlayPause = () => {
    if (!isActive) return;
    dispatch(playPause(!isPlaying));
  };

  const handleNext = () => {
    dispatch(playPause(false));
    if (!shuffle) {
      dispatch(nextSong((currentIndex + 1) % currentSongs.length));
    } else {
      dispatch(nextSong(Math.floor(Math.random() * currentSongs.length)));
    }
  };

  const handlePrev = () => {
    if (currentIndex === 0) {
      dispatch(prevSong(currentSongs.length - 1));
    } else if (shuffle) {
      dispatch(prevSong(Math.floor(Math.random() * currentSongs.length)));
    } else {
      dispatch(prevSong(currentIndex - 1));
    }
  };

  const getTime = (time) =>
    `${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;

  const progress = playTime > 0 ? (appTime / playTime) * 100 : 0;
  const volumeProgress = volume * 100;

  if (!activeSong?.attributes?.name) return null;

  return (
    <div className="flex flex-col items-center max-w-lg mx-auto w-full">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-6 sm:mb-8">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 flex items-center justify-center rounded-[10px] border-2 border-border bg-card hover:bg-card-hover transition-colors"
        >
          <BsChevronDown className="text-text-primary text-sm" />
        </button>
        <div className="text-center">
          <p className="text-[10px] font-bold text-text-muted font-retro-mono tracking-widest">
            NOW PLAYING
          </p>
        </div>
        <button
          onClick={() => setShowQueue(!showQueue)}
          className={`w-9 h-9 flex items-center justify-center rounded-[10px] border-2 border-border transition-colors ${
            showQueue ? "bg-primary text-white" : "bg-card hover:bg-card-hover text-text-primary"
          }`}
        >
          <MdQueueMusic className="text-base" />
        </button>
      </div>

      {/* Album Art */}
      <div className={`w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] rounded-retro border-2 border-border shadow-retro overflow-hidden mb-6 sm:mb-8 ${
        isPlaying ? "animate-[spin_20s_linear_infinite]" : ""
      }`} style={{ animationPlayState: isPlaying ? "running" : "paused" }}>
        {activeSong?.attributes?.artwork?.url ? (
          <img
            src={activeSong.attributes.artwork.url}
            alt={activeSong.attributes.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-background-secondary flex items-center justify-center">
            <BsMusicNoteBeamed className="text-text-muted text-5xl" />
          </div>
        )}
      </div>

      {/* Song Info */}
      <div className="w-full text-center mb-5 sm:mb-6 px-4">
        <Link to={`/songs/${activeSong?.key}`}>
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary truncate hover:text-primary transition-colors">
            {activeSong?.attributes?.name}
          </h2>
        </Link>
        <p className="text-sm text-text-muted mt-1 truncate">
          {activeSong?.attributes?.artistName || activeSong?.subtitle || "Unknown artist"}
        </p>
        {activeSong?.genres?.primary && (
          <span className="retro-badge mt-2 text-[10px] bg-primary/10 text-primary border-primary/30">
            {activeSong.genres.primary}
          </span>
        )}
      </div>

      {/* Seek Bar */}
      <div className="w-full px-2 mb-4 sm:mb-6">
        <div className="relative h-6 flex items-center group cursor-pointer">
          <div className="w-full h-1.5 rounded-full bg-background-tertiary overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-[width] duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <input
            type="range"
            step="any"
            value={appTime}
            min="0"
            max={playTime}
            onInput={(e) => setSeekTime(e.target.value)}
            className="absolute inset-0 w-full opacity-0 cursor-pointer"
          />
          <div
            className="absolute w-4 h-4 bg-primary border-2 border-border rounded-full shadow-sm pointer-events-none transition-[left] duration-100 -translate-x-1/2"
            style={{ left: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-text-muted font-retro-mono tabular-nums">
            {appTime === 0 ? "0:00" : getTime(appTime)}
          </span>
          <span className="text-[10px] text-text-muted font-retro-mono tabular-nums">
            {playTime === 0 ? "0:00" : getTime(playTime)}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 sm:gap-5 mb-6 sm:mb-8">
        <button
          onClick={() => setShuffle((prev) => !prev)}
          className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors ${
            shuffle ? "text-primary" : "text-text-muted hover:text-text-primary"
          }`}
        >
          <BsShuffle size={16} />
        </button>

        {currentSongs?.length > 0 && (
          <button
            onClick={handlePrev}
            className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full border-2 border-border text-text-primary hover:bg-background-secondary transition-colors"
          >
            <MdSkipPrevious size={22} />
          </button>
        )}

        <button
          onClick={handlePlayPause}
          className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center bg-primary border-2 border-border rounded-full shadow-retro hover:bg-primary-light active:shadow-none active:translate-x-px active:translate-y-px transition-all"
        >
          {isPlaying ? (
            <BsFillPauseFill className="text-white text-xl sm:text-2xl" />
          ) : (
            <BsFillPlayFill className="text-white text-xl sm:text-2xl ml-0.5" />
          )}
        </button>

        {currentSongs?.length > 0 && (
          <button
            onClick={handleNext}
            className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full border-2 border-border text-text-primary hover:bg-background-secondary transition-colors"
          >
            <MdSkipNext size={22} />
          </button>
        )}

        <button
          onClick={() => setRepeat((prev) => !prev)}
          className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors ${
            repeat ? "text-primary" : "text-text-muted hover:text-text-primary"
          }`}
        >
          <BsArrowRepeat size={16} />
        </button>
      </div>

      {/* Volume */}
      <div className="w-full max-w-[280px] flex items-center gap-2 mb-6 px-2">
        <button
          onClick={() => setVolume(volume === 0 ? 0.5 : 0)}
          className="w-7 h-7 flex items-center justify-center rounded-full text-text-muted hover:text-primary transition-colors"
        >
          {volume > 0.5 && <BsFillVolumeUpFill size={15} />}
          {volume > 0 && volume <= 0.5 && <BsVolumeDownFill size={15} />}
          {volume === 0 && <BsFillVolumeMuteFill size={15} />}
        </button>
        <div className="flex-1 relative h-5 flex items-center group cursor-pointer">
          <div className="w-full h-1 rounded-full bg-background-tertiary overflow-hidden">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${volumeProgress}%` }}
            />
          </div>
          <input
            type="range"
            step="any"
            value={volume}
            min="0"
            max="1"
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="absolute inset-0 w-full opacity-0 cursor-pointer"
          />
          <div
            className="absolute w-3 h-3 bg-primary border-2 border-border rounded-full pointer-events-none -translate-x-1/2 opacity-0 group-hover:opacity-100"
            style={{ left: `${volumeProgress}%` }}
          />
        </div>
      </div>

      {/* Audio Element */}
      <PlayBtn
        activeSong={activeSong}
        volume={volume}
        isPlaying={isPlaying}
        seekTime={seekTime}
        repeat={repeat}
        currentIndex={currentIndex}
        onEnded={handleNext}
        onTimeUpdate={(e) => setAppTime(e.target.currentTime)}
        onLoadedData={(e) => setPlayTime(e.target.duration || 0)}
      />

      {/* Queue */}
      {showQueue && currentSongs.length > 0 && (
        <div className="w-full retro-card p-3 mb-6">
          <h3 className="text-sm font-bold text-text-primary flex items-center gap-1.5 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Queue
            <span className="text-[10px] text-text-muted font-retro-mono ml-auto">
              {currentSongs.length} tracks
            </span>
          </h3>
          <div className="flex flex-col max-h-[240px] overflow-y-auto hide-scrollbar">
            {currentSongs.map((song, i) => (
              <div
                key={`${song.key}-${i}`}
                className={`flex items-center gap-2.5 py-2 px-2 rounded-lg transition-colors ${
                  i === currentIndex ? "bg-primary/8" : "hover:bg-background-secondary"
                }`}
              >
                <span className="text-[10px] font-bold text-text-muted font-retro-mono w-5 text-center">
                  {i === currentIndex ? (
                    <BsHeadphones className="text-primary mx-auto text-xs" />
                  ) : (
                    String(i + 1).padStart(2, "0")
                  )}
                </span>
                <div className="w-8 h-8 rounded-md overflow-hidden flex-shrink-0">
                  <img
                    src={song.attributes?.artwork?.url || song.images?.coverart}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-text-primary truncate">
                    {song.attributes?.name || song.title}
                  </p>
                  <p className="text-[10px] text-text-muted truncate">
                    {song.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NowPlaying;
