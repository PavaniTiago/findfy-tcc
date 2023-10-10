'use client'

import { auth } from "@/app/firebase";
import { LogOut } from "lucide-react";
import { useSession, signOut  } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter()
    const session = useSession()

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
    
  return (
    <button onClick={logOut} className="bg-black px-6 py-2 text-white text-sm font-semibold text-center rounded flex items-center justify-center mb-4 hover:underline shadow-lg"><LogOut size={15} className="mr-2"/>Logout</button>
  )
}