'use client'

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { auth } from "@/app/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useRouter } from "next/navigation";

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
        <header className="w-full h-12 flex items-center bg-purple-950 text-white pt-4 px-6">
            <span className="block">LOGO</span>
            <div className="flex items-center justify-end w-full gap-6">
                {session.status === "authenticated" || auth.currentUser ? <button onClick={logOut} className="flex justify-center items-center md:px-6 px-4 py-1 border border-white rounded-md">Sair</button> 
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