import React, { useState } from "react";
import { genres } from "../assets/constants";
import SongCard from "../components/SongCard";
import RetroDropdown from "../components/RetroDropdown";
import { useGetChartTracksQuery, useGetCitiesQuery } from "../redux/services/dataFetch";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { useSelector } from "react-redux";
import { skipToken } from "@reduxjs/toolkit/query";

const Discover = () => {
  const [genre, setGenre] = useState("POP");
  const [page, setPage] = useState(1);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data, isFetching, isLoading, error } = useGetChartTracksQuery(
    genre ? { genre } : skipToken
  );

  const { data: cities } = useGetCitiesQuery();

  const pageSize = 20;
  const total = data?.length || 0;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedData = data?.slice(start, end);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mt-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Discover</h2>
          <p className="text-[11px] text-text-muted mt-0.5 font-retro-mono">
            FIND YOUR NEXT FAVORITE TRACK
          </p>
        </div>
        <RetroDropdown
          options={genres}
          value={genre}
          onChange={(val) => {
            setGenre(val);
            setPage(1);
          }}
          placeholder="Select Genre"
        />
      </div>

      {isFetching || isLoading ? (
        <Loader />
      ) : error ? (
        error?.status === 429 ? (
          <div className="retro-card p-5 text-center">
            <p className="font-bold text-text-primary text-sm">
              Too many requests — take some rest
            </p>
            <p className="text-xs text-text-muted mt-1">Try again in a moment</p>
          </div>
        ) : (
          <Error />
        )
      ) : (
        <>
          <div className="retro-badge mb-4">
            {Math.min(end, total)} of {total} songs
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
            {paginatedData?.map((song, i) => (
              <SongCard
                key={i}
                song={song}
                data={data}
                i={i}
                isPlaying={isPlaying}
                activeSong={activeSong}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-3 mt-6 mb-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="retro-btn"
            >
              Previous
            </button>
            <span className="retro-badge bg-primary text-white border-primary">
              {page} / {Math.ceil(total / pageSize)}
            </span>
            <button
              disabled={end >= total}
              onClick={() => setPage((p) => p + 1)}
              className="retro-btn"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Discover;
