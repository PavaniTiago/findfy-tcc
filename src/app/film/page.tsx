"use client"

import Image from "next/image";
import fundo from "../../../public/Imagem.jpg"
import { AiOutlineHeart } from "react-icons/ai"
import { Clock2Icon, LucideArrowLeft, Star, Tv2 } from "lucide-react";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Actor from "@/components/actor";
import { useRouter } from "next/navigation";

export default function page() {

  const router = useRouter()
  
  return (
    <div className="w-full h-[100%] bg-[#2A2243] relative">
      <div className="relative">
        <LucideArrowLeft onClick={router.back} size={50} className="text-white cursor-pointer absolute top-12 left-8"/>
        <Image alt="fundo do filme" src={fundo} className="w-full"/>
        <div className="absolute bottom-0 h-72 bg-gradient-to-b from-transparent to-[#2A2243] w-full"></div>
      </div>
        <div className="flex items-center px-8 pb-10">
            <div className="flex flex-col">
                <div className="flex items-center gap-4">
                    <h2 className="text-4xl text-white font-semibold">Garota do Século 20</h2>
                    <AiOutlineHeart size={35} className="text-white"/>
                    <Star size={30} className="text-white"/>
                    <Star size={30} className="text-white"/>
                    <Star size={30} className="text-white"/>
                    <Star size={30} className="text-white"/>
                    <Star size={30} className="text-white"/>
                </div>
                <div className="flex items-center gap-4 mt-3">
                    <h3 className="text-white/70 text-lg font-semibold">meio drama</h3>
                    <span className="text-black font-semibold bg-purple-100 px-3 py-1.5 rounded-2xl">13+</span>
                    <span className="text-black font-semibold bg-purple-100 px-3 py-1.5 rounded-2xl">2022</span>
                    <span className="flex items-center gap-1 text-black font-semibold bg-purple-100 px-3 py-1.5 rounded-2xl"><Clock2Icon size={20}/> 1hr 59min</span>
                </div>
                <p className="w-4/6 text-start text-xl text-white font-medium bg-purple-100 px-6 py-4 rounded-2xl mt-6">Em 1999, uma adolescente monitora atentamente o garoto pelo qual a melhor amiga está apaixonada. Tudo vai bem até que um outro amor começa a dar as caras.</p>
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
