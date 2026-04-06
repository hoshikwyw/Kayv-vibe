# Kayv Vibe

A retro-themed music player web application built with React, featuring a vintage UI design with thick borders, offset shadows, and warm orange accents.

![React](https://img.shields.io/badge/React-18.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.4-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-teal)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.2-violet)

## Features

- **Music Discovery** - Browse songs by genre with pagination
- **Search** - Search songs and artists
- **Artist & Song Details** - View artist info, song lyrics, and related tracks
- **Music Player** - Play/pause, next/prev, shuffle, repeat, seek, and volume controls
- **Charts & Liked Songs** - Top charts and favorites collection
- **5 Retro Themes** - Orange, Dark, Mint, Purple, and Rose color schemes
- **Fully Responsive** - Optimized for mobile, tablet, and desktop
- **Shazam API Integration** - With automatic mock data fallback

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Redux Toolkit + RTK Query | State management & API fetching |
| React Router v6 | Client-side routing |
| Tailwind CSS 3 | Utility-first styling |
| Vite 5 | Build tool & dev server |
| Swiper | Artist carousel |
| React Icons | Icon library |
| Space Grotesk + Space Mono | Retro typography |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/your-username/Music-Player-App.git
cd Music-Player-App
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── assets/          # Images, constants (genres, nav links)
├── components/
│   ├── player-control/
│   │   ├── Track.jsx        # Now-playing track info
│   │   ├── PlayBtn.jsx      # Audio element & playback logic
│   │   ├── ControlBtns.jsx  # Play/pause/skip/shuffle/repeat
│   │   ├── Seekbar.jsx      # Progress bar with timestamps
│   │   └── Volumebar.jsx    # Volume slider
│   ├── Sidebar.jsx          # Fixed sidebar with navigation
│   ├── Searchbar.jsx        # Fixed search bar with theme switcher
│   ├── TopPlay.jsx          # Charts sidebar & artist carousel
│   ├── SongCard.jsx         # Song grid card
│   ├── ArtistCard.jsx       # Artist grid card
│   ├── PlayPause.jsx        # Play/pause button
│   ├── SongBar.jsx          # Song list item
│   ├── RelateSong.jsx       # Related songs section
│   ├── DetailsTitle.jsx     # Detail page header
│   ├── RetroDropdown.jsx    # Custom dropdown component
│   ├── ThemeSwitcher.jsx    # Theme selection dropdown
│   ├── Loader.jsx           # Loading spinner
│   └── Error.jsx            # Error state
├── contexts/
│   └── ThemeContext.jsx     # Theme management with CSS variables
├── pages/
│   ├── Discover.jsx         # Genre-filtered songs with pagination
│   ├── Artists.jsx          # Top artists grid
│   ├── Charts.jsx           # Chart songs grid
│   ├── Liked.jsx            # Liked songs grid
│   ├── ArtistDetail.jsx     # Artist detail + related songs
│   ├── SongDetail.jsx       # Song detail + lyrics + related songs
│   ├── Search.jsx           # Search results
│   └── MusicPlayer.jsx      # Bottom player bar
├── redux/
│   ├── store.js             # Redux store configuration
│   └── services/
│       ├── PlayerSlice.js   # Player state (queue, playback)
│       └── dataFetch.js     # RTK Query API + mock fallback
├── mocks/                   # Mock data (tracks, charts, artists, liked)
├── main.jsx                 # App entry point
└── index.css                # Global styles & retro design system
```

## Design System

### Retro Components

The app uses a custom retro design system defined in `index.css`:

- **`.retro-card`** - Card with border and rounded corners
- **`.retro-card-interactive`** - Card with hover lift + shadow effect
- **`.retro-btn`** - Button with offset shadow and press animation
- **`.retro-input`** - Input with thick border and focus glow
- **`.retro-badge`** - Small pill label
- **`.retro-range`** - Custom styled range slider
- **`.retro-divider`** - Horizontal rule

### Themes

5 built-in themes switchable via the palette icon in the search bar:

| Theme | Primary Color | Background |
|---|---|---|
| Retro Orange | `#E8871E` | `#F5EDE3` |
| Retro Dark | `#E8871E` | `#1E1E1E` |
| Retro Mint | `#2EAD8E` | `#F0F5F3` |
| Retro Purple | `#8B5CF6` | `#F5F0FA` |
| Retro Rose | `#E05080` | `#FDF0F4` |

### Responsive Breakpoints

| Screen | Sidebar | TopPlay | Grid |
|---|---|---|---|
| Mobile (<768px) | Hamburger menu | Hidden | 2 columns |
| Tablet (768-1023px) | Fixed sidebar | Hidden | 3 columns |
| Desktop (1024px+) | Fixed sidebar | Right sidebar | 3-4 columns |

## API

The app uses the [Shazam API](https://rapidapi.com/apidojo/api/shazam) via RapidAPI for:

- Chart tracks by genre
- Song details & lyrics
- Artist details
- Related songs
- Search

When the API is unavailable or rate-limited, it automatically falls back to local mock data in `src/mocks/`.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## License

This project is for educational purposes.
