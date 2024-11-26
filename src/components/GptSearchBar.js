import React, { useRef } from "react";
import language from "../utils/languageConstant";
import { useDispatch, useSelector } from "react-redux";
import openAI from "../utils/openai";
import { API_OPTIONS } from "../utils/constant";
import { addGPTMovieResult } from "../utils/gptSlice";


function GptSearchBar() {
  const dispatch = useDispatch()
  const lanuageKey = useSelector((store) => store.config.language);
  const searchText = useRef(null);



  async function handleGPTSearchClick() {
    // console.log(searchText.current.value);
    // make pi call to GPT API get movie results

    const gptQuery =
      "Act as a movie recommendation sustem and suggest some movies for the query" +
      searchText.current.value +
      ". Only give me names of 5 movies, comma seperated like the example result given ahead. Example result: Gadar, sholey, Don, golmaal, koi mil gaya";

    const gptResult = await openAI.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: gptQuery }],
    });

    if (!gptResult.choices) console.log("Oops");

    // ['movie1','movie2','movie3'...]
    const gptMovies = gptResult.choices?.[0]?.message?.content.split(',')

    // ['promise1','promise2','promise3'...]
    const promiseArray = gptMovies.map(movie => searchMovieTMDB(movie))


    const tmdbResult = await Promise.all(promiseArray)

    console.log(tmdbResult);

    dispatch(addGPTMovieResult({ movieNames: gptMovies, movieResults: tmdbResult }))

  }

  // search movies in tmdb
  async function searchMovieTMDB(movieName) {
    const data = await fetch('https://api.themoviedb.org/3/search/movie?query=' + movieName + '&include_adult=false&language=en-US&page=1', API_OPTIONS)

    const json = await data.json();
    // console.log(json.results);
    return json.results;

  }

  return (
    <div className="pt-[50%] md:p-[10%] flex justify-center">
      <form
        className="w-full md:w-[70%] bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          className="p-2 m-4 col-span-9"
          placeholder={language[lanuageKey].gptSearchPlaceHolder}
          type="text"
        />
        <button
          className="px-0 md:py-2 px-4 m-4 bg-red-700 rounded-md text-white col-span-3"
          onClick={handleGPTSearchClick}
        >
          {language[lanuageKey].search}
        </button>
      </form>
    </div>
  );
}

export default GptSearchBar;
