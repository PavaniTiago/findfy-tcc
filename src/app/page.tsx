'use client'

import { Github, Facebook } from "lucide-react";
import { BiLogoGoogle } from "react-icons/bi"
import { BsMicrosoft } from "react-icons/bs"
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation"
import { SyntheticEvent, useState } from "react";
import { auth } from "./firebase";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useAuthState } from "react-firebase-hooks/auth"
import { useMyContext } from "./context/context";


export default function Home() {

  const { minhaVariavel } = useMyContext() 
  console.log(minhaVariavel)
  const router = useRouter();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const session = useSession();
  const [user] = useAuthState(auth)

  if(session.status === "authenticated"){
    router.push("/home")
  }
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  
  async function signin(e: SyntheticEvent) {
    e.preventDefault();

    try{
      signInWithEmailAndPassword(email, password)
      .then(() => {
        router.push("/home")
      })
    }
    catch(error: any){
      setError(error.message)
    }
  }

  return (
    <main className="w-full h-screen bg-purple-950 text-white pb-28">
      <div className="h-full flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-6">
          Sing in to FindFy
        </h1>
        <form onSubmit={signin} className="md:w-[400px] w-fit flex flex-col gap-1 px-6 pt-8 pb-4 bg-purple-900 rounded-lg">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="insira seu e-mail" className="bg-purple-950 rounded px-3 py-2 shadow-lg mb-3"/>
          <label htmlFor="password" className="text-sm font-medium">Senha</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" placeholder="insira sua senha" className="bg-purple-950 rounded px-3 py-2 shadow-lg"/>
          <button type="submit" className="w-full bg-white hover:bg-white/90 text-black rounded py-1.5 text-md font-semibold mt-4 mb-2 shadow-lg">Entrar</button>
          {error && <span>{error}</span>}
          <div className="flex items-center justify-center gap-3">
            <div className="w-28 h-[0.1px] bg-white/60"></div>
            <p className="text-white/60">ou</p>
            <div className="w-28 h-[0.1px] bg-white/60"></div>
          </div>
          <div className="flex self-center w-full space-x-8">
            <button className="w-full flex items-center justify-center mt-3 bg-white hover:bg-white/90 rounded text-black py-1" onClick={() => signIn('google')}><BiLogoGoogle className="w-6 h-6"/></button>
            {/* <button className="w-20 flex items-center justify-center mt-3 bg-white hover:bg-white/90 rounded text-black py-1" onClick={() => signIn('microsoft')}><BsMicrosoft className="w-5 h-5"/></button> */}
          </div>
          <Link href="/cadastro" className="flex text-sm text-white/70 hover:text-white hover:underline self-center mt-3">Não tem uma conta ainda? crie agora.</Link>
        </form>
          <span className="text-sm text-white/70 mt-2">Feito com ❤ por Find<span className="text-purple-200">Fy</span></span>
      </div>
    </main>
  )
}