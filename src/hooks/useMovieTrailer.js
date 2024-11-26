import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constant";
import { addTrailer } from "../utils/movieSlice";
import { useEffect } from "react";

// fetch trailer video and adding it to the redux store
function useMovieTrailer(movieId) {
  const dispatch = useDispatch();

  async function getMovieVideos() {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();
    const allTrailers = json.results.filter(
      (video) => video.type === "Trailer"
    );

    const trailer = allTrailers.length ? allTrailers[0] : json.results[0];
    dispatch(addTrailer(trailer));

    // console.log(trailer);
  }

  useEffect(() => {
    getMovieVideos();
  }, []);
}

export default useMovieTrailer;
