import React from 'react'
import { useSelector } from 'react-redux'
import SongCard from '../components/SongCard'
import likedMock from '../mocks/liked.json'
import { BsHeartFill } from 'react-icons/bs'

const Liked = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player)
  const likedSongs = likedMock

  return (
    <div className="flex flex-col">
      <div className="mt-4 mb-6">
        <h2 className="text-2xl font-bold text-text-primary flex items-center gap-2">
          Liked Songs
          <BsHeartFill className="text-danger text-base" />
        </h2>
        <p className="text-[11px] text-text-muted mt-0.5 font-retro-mono">
          YOUR FAVORITE COLLECTION
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
        {likedSongs.map((song, i) => (
          <SongCard
            key={`${song.key}-${i}`}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={likedSongs}
            i={i}
          />
        ))}
      </div>
    </div>
  )
}

export default Liked
