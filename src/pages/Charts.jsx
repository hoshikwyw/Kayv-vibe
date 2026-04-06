import React from 'react'
import { useSelector } from 'react-redux'
import SongCard from '../components/SongCard'
import chartsMock from '../mocks/charts.json'

const Charts = () => {
  const { activeSong, isPlaying } = useSelector(state => state.player)
  const chartSongs = chartsMock

  return (
    <div className="flex flex-col">
      <div className="mt-2 sm:mt-4 mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary">Top Charts</h2>
        <p className="text-[10px] sm:text-[11px] text-text-muted mt-0.5 font-retro-mono hidden sm:block">
          MOST PLAYED TRACKS WORLDWIDE
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
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
