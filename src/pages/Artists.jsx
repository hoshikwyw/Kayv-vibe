import React from 'react'
import { useSelector } from 'react-redux'
import ArtistCard from '../components/ArtistCard'
import artistsMock from '../mocks/artists.json'

const Artists = () => {
  const { activeSong, isPlaying } = useSelector(state => state.player)
  const artists = artistsMock

  return (
    <div className="flex flex-col">
      <div className="mt-2 sm:mt-4 mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary">Top Artists</h2>
        <p className="text-[10px] sm:text-[11px] text-text-muted mt-0.5 font-retro-mono hidden sm:block">
          TRENDING ARTISTS RIGHT NOW
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
        {artists.map((track) => (
          <ArtistCard key={track.key} track={track} />
        ))}
      </div>
    </div>
  )
}

export default Artists
