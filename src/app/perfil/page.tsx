'use client'

import Image from "next/image";
import background from "../../../public/adada.webp"
import banner from "../../../public/banner.jpg"
import { Heart, LucideArrowLeft, Settings, Star, User } from "lucide-react";
import { BiChat } from "react-icons/bi";
import { BsStarFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { TokenProps } from "../interface/token";
import Link from "next/link";
import { MovieProps } from "../interface/movieInterface";
import { StarRatingDisplay } from "@/components/ratedMovie";
import { ratedMovieProps } from "../interface/rating";

export default function page() {

    const router = useRouter()
    const [user] = useAuthState(auth)
    const userByProvider = useSession()
    const userAvatar = userByProvider.data?.user?.image as string
    const [token, setToken] = useState<TokenProps>()
    const [sessionId, setSessionId] = useState()
    const [latestMovieRated, setLatestMovieRated] = useState<MovieProps[]>()
    const [movieRating, setMovieRating] = useState<ratedMovieProps[]>();

    const loginOptions = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/authentication/token/new',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_HEADER_KEY}` 
        }
    }

    const loginFunc = async () => {
        try {
          const response = await axios.request(loginOptions);
          console.log(response.data);
          setToken(response.data);
        }catch (error) {
            console.error(error);
        }
    }
    
    // useEffect(() => {
    //     if(token) {
    //         window.open(`https://www.themoviedb.org/authenticate/${token?.request_token}`);
    //     }
    // }, [token])

    const createSession = () => {
        const options = {
            method: 'POST',
            url: 'https://api.themoviedb.org/3/authentication/session/new',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_HEADER_KEY}` 
            },
            data: {request_token: token?.request_token}
        };

          axios
            .request(options)
            .then((response) => {
                console.log(response.data);
                setSessionId(response.data)
            })
            .catch(function (error) {
                console.error(error);
            });
    }
    
    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/account/20593585/rated/movies',
            params: {language: 'en-US', page: '1', sort_by: 'created_at.asc'},
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzRjOTU2ZTYyYzBjMmZkZmFhZjY4MWE2OWEyMDk2NiIsInN1YiI6IjY1MzA2NTBjYWQ1OWI1MDExYzY0YzY2NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3yQh0OCcPUw2S4N0hvXy2fAMUeNsrbeXL0SUTt-6xp4'
            }
        };
        
        axios
        .request(options)
        .then((response) => {
            console.log(response.data);
            console.log(response.data.results);
            setLatestMovieRated(response.data.results);
            setMovieRating(response.data.results);
        })
        .catch(function (error) {
            console.error(error);
        });  
    }, [])
 
  return (
    <div className="w-full h-screen bg-blue-800 relative">
        <Image alt="user background" src={background} className="bg-cover w-full h-auto rounded-b-3xl opacity-80" sizes="100vw" width={0} height={0}/>
        <LucideArrowLeft onClick={router.back} size={50} className="text-white cursor-pointer absolute top-12 left-8"/>
        <div className="flex absolute top-20 left-16">
            { userByProvider.status === "authenticated" 
            ? 
                <>
                    <Image alt="" src={userAvatar} width={0} className="w-56 h-auto rounded-full object-cover" height={0} sizes="100vw"/>
                </>
            : 
                <>
                    <div className="bg-white text-black/50 rounded-full p-16">
                        <User size={100} className="bg-white text-black/50 rounded-full"/>
                    </div>
                </>
            }    
            <h2 className="text-white text-4xl font-bold self-center ml-12 mb-12">
                {
                    user && user.email || userByProvider.status === "authenticated" && userByProvider.data.user?.name
                }
            </h2>
        </div>
        <div className="flex justify-around items-center mt-20">
            <div className="flex">
                <div className="bg-purple-300 h-64 w-4 rounded-2xl"></div>
                <div className="flex flex-col items-start justify-center gap-4 ml-4">
                    <button className="flex items-center justify-center text-white text-2xl font-semibold gap-4 hover:underline"><Settings size={60}/>Configurações</button>
                    <button className="flex items-center justify-center text-white text-2xl font-semibold gap-4 hover:underline"><Heart size={60}/><Link href={"favorites"}>Favoritos</Link></button>
                    <button className="flex items-center justify-center text-white text-2xl font-semibold gap-4 hover:underline"><BiChat size={60}/>Avaliações e comentários</button>
                    {/* <button onClick={loginFunc} className="flex items-center justify-center text-white text-2xl font-semibold gap-4 hover:underline"><BiChat size={60}/>clique aqui para favoritar seus filmes e séries!</button>
                    <button onClick={createSession} className="flex items-center justify-center text-white text-2xl font-semibold gap-4 hover:underline"><BiChat size={60}/>login</button> */}
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex items-center">
                    <h2 className="text-white text-3xl font-semibold ml-4 mr-4">Última avaliação</h2>
                    {movieRating?.map((rating) => 
                    <StarRatingDisplay rating={rating.rating} totalStars={5} />
                    ).at(-1)}
                </div>
                {latestMovieRated?.map((movie) => 
                <Image alt="ultima foto curtida" src={`https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`} width={0} height={0} sizes="100vw" className="w-[36rem] bg-cover rounded-3xl shadow-xl"/>
                ).at(-1)}
            </div>
        </div>
    </div>
  )
}
