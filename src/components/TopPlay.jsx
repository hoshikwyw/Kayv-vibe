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
      className=" xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[400px] max-w-full flex flex-col">
      <div className=" w-full flex flex-col">
        <div className=" flex flex-row justify-between items-center">
          <h2 className=" font-bold text-lg text-text-primary main-text">
            Charts
          </h2>
          <Link to={"/charts"}>
            <p className=" font-semibold text-text-primary main-text">See More</p>
          </Link>
        </div>
        <div className=" mt-4 flex flex-col gap-1">
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
        <div className=" w-full flex flex-col mt-6">
          <div className=" flex flex-row justify-between items-center">
            <h2 className=" font-bold text-lg text-text-primary main-text">
              Artists
            </h2>
            <Link to={"/artists"}>
              <p className=" font-semibold text-text-primary main-text">
                See More
              </p>
            </Link>
          </div>
          <div className="mt-4 overflow-x-auto hide-scrollbar">
            <Swiper
              slidesPerView="auto"
              spaceBetween={15}
              freeMode
              centeredSlides
              centeredSlidesBounds
              modules={[FreeMode]}
              className="!overflow-visible">
              {topArtists?.map((artist, i) => (
                <SwiperSlide
                  key={artist?.key}
                  style={{ width: "80px", height: "auto" }}
                  className=" shadow-lg rounded-full animate-slideright">
                  <Link to={`/artists/${artist?.artists[0].adamid}`}>
                    <img
                      src={artist?.images.background}
                      alt="artist"
                      className=" rounded-full w-full aspect-square object-cover"
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopPlay;
