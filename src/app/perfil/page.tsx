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

export default function page() {

    const router = useRouter()
    const [user] = useAuthState(auth)
    const userByProvider = useSession()
    const userAvatar = userByProvider.data?.user?.image as string
    

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
                    <button className="flex items-center justify-center text-white text-2xl font-semibold gap-4 hover:underline"><Heart size={60}/>Favoritos</button>
                    <button className="flex items-center justify-center text-white text-2xl font-semibold gap-4 hover:underline"><BiChat size={60}/>Avaliações e comentários</button>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex items-center">
                    <h2 className="text-white text-3xl font-semibold ml-4 mr-4">Última avaliação</h2>
                        <BsStarFill size={30} className="text-white mr-2"/>
                        <BsStarFill size={30} className="text-white mr-2"/>
                        <BsStarFill size={30} className="text-white mr-2"/>
                        <BsStarFill size={30} className="text-white mr-2"/>
                        <Star size={34} className="text-white"/>
                </div>
                <Image alt="ultima foto curtida" src={banner} className="w-[36rem] bg-cover rounded-3xl shadow-xl"/>
            </div>
        </div>
    </div>
  )
}
