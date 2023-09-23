'use client'

import { signOut } from "next-auth/react";

export default function SignedHeader(){
    return(
        <header className="w-full h-12 flex items-center bg-purple-950 text-white pt-4 px-6">
            <span className="block">LOGO</span>
            <div className="flex items-center justify-end w-full gap-6">
                <button onClick={() => signOut()} className="flex justify-center items-center md:px-6 px-4 py-1 border border-white rounded-md">Sair</button>
            </div>
        </header>
    )
}