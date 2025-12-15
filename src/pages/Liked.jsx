import React from 'react'
import { useSelector } from 'react-redux'
import SongCard from '../components/SongCard'
import likedMock from '../mocks/liked.json'

const Liked = () => {
    const { activeSong, isPlaying } = useSelector((state) => state.player)
    const likedSongs = likedMock

    return (
        <div className="flex flex-col">
            <h2 className="mt-4 mb-10 text-3xl font-bold text-left text-white">Liked Songs</h2>

            <div className="flex flex-wrap justify-start gap-8 md:justify-center">
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


