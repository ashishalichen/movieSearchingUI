import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constant";
import { useEffect } from "react";

export default function usePopularMovies() {
  const dispatch = useDispatch();

  async function PopularMovies() {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      API_OPTIONS
    );

    const json = await data.json();
    // console.log(json.results);

    dispatch(addPopularMovies(json.results));
  }

  useEffect(() => {
    PopularMovies();
  }, []);
}
