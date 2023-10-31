'use client'

import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { LucideArrowLeft } from 'lucide-react';
import Image from "next/image"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MovieProps } from '../interface/movieInterface';
import axios from 'axios';
import Link from 'next/link';

export default function page() {

    const router = useRouter()
    const [favorites, setFavorites] = useState<MovieProps[]>()

    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/account/20593585/favorite/movies',
            params: {language: 'en-US', page: '1', sort_by: 'created_at.asc'},
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_HEADER_KEY}`
            }
          };
          
          axios
            .request(options)
            .then((response) => {
              setFavorites(response.data.results)
              console.log(response.data);
            })
            .catch(function (error) {
              console.error(error);
            });
    }, [])

    return (
        <main className="w-full h-[100%] relative bg-gradient-to-br from-[#0e1019] to-purple-300 text-white pb-12">
          <div className='flex flex-col items-start'>
            <div className='flex gap-6 pt-12 pl-8'>
              <LucideArrowLeft onClick={() => router.back()} size={50} className="text-white self-center cursor-pointer"/>
              <h2 className="text-white font-extrabold text-3xl self-center">Favoritos</h2>
            </div>
              <div className="flex w-full flex-wrap gap-12 self-start px-6 mt-20">
                    {favorites?.map((poster) => 
                          <Link className='flex flex-col items-cente justify-center gap-3 w-[16rem]' href={{
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
                            <Image width={0} height={0} src={`https://image.tmdb.org/t/p/w500${poster?.poster_path}`} sizes="100vw" alt="banner de filmes" className="w-full rounded-3xl object-cover"></Image>
                            <h2 className="text-white font-semibold text-2xl text-center line-clamp-1">{poster.title}</h2>
                          </Link>
                        )}
              </div>
          </div>
        </main>
    )
}