import React from "react";
import { Link } from "react-router-dom";

const DetailsTitle = ({ artistId, artistData, songData }) => {
  const artistPath = artistData?.attributes;

  return (
    <div className="w-full mb-5">
      <div className="retro-card p-4 flex flex-col sm:flex-row items-center gap-4">
        <div className="w-28 h-28 rounded-retro border-2 border-border overflow-hidden flex-shrink-0">
          <img
            src={
              artistId
                ? artistPath?.artwork?.url
                    .replace("{w}", "500")
                    .replace("{h}", "500")
                : songData?.images?.coverart
            }
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center sm:text-left">
          <h1 className="font-bold text-xl text-text-primary">
            {artistId ? artistPath?.name : songData?.title}
          </h1>
          {!artistId && (
            <Link
              to={`/artists/${songData?.artists[0].adamid}`}
              className="text-sm text-primary hover:text-primary-dark transition-colors font-semibold"
            >
              {songData?.subtitle}
            </Link>
          )}
          <div className="mt-1.5">
            <span className="retro-badge bg-primary/10 text-primary border-primary/30">
              {artistData
                ? artistPath?.genreNames[0]
                : songData?.genres?.primary}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsTitle;
