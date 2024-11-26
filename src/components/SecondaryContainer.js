import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

function SecondaryContainer() {
  const nowPlayingMovies = useSelector(
    (store) => store.movies?.nowPlayingMovies
  );

  const popularMovies = useSelector((store) => store.movies?.popularMovies);
  const topRatedMovies = useSelector((store) => store.movies?.topRatedMovies);
  const upcomingMovies = useSelector((store) => store.movies?.upcomingMovies);

  return (
    nowPlayingMovies && (
      <div className="  bg-black">
        <div className="mt-0 md:-mt-[25%] relative z-20">
          <MovieList title={"Now Playing"} movies={nowPlayingMovies} />
          <MovieList title={"Upcoming"} movies={upcomingMovies} />
          <MovieList title={"Popular"} movies={popularMovies} />
          <MovieList title={"Top rated"} movies={topRatedMovies} />
        </div>
      </div>
    )
  );
}

export default SecondaryContainer;
