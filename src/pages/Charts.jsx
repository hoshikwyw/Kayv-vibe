import React from 'react'
import { useSelector } from 'react-redux'
import SongCard from '../components/SongCard'
import chartsMock from '../mocks/charts.json'

const Charts = () => {
  const { activeSong, isPlaying } = useSelector(state => state.player)
  const chartSongs = chartsMock

  return (
    <div className="flex flex-col">
      <h2 className="mt-4 mb-10 text-3xl font-bold text-left text-white">Discover Top Charts</h2>

      <div className="flex flex-wrap justify-start gap-8 md:justify-center">
        {chartSongs.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={chartSongs}
            i={i}
          />
        ))}
      </div>
    </div>
  )
}

export default Charts
