import React from 'react'
import { useSelector } from 'react-redux'
import SongCard from '../components/SongCard'
import chartsMock from '../mocks/charts.json'

const Charts = () => {
  const { activeSong, isPlaying } = useSelector(state => state.player)
  const chartSongs = chartsMock

  return (
    <div className="flex flex-col">
      <div className="mt-4 mb-6">
        <h2 className="text-2xl font-bold text-text-primary">Top Charts</h2>
        <p className="text-[11px] text-text-muted mt-0.5 font-retro-mono">
          MOST PLAYED TRACKS WORLDWIDE
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
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
