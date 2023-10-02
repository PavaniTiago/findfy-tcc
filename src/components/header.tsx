'use client'

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { auth } from "@/app/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useRouter } from "next/navigation";
import SearchBar from "./searchBar";
import { Bell, UserCircle2Icon } from "lucide-react";

export default function Header(){

    const session = useSession()
    const router = useRouter()
    const [user] = useAuthState(auth)

    // const logOut = async () => {
    //     await auth.signOut()
    //     await signOut()
    //     router.push("/")
    // }

    const logOut = async () => {
        if(session.status === "authenticated"){
            await signOut()
            .then(() => {
                router.push("/")
            })
        }else{
            await auth.signOut()
            .then(() => {
                router.push("/")
            })
        }
    }

    return(
        <header className="w-full h-20 flex items-center bg-[#594694] text-white px-6 py-2">
            <span className="block">LOGO</span>
            <div className="flex items-center justify-end w-full gap-6">
                {session.status === "authenticated" || auth.currentUser ? 
                <>
                <div className="mr-12">
                <SearchBar />
                </div>
                <button><Bell size={30}/></button>
                <button><UserCircle2Icon size={30}/></button>
                <button onClick={logOut} className="flex justify-center items-center md:px-6 px-4 py-1 border border-white rounded-md">Sair</button>
                </>
                : 
                <>
                <Link href="/" className="flex justify-center items-center md:px-6 px-4 py-1 border border-white rounded-md">Entrar</Link>
                <Link href="/cadastro" className="flex justify-center items-center bg-white text-black hover:text-white font-semibold md:px-6 px-4 py-1 hover:border hover:bg-purple-950 border-white rounded-md transition-colors">Cadastrar</Link>
                </> 
                }                
            </div>
        </header>
    )
}