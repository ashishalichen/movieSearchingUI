import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constant";
import { useEffect } from "react";

export default function useNowPlayingMovies(){
    const dispatch = useDispatch()

    async function nowPlayingMovies(){
        const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', API_OPTIONS)

        const json = await data.json();
        // console.log(json.results);

        dispatch(addNowPlayingMovies(json.results))

    }

    useEffect(() => {
        nowPlayingMovies();
    }, [])
}