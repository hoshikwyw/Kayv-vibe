import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useSearchSongQuery } from '../redux/services/dataFetch';
import Loader from '../components/Loader';
import Error from '../components/Error';
import SongCard from '../components/SongCard';
import { FiSearch } from 'react-icons/fi';

const Search = () => {
  const { searchTerm } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error, isLoading } = useSearchSongQuery(searchTerm);

  const songs = data?.tracks?.hits.map((song) => song.track);

  if (isFetching) return <Loader />;
  if (isLoading) return <Loader />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <div className="mt-4 mb-6">
        <h2 className="text-2xl font-bold text-text-primary flex items-center gap-2">
          <FiSearch className="text-primary w-5 h-5" />
          Search Results
        </h2>
        <p className="text-[11px] text-text-muted mt-0.5">
          Showing results for <span className="font-bold text-primary">"{searchTerm}"</span>
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
        {songs.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  )
}

export default Search
