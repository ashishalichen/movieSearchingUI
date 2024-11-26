import React from "react";
import { POSTER_IMG_CDN } from "../utils/constant";

function MovieCard({ posterPath }) {
  if (!posterPath) return null;
  return (
    <div className="w-36 md:w-48 pr-4">
      <img alt="Movie Card" src={POSTER_IMG_CDN + posterPath} />
    </div>
  );
}

export default MovieCard;
