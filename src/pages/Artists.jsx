import React from 'react'
import { useSelector } from 'react-redux'
import ArtistCard from '../components/ArtistCard'
import artistsMock from '../mocks/artists.json'

const Artists = () => {
  const { activeSong, isPlaying } = useSelector(state => state.player)
  const artists = artistsMock

  return (
    <div className="flex flex-col">
      <h2 className="mt-4 mb-10 text-3xl font-bold text-left text-white">Top artists</h2>

      <div className="flex flex-wrap justify-center gap-8 sm:justify-start">
        {artists.map((track) => <ArtistCard key={track.key} track={track} />)}
      </div>
    </div>
  )
}

export default Artists
