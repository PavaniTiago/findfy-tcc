'use client'

import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';
import { auth } from "../firebase";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth"

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';
import Image from "next/image";

import banner1 from "../../../public/banner.jpg"
import banner2 from "../../../public/banner2.jpg"
import banner3 from "../../../public/banner3.jpg"
import banner4 from "../../../public/banner4.jpg"
import banner5 from "../../../public/banner5.jpg"
import banner6 from "../../../public/banner6.jpg"
import banner7 from "../../../public/banner7.jpg"

export default function Home(){
    const session = useSession();
    const router = useRouter();
    const [user] = useAuthState(auth)

    
      // if(session.status === "unauthenticated"){
      //   router.push("/")
      // }
    

    return (
        <main className="w-full h-[100%] bg-gradient-to-br from-[#0e1019] to-purple-300 text-white pb-28">
        <div className="flex flex-col items-center justify-center ">    
          <Swiper
            slidesPerView={1}
            autoplay
            loop={true}
            modules={[Navigation, Pagination, Autoplay]}
            className="md:w-[85rem] rounded-3xl mt-32"
          >
            <SwiperSlide><Image width={2000} src={banner1} alt="banner de filmes" className="h-[30rem] object-cover"></Image></SwiperSlide>
            <SwiperSlide><Image width={2000} src={banner2} alt="banner de filmes" className="h-[30rem] object-cover"></Image></SwiperSlide>
            <SwiperSlide><Image width={2000} src={banner3} alt="banner de filmes" className="h-[30rem] object-cover"></Image></SwiperSlide>
            <SwiperSlide><Image width={2000} src={banner4} alt="banner de filmes" className="h-[30rem] object-cover"></Image></SwiperSlide>
            <SwiperSlide><Image width={2000} src={banner5} alt="banner de filmes" className="h-[30rem] object-cover"></Image></SwiperSlide>
            <SwiperSlide><Image width={2000} src={banner6} alt="banner de filmes" className="h-[30rem] object-cover"></Image></SwiperSlide>
            <SwiperSlide><Image width={2000} src={banner7} alt="banner de filmes" className="h-[30rem] object-cover"></Image></SwiperSlide>
          </Swiper>

          <div className="flex flex-col w-full px-14 mt-36">
            <h2 className="text-white font-extrabold text-3xl">Filmes e séries recomendados</h2>
            <Swiper
            slidesPerView={3}
            autoplay
            loop={true}
            modules={[Navigation, Pagination, Autoplay]}
            className="md:w-full mt-14"
          >
            <SwiperSlide><Image width={0} src={banner1} alt="banner de filmes" className="h-[30rem] w-96 rounded-3xl object-cover"></Image></SwiperSlide>
            <SwiperSlide><Image width={1500} src={banner2} alt="banner de filmes" className="h-[30rem] w-96 rounded-3xl object-cover"></Image></SwiperSlide>
            <SwiperSlide><Image width={1500} src={banner3} alt="banner de filmes" className="h-[30rem] w-96 rounded-3xl object-cover"></Image></SwiperSlide>
            <SwiperSlide><Image width={1500} src={banner4} alt="banner de filmes" className="h-[30rem] w-96 rounded-3xl object-cover"></Image></SwiperSlide>
            <SwiperSlide><Image width={1500} src={banner5} alt="banner de filmes" className="h-[30rem] w-96 rounded-3xl object-cover"></Image></SwiperSlide>
            <SwiperSlide><Image width={1500} src={banner6} alt="banner de filmes" className="h-[30rem] w-96 rounded-3xl object-cover"></Image></SwiperSlide>
            <SwiperSlide><Image width={1500} src={banner7} alt="banner de filmes" className="h-[30rem] w-96 rounded-3xl object-cover"></Image></SwiperSlide>
          </Swiper>
          </div>
        </div>
    </main>
    )
}