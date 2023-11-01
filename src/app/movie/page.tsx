"use client"

import Image from "next/image";
import fundo from "../../../public/Imagem.jpg"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { Clock2Icon, LucideArrowLeft, Star, Tv2 } from "lucide-react";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Actor from "@/components/actor";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { MovieProps } from "../interface/movieInterface";
import { Genres } from "@/components/genres";
import Link from "next/link";
import { StarRating } from "@/components/starRating";

export default function page() {

  const searchParams = useSearchParams();
  const router = useRouter()
  const [movie, setMovie] = useState<MovieProps[]>()
  const [favorite, setFavorite] = useState(false)

  const poster = searchParams.get("backdrop_path")
  const title = searchParams.get("title")
  const overview = searchParams.get("overview")
  const release_date = searchParams.get("release_date")
  const vote_average = searchParams.get("vote_average")
  const genresName = searchParams.get("genres")

  const movieId = searchParams.get("id");

  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${movieId}`,
    params: {language: 'pt-BR'},
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_HEADER_KEY}` 
    }
  };

  useEffect(() => {
    axios
    .request(options)
    .then((response) => {
      setMovie(response.data.results)
      console.log(response.data.results);
      
      console.log(response.data.genres);
    })
    .catch(function (error) {
      console.error(error);
    })
  }, [])

  useEffect(() => {
    const options = {
      method: 'POST',
      url: 'https://api.themoviedb.org/3/account/20593585/favorite',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization:`Bearer ${process.env.NEXT_PUBLIC_HEADER_KEY}`
      },
      data: {media_type: 'movie', media_id: movieId, favorite: true}
    };

    axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  }, [favorite])

  const handleRatingChange = (newRating: number) => {
    console.log(`New Rating: ${newRating}`);
    const options = {
      method: 'POST',
      url: `https://api.themoviedb.org/3/movie/${movieId}/rating`,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_HEADER_KEY}`
      },
      data: `{"value":${newRating}}`
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
    };
  
  return (
    <div className="w-full h-[100%] bg-[#2A2243] relative">
      <div className="relative">
        <LucideArrowLeft onClick={() => router.push("home")} size={50} className="text-white cursor-pointer absolute top-12 left-8"/>
        <Image alt="fundo do filme" src={`https://image.tmdb.org/t/p/w500${poster}`} priority width={0} height={0} sizes="100vw" className="w-full h-auto"/>
        <div className="absolute bottom-0 h-72 bg-gradient-to-b from-transparent to-[#2A2243] w-full"></div>
      </div>
        <div className="flex items-center px-8 pb-10">
            <div className="flex flex-col">
                <div className="flex items-center gap-4">
                  <h2 className="text-4xl text-white font-semibold">{title}</h2>
                  {
                    favorite ? <button onClick={() => setFavorite(!true)}><AiFillHeart size={35} className="text-white"/></button> : <button onClick={() => setFavorite(!false)}><AiOutlineHeart size={35} className="text-white"/></button>
                  }
                    <div className="flex items-center justify-center">
                      <StarRating totalStars={5} initialRating={0} onRatingChange={handleRatingChange}/>
                    </div>

                </div>
                <div className="flex items-center gap-4 mt-3">
                  {movie?.map((search, index) => (
                      <Genres
                      name={search.genres[0].name} 
                      length={search.length}
                      index={index}
                      />
                  ))}
                    <span className="text-black font-semibold bg-purple-100 px-3 py-1.5 rounded-2xl flex items-center gap-1">{vote_average}<Star size={25}/></span>
                    <span className="text-black font-semibold bg-purple-100 px-3 py-1.5 rounded-2xl">{release_date}</span>
                    <span className="flex items-center gap-1 text-black font-semibold bg-purple-100 px-3 py-1.5 rounded-2xl"><Clock2Icon size={20}/> 1hr 59min</span>
                </div>
                <p className="w-4/6 text-start text-xl text-white font-medium bg-purple-100 px-6 py-4 rounded-2xl mt-6">{overview}</p>
                <div className="flex items-center gap-4 mt-6">
                    <Tv2 size={35} className="text-white"/>
                    <span className="flex items-center gap-1 text-black font-semibold bg-purple-100 px-3 py-1.5 rounded-2xl">Onde assistir?</span>                    
                </div>
            </div>
            
            <Swiper
            breakpoints={{
              640: {
                slidesPerView: 3,
              },
              1420: {
                slidesPerView: 3,
              },
              1600: {
                slidesPerView: 4,
              }
            }}
            autoplay
            navigation
            loop={true}
            modules={[Navigation, Pagination, Autoplay]}
            className="flex flex-col w-[64rem]"
          >
            <SwiperSlide className=""><Actor img={fundo} title="Kin joon 1"/></SwiperSlide>
            <SwiperSlide className=""><Actor img={fundo} title="Kin joon 1"/></SwiperSlide>
            <SwiperSlide className=""><Actor img={fundo} title="Kin joon 1"/></SwiperSlide>
            <SwiperSlide className=""><Actor img={fundo} title="Kin joon 1"/></SwiperSlide>
            <SwiperSlide className=""><Actor img={fundo} title="Kin joon 1"/></SwiperSlide>
            <SwiperSlide className=""><Actor img={fundo} title="Kin joon 1"/></SwiperSlide>
            <SwiperSlide className=""><Actor img={fundo} title="Kin joon 1"/></SwiperSlide>
          </Swiper>
        </div>
    </div>
  )
}
