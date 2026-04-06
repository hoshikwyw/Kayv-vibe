import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { playPause, setActiveSong } from "../redux/services/PlayerSlice";
import { Link } from "react-router-dom";
import TopPlayCard from "./TopPlayCard";
import chartsMock from "../mocks/charts.json";
import artistsMock from "../mocks/artists.json";

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const divRef = useRef(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const topPlays = chartsMock.slice(0, 5);
  const topArtists = artistsMock.slice(0, 8);

  const handlePauseBtn = () => {
    dispatch(playPause(false));
  };

  const handlePlayBtn = (song, i) => {
    dispatch(setActiveSong({ song, data: topPlays, i }));
    dispatch(playPause(true));
  };

  return (
    <div
      ref={divRef}
      className="xl:ml-5 ml-0 xl:mb-0 mb-5 flex-1 xl:max-w-[340px] max-w-full flex flex-col gap-3"
    >
      {/* Charts */}
      <div className="retro-card p-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-text-primary flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Charts
          </h3>
          <Link to="/charts" className="text-[10px] font-bold text-primary hover:text-primary-dark transition-colors font-retro-mono">
            SEE MORE
          </Link>
        </div>
        <div className="flex flex-col">
          {topPlays?.map((song, i) => (
            <TopPlayCard
              key={song.key}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseBtn={handlePauseBtn}
              handlePlayBtn={() => handlePlayBtn(song, i)}
            />
          ))}
        </div>
      </div>

      {/* Artists */}
      <div className="retro-card p-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-text-primary flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Top Artists
          </h3>
          <Link to="/artists" className="text-[10px] font-bold text-primary hover:text-primary-dark transition-colors font-retro-mono">
            SEE MORE
          </Link>
        </div>
        <Swiper
          slidesPerView="auto"
          spaceBetween={10}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
        >
          {topArtists?.map((artist) => (
            <SwiperSlide
              key={artist?.key}
              style={{ width: "56px", height: "auto" }}
              className="animate-slideright"
            >
              <Link to={`/artists/${artist?.artists[0].adamid}`}>
                <div className="w-14 h-14 rounded-full border-2 border-border overflow-hidden hover:border-primary transition-colors">
                  <img
                    src={artist?.images.background}
                    alt="artist"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
