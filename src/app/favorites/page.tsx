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
import { ref, get, getDatabase } from 'firebase/database';
import { useMyContext } from '../context/context';

export default function page() {

    const router = useRouter()
    const { minhaVariavel } = useMyContext()
    const [favorites, setFavorites] = useState<any[]>([])
    const [isDataFetched, setIsDataFetched] = useState(false);

    useEffect(() => {
      const searchMovie = async (id: string) => {
        try {
          // Verificar se o filme já está na lista de favoritos antes de fazer a chamada à API
          const isIdAlreadyAdded = favorites.some((item) => item.id === id);
    
          if (!isIdAlreadyAdded) {
            const options = {
              method: 'GET',
              url: `https://api.themoviedb.org/3/movie/${id}`,
              params: { language: 'pt-BR' },
              headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_HEADER_KEY}`,
              },
            };
    
            const response = await axios.request(options);
    
            // Adicionar o filme à lista de favoritos apenas se não estiver lá
            setFavorites((prevData) => [...prevData, response.data]);
    
            console.log(response.data);
          }
        } catch (error) {
          console.error(error);
        }
      };
    
      const fetchIdsFromDatabase = async () => {
        const db = getDatabase();
        const favoritesRef = ref(db, `users/${minhaVariavel}/favoritesMovies`);
    
        try {
          const snapshot = await get(favoritesRef);
          const favoritesList: string[] = snapshot.val() || [];
    
          // Para cada ID salvo no banco de dados, faça uma chamada de API
          await Promise.all(favoritesList.map((id) => searchMovie(id)));
    
          setIsDataFetched(true);
        } catch (error: any) {
          console.error('Erro ao buscar IDs do banco de dados:', error.message);
        }
      };
    
      if (!isDataFetched) {
        fetchIdsFromDatabase();
      }
    }, [minhaVariavel, favorites, isDataFetched]);
    
    
    
    
    return (
        <main className="w-full h-screen  relative bg-gradient-to-br from-[#0e1019] to-purple-300 text-white pb-12">
          <div className='flex flex-col items-start'>
            <div className='flex gap-6 pt-12 pl-8'>
              <LucideArrowLeft onClick={() => router.back()} size={50} className="text-white self-center cursor-pointer"/>
              <h2 className="text-white font-extrabold text-3xl self-center">Favoritos</h2>
            </div>
              <div className="flex w-full flex-wrap gap-12 self-start px-6 mt-20">
              {favorites?.filter((item, index, self) =>
                  index === self.findIndex((t) => t.id === item.id)
                ).map((poster) => (
                  <Link
                    key={poster.id}
                    className='flex flex-col items-center justify-center gap-3 w-[16rem]'
                    href={{
                      pathname: "/movie",
                      query: {
                        backdrop_path: poster?.backdrop_path,
                        title: poster?.title,
                        overview: poster?.overview,
                        release_date: poster?.release_date,
                        vote_average: poster?.vote_average,
                        id: poster?.id,
                      },
                    }}
                  >
                    <Image
                      width={0}
                      height={0}
                      src={`https://image.tmdb.org/t/p/w500${poster?.poster_path}`}
                      sizes="100vw"
                      alt="banner de filmes"
                      className="w-full rounded-3xl object-cover"
                    ></Image>
                    <h2 className="text-white font-semibold text-2xl text-center line-clamp-1">{poster?.title}</h2>
                  </Link>
              ))}
              </div>
          </div>
        </main>
    )
}