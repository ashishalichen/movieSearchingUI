import React from "react";
import MovieCard from "./MovieCard";

function MovieList({ title, movies }) {
  // if (!movies) return;
  // console.log(movies);
  return (
    <div className="px-6 text-white">
      <h1 className="text-lg md:text-2xl font-bold py-4">{title}</h1>
      {/* Suggested code may be subject to a license. Learn more: ~LicenseLog:842614630. */}
      <div className="flex overflow-x-scroll scrollbar-hide">
        <div className="flex">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
          {/* <MovieCard posterPath={movies[1].backdrop_path} /> */}
        </div>
      </div>
    </div>
  );
}

export default MovieList;
