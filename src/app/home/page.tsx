'use client'

import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';
import { auth } from "../firebase";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth"

export default function Home(){
    const session = useSession();
    const router = useRouter();
    const [user] = useAuthState(auth)

    
      // if(session.status === "unauthenticated"){
      //   router.push("/")
      // }
    

    return (
        <main className="w-full h-screen bg-purple-950 text-white pb-28">
        <div className="h-full flex flex-col items-center justify-center">    
        <h1 className="text-3xl font-bold mb-6">
            welcome {session.data?.user?.name || user?.email}
        </h1> 
      </div>
    </main>
    )
}