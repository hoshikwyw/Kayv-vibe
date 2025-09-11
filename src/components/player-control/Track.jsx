import React from 'react'

const Track = ({isPlaying , isActive , activeSong}) => {
  return (
    <div className='flex items-center justify-start flex-1 '>
      <div className={` ${isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''} hidden sm:block h-16 w-16 mr-4`}>
        <img src={activeSong?.attributes?.artwork?.url} alt="cover image" className='rounded-full ' />
      </div>
      <div className=" w-[50%]">
        <p className="text-lg font-semibold text-white truncate ">
            {activeSong?.attributes?.name ? activeSong?.attributes?.name : 'No playing song'}
        </p>
        <p className="truncate text-zinc-500">
            {activeSong?.attributes?.artistName ? activeSong?.attributes?.artistName : 'Unknown artist'}
        </p>
      </div>
    </div>
  )
}

export default Track
