import React from 'react'
import Sidebar from './components/Sidebar'
import Searchbar from './components/Searchbar'
import { Route, Routes } from 'react-router-dom'
import Discover from './pages/Discover'
import ArtistDetail from "./pages/ArtistDetail"
import Artists from "./pages/Artists"
import SongDetail from "./pages/SongDetail"
import TopPlay from './components/TopPlay'
import MusicPlayer from './pages/MusicPlayer'
import { useSelector } from 'react-redux'
import Charts from './pages/Charts'
import Liked from './pages/Liked'
import Search from './pages/Search'

const App = () => {
  const { activeSong } = useSelector((state) => state.player)
  const hasPlayer = !!activeSong?.attributes?.name

  return (
    <div className="relative flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Searchbar />
        <div className="flex-1 flex lg:flex-row flex-col overflow-y-auto hide-scrollbar">
          <div className={`flex-1 min-w-0 px-3 sm:px-4 md:px-5 pt-3 sm:pt-4 ${hasPlayer ? 'pb-24 sm:pb-28' : 'pb-6'}`}>
            <Routes>
              <Route path='/' element={<Discover />} />
              <Route path='/artists/:id' element={<ArtistDetail />} />
              <Route path='/songs/:songid' element={<SongDetail />} />
              <Route path='/artists' element={<Artists />} />
              <Route path='/charts' element={<Charts />} />
              <Route path='/liked' element={<Liked />} />
              <Route path='/search/:searchTerm' element={<Search />} />
            </Routes>
          </div>
          <div className="hidden md:block lg:sticky lg:top-0 self-start lg:max-h-screen lg:overflow-y-auto hide-scrollbar flex-shrink-0 px-3 sm:px-4 md:px-5 lg:pl-0 lg:pr-4 lg:pt-4 pb-6">
            <TopPlay />
          </div>
        </div>
      </div>
      {hasPlayer && (
        <div className="fixed bottom-0 left-0 right-0 flex bg-card border-t-2 border-border z-10 shadow-[0_-4px_16px_rgba(0,0,0,0.05)] h-[60px] sm:h-[72px]">
          <MusicPlayer />
        </div>
      )}
    </div>
  )
}

export default App
