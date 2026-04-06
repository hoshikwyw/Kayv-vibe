import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DetailsTitle from "../components/DetailsTitle";
import { setActiveSong, playPause } from "../redux/services/PlayerSlice";
import {
  useGetRelateSongQuery,
  useGetSongDetailQuery,
} from "../redux/services/dataFetch";
import Loader from "../components/Loader";
import Error from "../components/Error";
import RelateSong from "../components/RelateSong";

const SongDetail = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { songid } = useParams();

  const {
    data,
    isFetching: isFetchingRelateSong,
    isLoading: isLoadingRelate,
    error: errorInRelate,
  } = useGetRelateSongQuery({ songid });

  const {
    data: songData,
    isLoading: isLoadingSongD,
    isFetching: isFetchingSongD,
    error: errorInSongD,
  } = useGetSongDetailQuery({ songid });

  const handlePauseBtn = () => {
    dispatch(playPause(false));
  };

  const handlePlayBtn = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  if (isFetchingSongD || isFetchingRelateSong) return <Loader />;
  if (isLoadingSongD || isLoadingRelate) return <Loader />;
  if (errorInRelate || errorInSongD) return <Error />;

  return (
    <div className="flex flex-col mt-4">
      <DetailsTitle artistId="" songData={songData} />

      <div className="retro-card p-4 mb-5">
        <h2 className="text-lg font-bold text-text-primary flex items-center gap-1.5 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          Lyrics
        </h2>
        <div className="retro-divider mb-3" />
        {songData?.sections[1].type === "LYRICS" ? (
          <div className="space-y-0.5">
            {songData?.sections[1].text.map((line, i) => (
              <p key={i} className="text-sm text-text-secondary leading-relaxed">
                {line}
              </p>
            ))}
          </div>
        ) : (
          <p className="text-sm text-text-muted italic">
            No lyrics available for this song.
          </p>
        )}
      </div>

      <RelateSong
        data={data}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseBtn={handlePauseBtn}
        handlePlayBtn={handlePlayBtn}
      />
    </div>
  );
};

export default SongDetail;
