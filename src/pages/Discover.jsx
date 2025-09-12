import React, { useState } from "react";
import { genres } from "../assets/constants";
import SongCard from "../components/SongCard";
import { useGetChartTracksQuery, useGetCitiesQuery } from "../redux/services/dataFetch";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { useSelector } from "react-redux";
import { skipToken } from "@reduxjs/toolkit/query"; // ✅ import skipToken

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
    <div className="flex flex-col ">
      <div className="flex flex-col items-center justify-between w-full mt-4 mb-10 md:flex-row">
        <h2 className="font-bold text-3xl text-[#FFEEF4] main-text">Discover</h2>
        <select
          value={genre}
          onChange={(e) => {
            setGenre(e.target.value);
            setPage(1);
          }}
          className="px-2 py-1 mt-0 text-sm text-gray-500 rounded-lg outline-none bg-opacity-60 backdrop-blur-lg md:mt-5"
        >
          {genres.map((g) => (
            <option
              key={g.value}
              value={g.value}
              className="bg-[#FFEEF4] main-text"
            >
              {g.title}
            </option>
          ))}
        </select>
      </div>

      {/* ✅ Proper loading & error handling */}
      {isFetching || isLoading ? (
        <Loader />
      ) : error ? (
        // ✅ Custom 429 error handling
        error?.status === 429 ? (
          <p className="font-semibold text-center text-black ">
            Too many requests — take some rest ☕
          </p>
        ) : (
          <Error />
        )
      ) : (
        <>
          {/* ✅ Show total count */}
          <p className="mb-4 text-sm text-gray-300">
            Showing {Math.min(end, total)} of {total} songs
          </p>

          {/* ✅ Songs grid */}
          <div className="flex flex-wrap justify-center gap-8 ">
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

          {/* ✅ Pagination controls */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 text-sm font-medium text-white bg-pink-500 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <button
              disabled={end >= total}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 text-sm font-medium text-white bg-pink-500 rounded-lg disabled:opacity-50"
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
