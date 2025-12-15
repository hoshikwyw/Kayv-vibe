import React from "react";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/services/PlayerSlice";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const SongCard = ({ song, i, isPlaying, activeSong, data }) => {
  // const activeSong = 'hello';
  const dispatch = useDispatch();
  // console.log(">>", activeSong);

  const handlePauseBtn = () => {
    dispatch(playPause(false));
  };

  const handlePlayBtn = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className=" flex flex-col w-[calc(50%-1rem)] sm:w-[180px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer shadow-md">
      <div className="relative w-full h-40 group">
        <div
          className={` absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.title === song.attributes.name
            ? "flex bg-black bg-opacity-70"
            : "hidden"
            }`}>
          <PlayPause
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePause={handlePauseBtn}
            handlePlay={handlePlayBtn}
          />
        </div>
        <img src={song.attributes?.artwork?.url} alt="song_image" className="h-40 " />
      </div>
      <div className="flex flex-col mt-4 ">
        <p className="text-sm font-semibold text-white truncate ">
          <Link to={`/songs/${song?.key}`}>{song.attributes.name}</Link>
        </p>
        <p className="mt-1 text-sm text-gray-300 truncate ">
          <Link
            to={
              song.artists
                ? `/artists/${song?.artists[0]?.adamid}`
                : "/top-artists"
            }>
            {song.subtitle}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
