import React from 'react'
import { useGetChartTracksQuery } from '../redux/services/dataFetch'
import { useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Error from '../components/Error'
import SongCard from '../components/SongCard'

const Charts = () => {
  const { data, isFetching, isLoading, error } = useGetChartTracksQuery()
  const { activeSong, isPlaying } = useSelector(state => state.player)

  if (isFetching) {
    return <Loader />
  }

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <Error />
  }

  return (
    <div className="flex flex-col">
      <h2 className="mt-4 mb-10 text-3xl font-bold text-left text-white">Discover Top Charts</h2>

      <div className="flex flex-wrap justify-start gap-8 md:justify-center">
        {(data?.tracks ?? data)?.map((song, i) => (
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

export default Charts
