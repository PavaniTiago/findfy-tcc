"use client"

import { useMyContext } from "@/app/context/context";
import { MovieProps } from "@/app/interface/movieInterface";
import axios from "axios";
import { child, get, getDatabase, ref, set } from "firebase/database";
import { Clapperboard, Clock, Search } from "lucide-react"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function SearchBar() {
  const router = useRouter()
  const [movie, setMovie] = useState<string>("");
  const [data, setData] = useState<MovieProps[]>()
  const [recentMovies, setRecentMovies] = useState<MovieProps[]>()

  const { minhaVariavel } = useMyContext()
  
    const searchOptions = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/search/movie',
      params: {query: movie, include_adult: 'false', language: 'pt-BR', page: '1'},
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_HEADER_KEY}`
      }
    };

    const searchFilm = () => {
      axios
      .request(searchOptions)
      .then((response) => {
        setData(response.data.results)        
      })
      .catch((error) => {
        console.error(error);
      });
    }

    const searchMovies = (ids: string[]) => {
      const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie',
        params: { language: 'pt-BR', append_to_response: 'videos' },
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_HEADER_KEY}`
        }
      };
    
      const movieRequests = ids.map((id) => {
        return axios.request({ ...options, url: `${options.url}/${id}` });
      });
    
      axios
        .all(movieRequests)
        .then(axios.spread((...responses) => {
          const moviesData = responses.map((response) => response.data);
          setRecentMovies(moviesData);
          console.log(moviesData);
        }))
        .catch(function (error) {
          console.error(error);
        });
    };
    
    useEffect(() => {
      const dbRef = ref(getDatabase());
      get(child(dbRef, `users/${minhaVariavel}/movieIds`)).then((snapshot) => {
        if (snapshot.exists() && snapshot.val() !== null) {
          const movieIds = snapshot.val();
          searchMovies(movieIds);
        } else {
          console.log("No data available");
        }
        searchFilm() 
      });
    }, [movie]);
    

    const setRecentMovie = async (id: string) => {
      const db = getDatabase()
      const userRef = ref(db, `users/${minhaVariavel}/`)
      const moviesRef = child(userRef, 'movieIds');
      const currentMovieIds = (await get(moviesRef)).val() || [];
      currentMovieIds.push(id);
      set(moviesRef, currentMovieIds);
    }
    
  return (
    <div className="flex flex-col relative items-center justify-center md:w-[1024px] rounded-lg md:h-12 bg-purple-100 shadow-xl z-10 group">
      <div className="flex w-full h-full relative items-center">
        <Search size={30} className="absolute pointer-events-none left-4"/>
        <input type="text" placeholder="descreva o que você deseja assistir" 
        value={movie} onChange={(e) => setMovie(e.target.value)} 
        className="placeholder-white outline-none pl-20 w-full h-full rounded-lg group-focus-within:bg-purple-700 bg-purple-100 border-0" />
            
        <ul className="absolute left-0 top-full bg-purple-200 w-full rounded-lg shadow-2xl space-y-3 mt-1 group-focus-within:block hidden">
        {recentMovies?.map((movie) => (
                <Link href={{
                  pathname: "/movie",
                  query: {
                    backdrop_path: movie?.backdrop_path,
                    title: movie?.title,
                    overview: movie?.overview,
                    release_date: movie?.release_date,
                    vote_average: movie?.vote_average,
                    id: movie?.id,
                  }
                }}  className="flex gap-3 cursor-pointer items-center w-full text-md font-normal px-6 first:pt-4 last:pb-4 hover:underline"><Clock size={20}/> {movie?.title}</Link>
              ))}
         
          {data?.map((search) => 
          <Link onClick={() => setRecentMovie(search.id)} href={{
            pathname: "/movie",
            query: {
              backdrop_path: search.backdrop_path,
              title: search.title,
              overview: search.overview,
              release_date: search.release_date,
              vote_average: search.vote_average,
              id: search.id,
            }
          }} 
          className="flex gap-3 cursor-pointer w-full text-md font-normal px-6 first:pt-4 last:pb-4 hover:underline">
            <Clapperboard size={20}/>
            {search.title}
            </Link>
          )}
          </ul>
      </div>
    </div>
  )
}

export default SearchBar