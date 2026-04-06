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
  return (
    <div className="relative flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Searchbar />
        <div className="px-4 md:px-6 pt-4 flex xl:flex-row flex-col-reverse h-[calc(100vh-56px)] overflow-y-auto hide-scrollbar">
          <div className="flex-1 pb-36 min-h-0">
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
          <div className="relative top-0 xl:sticky self-start xl:max-h-[calc(100vh-56px)] xl:overflow-y-auto hide-scrollbar">
            <TopPlay />
          </div>
        </div>
      </div>
      {activeSong?.attributes?.name && (
        <div className="fixed h-20 bottom-0 left-0 right-0 flex bg-card border-t-2 border-border z-10 shadow-[0_-4px_16px_rgba(0,0,0,0.05)]">
          <MusicPlayer />
        </div>
      )}
    </div>
  )
}

export default App
