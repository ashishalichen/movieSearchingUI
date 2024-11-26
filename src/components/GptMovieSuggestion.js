import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

function GptMovieSuggestion() {
  const gpt = useSelector((store) => store.gpt);
  const { movieResults, movieNames } = gpt;

  if (!movieNames) return null;

  return (
    <div className="m-4 bg-black text-white font-bold text-2xl bg-opacity-70">
      <div>
        {movieNames.map((movieName,index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={movieResults[index]}
          />
        ))}
      </div>
    </div>
  );
}

export default GptMovieSuggestion;
