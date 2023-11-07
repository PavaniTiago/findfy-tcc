'use client'

import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';
import { auth } from "../firebase";
import axios from "axios"
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth"

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from "next/image";

import banner1 from "../../../public/banner.jpg"
import banner2 from "../../../public/banner2.jpg"
import banner3 from "../../../public/banner3.jpg"
import banner4 from "../../../public/banner4.jpg"
import banner5 from "../../../public/banner5.jpg"
import banner6 from "../../../public/banner6.jpg"
import banner7 from "../../../public/banner7.jpg"
import CategoriasFilmes from "@/components/categoriasFilmes";
import Recomendacao from "@/components/recomendação";
import { MovieProps } from "../interface/movieInterface";
import Link from "next/link";

export default function Home(){
    const session = useSession();
    const router = useRouter();
    const [user] = useAuthState(auth)
    const [movie, setMovie] = useState<MovieProps[]>()

      const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/popular',
        params: {language: 'pt-BR', page: '1'},
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_HEADER_KEY}`
        }
      }; 

      useEffect(() => {
        axios
        .request(options)
        .then(res => {
          setMovie(res.data.results);
          })
          .catch(error => {
            console.error("Error fetching data:", error);
          });
      }, []);

    return (
        <main className="w-full h-[100%] bg-gradient-to-br from-[#0e1019] to-purple-300 text-white pb-28">
        <div className="flex flex-col items-center justify-center">    
        <Swiper
        slidesPerView={1}
        autoplay
        loop={true}
        modules={[Navigation, Pagination, Autoplay]}
        className="md:w-[85rem] rounded-3xl mt-32">
        {movie?.map((poster) => 
            <>
            <SwiperSlide id={poster?.id}>
            <Link href={{
                  pathname: "/movie",
                  query: {
                    backdrop_path: poster.backdrop_path,
                    title: poster.title,
                    overview: poster.overview,
                    release_date: poster.release_date,
                    vote_average: poster.vote_average,
                    id: poster.id,
                  }
                }}>
              <Image id={poster?.id} priority width={0} src={`https://image.tmdb.org/t/p/w500${poster?.backdrop_path}`} height={0} sizes="100vw" alt="banner de filmes" className="h-[30rem] w-full object-cover"></Image>
                </Link>
            </SwiperSlide>
            </>
            )}
        </Swiper>
          <div className="flex flex-col w-full mx-0 self-start px-14 mt-36">
            <h2 className="text-white font-extrabold text-3xl">Filmes e séries recomendados</h2>
            <Swiper
            breakpoints={{
              640: {
                slidesPerView: 4,
              },
              1420: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
            }}
            autoplay
            loop={true}
            modules={[Navigation, Pagination, Autoplay]}
            className="w-full mt-14 self-start"
          >
            {movie?.map((poster) =>
            <SwiperSlide className="">
              <Link href={{
                  pathname: "/movie",
                  query: {
                    backdrop_path: poster.backdrop_path,
                    title: poster.title,
                    overview: poster.overview,
                    release_date: poster.release_date,
                    vote_average: poster.vote_average,
                    id: poster.id,
                  }
                }}>
                <Image width={0} height={0} src={`https://image.tmdb.org/t/p/w500${poster?.poster_path}`} sizes="100vw" alt="banner de filmes" className="h-[405.131px] w-[306.22px] rounded-3xl object-cover"></Image>
               </Link>
            </SwiperSlide>
            )}
          </Swiper>
          </div>
          <div className="flex flex-col w-full mx-0 self-start px-14 mt-36">
            <h2 className="text-white font-extrabold text-3xl">Categorias de filmes e séries</h2>
            <Swiper
            breakpoints={{
              640: {
                slidesPerView: 3,
              },
              1420: {
                slidesPerView: 3,
              },
            }}
            autoplay
            loop={true}
            modules={[Navigation, Pagination, Autoplay]}
            className="w-full mt-14 self-start"
          >
            <SwiperSlide className="mr-8"><CategoriasFilmes img={banner1} title="romance"/></SwiperSlide>
            <SwiperSlide className="mr-8"><CategoriasFilmes img={banner1} title="romance"/></SwiperSlide>
            <SwiperSlide className="mr-8"><CategoriasFilmes img={banner1} title="romance"/></SwiperSlide>
            <SwiperSlide className="mr-8"><CategoriasFilmes img={banner1} title="romance"/></SwiperSlide>
            <SwiperSlide className="mr-8"><CategoriasFilmes img={banner1} title="romance"/></SwiperSlide>
            <SwiperSlide className="mr-8"><CategoriasFilmes img={banner1} title="romance"/></SwiperSlide>
            <SwiperSlide className="mr-8"><CategoriasFilmes img={banner1} title="romance"/></SwiperSlide>
          </Swiper>
          </div>
          <div className="mt-32"> 
            {movie?.map((movie) => 
            <Link href={{
              pathname: "/movie",
            query: {
              backdrop_path: movie.backdrop_path,
              title: movie.title,
              overview: movie.overview,
              release_date: movie.release_date,
              vote_average: movie.vote_average,
              id: movie.id,
            }
            }}>
              <Recomendacao 
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                description={movie.overview}
                episodes={movie.vote_average}
                temps={movie.runtime}
              />
            </Link>
          ).at(Math.floor(Math.random() * movie?.length))}
          </div>
          <div className="flex flex-col w-full mx-0 self-start px-14 mt-36">
            <h2 className="text-white font-extrabold text-3xl">Filmes e séries recomendados</h2>
            <Swiper
            breakpoints={{
              640: {
                slidesPerView: 4,
              },
              1420: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
            }}
            autoplay
            loop={true}
            modules={[Navigation, Pagination, Autoplay]}
            className="w-full mt-14 self-start"
          >
            <SwiperSlide className=""><Image width={0} src={banner1} alt="banner de filmes" className="h-[405.131px] w-[306.22px] rounded-3xl object-cover"></Image></SwiperSlide>
            <SwiperSlide className=""><Image width={0} src={banner2} alt="banner de filmes" className="h-[405.131px] w-[306.22px] rounded-3xl object-cover"></Image></SwiperSlide>
            <SwiperSlide className=""><Image width={0} src={banner3} alt="banner de filmes" className="h-[405.131px] w-[306.22px] rounded-3xl object-cover"></Image></SwiperSlide>
            <SwiperSlide className=""><Image width={0} src={banner4} alt="banner de filmes" className="h-[405.131px] w-[306.22px] rounded-3xl object-cover"></Image></SwiperSlide>
            <SwiperSlide className=""><Image width={0} src={banner5} alt="banner de filmes" className="h-[405.131px] w-[306.22px] rounded-3xl object-cover"></Image></SwiperSlide>
            <SwiperSlide className=""><Image width={0} src={banner6} alt="banner de filmes" className="h-[405.131px] w-[306.22px] rounded-3xl object-cover"></Image></SwiperSlide>
            <SwiperSlide className=""><Image width={0} src={banner7} alt="banner de filmes" className="h-[405.131px] w-[306.22px] rounded-3xl object-cover"></Image></SwiperSlide>
          </Swiper>
          </div>
          <div className="flex flex-col w-full mx-0 self-start px-14 mt-36">
            <h2 className="text-white font-extrabold text-3xl">Filmes e séries recomendados</h2>
            <Swiper
            breakpoints={{
              640: {
                slidesPerView: 4,
              },
              1420: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
            }}
            autoplay
            loop={true}
            modules={[Navigation, Pagination, Autoplay]}
            className="w-full mt-14 self-start"
          >
            <SwiperSlide className=""><Image width={0} src={banner1} alt="banner de filmes" className="h-[405.131px] w-[306.22px] rounded-3xl object-cover"></Image></SwiperSlide>
            <SwiperSlide className=""><Image width={0} src={banner2} alt="banner de filmes" className="h-[405.131px] w-[306.22px] rounded-3xl object-cover"></Image></SwiperSlide>
            <SwiperSlide className=""><Image width={0} src={banner3} alt="banner de filmes" className="h-[405.131px] w-[306.22px] rounded-3xl object-cover"></Image></SwiperSlide>
            <SwiperSlide className=""><Image width={0} src={banner4} alt="banner de filmes" className="h-[405.131px] w-[306.22px] rounded-3xl object-cover"></Image></SwiperSlide>
            <SwiperSlide className=""><Image width={0} src={banner5} alt="banner de filmes" className="h-[405.131px] w-[306.22px] rounded-3xl object-cover"></Image></SwiperSlide>
            <SwiperSlide className=""><Image width={0} src={banner6} alt="banner de filmes" className="h-[405.131px] w-[306.22px] rounded-3xl object-cover"></Image></SwiperSlide>
            <SwiperSlide className=""><Image width={0} src={banner7} alt="banner de filmes" className="h-[405.131px] w-[306.22px] rounded-3xl object-cover"></Image></SwiperSlide>
          </Swiper>
          </div>
          <div className="flex flex-col w-full mx-0 self-start px-14 mt-36">
            <h2 className="text-white font-extrabold text-3xl">Filmes e séries recomendados</h2>
            <Swiper
            breakpoints={{
              640: {
                slidesPerView: 4,
              },
              1420: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
            }}
            autoplay
            loop={true}
            modules={[Navigation, Pagination, Autoplay]}
            className="w-full mt-14 self-start"
          >
            <SwiperSlide className=""><Image width={0} src={banner1} alt="banner de filmes" className="h-[405.131px] w-[306.22px] rounded-3xl object-cover"></Image></SwiperSlide>
            <SwiperSlide className=""><Image width={0} src={banner2} alt="banner de filmes" className="h-[405.131px] w-[306.22px] rounded-3xl object-cover"></Image></SwiperSlide>
            <SwiperSlide className=""><Image width={0} src={banner3} alt="banner de filmes" className="h-[405.131px] w-[306.22px] rounded-3xl object-cover"></Image></SwiperSlide>
            <SwiperSlide className=""><Image width={0} src={banner4} alt="banner de filmes" className="h-[405.131px] w-[306.22px] rounded-3xl object-cover"></Image></SwiperSlide>
            <SwiperSlide className=""><Image width={0} src={banner5} alt="banner de filmes" className="h-[405.131px] w-[306.22px] rounded-3xl object-cover"></Image></SwiperSlide>
            <SwiperSlide className=""><Image width={0} src={banner6} alt="banner de filmes" className="h-[405.131px] w-[306.22px] rounded-3xl object-cover"></Image></SwiperSlide>
            <SwiperSlide className=""><Image width={0} src={banner7} alt="banner de filmes" className="h-[405.131px] w-[306.22px] rounded-3xl object-cover"></Image></SwiperSlide>
          </Swiper>
          </div>
        </div>
    </main>
    )
}