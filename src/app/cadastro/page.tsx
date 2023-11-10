'use client'

import { signIn } from "next-auth/react";
import { SyntheticEvent, useState } from "react";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";
import { useAuthState, useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { BiLogoGoogle } from "react-icons/bi";
import { getDatabase, ref, set } from "firebase/database";
import { MyContextProvider, useMyContext } from '../context/context';

export default function Home() {

    const { minhaVariavel, setMinhaVariavel } = useMyContext();
    const router = useRouter();
  
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordAgain, setPasswordAgain] = useState('')
    const [error, setError] = useState(null);
    const [createUserWithEmailAndPassoword] = useCreateUserWithEmailAndPassword(auth) 
    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
    const [user] = useAuthState(auth)
  
    async function signin(e: SyntheticEvent){
      e.preventDefault();

      try {
        await createUserWithEmailAndPassoword(email, password);
        await signInWithEmailAndPassword(email, password);
        
        const db = getDatabase();
        await set(ref(db, 'users/' + name), {
          name: name,
          email: email
        });

        setMinhaVariavel(name); // Defina a variável aqui
        router.push("/")
      } catch (error: any) {
        setError(error.message);
      }
    }

    return (
      <main className="w-full h-screen bg-purple-950 text-white pb-28">
        <div className="h-full flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-6 mt-12">
            Sing in to FindFy
          </h1>
  
          <form className="md:w-[400px] w-fit flex flex-col gap-1 px-6 pt-8 pb-4 bg-purple-900 rounded-lg">
            <label htmlFor="input" className="text-sm font-medium">Nome</label>
            <input onChange={(e) => setName(e.target.value)} type="text" placeholder="insira seu nome" className="bg-purple-950 rounded px-3 py-2 shadow-lg mb-3"/>
            <label htmlFor="input" className="text-sm font-medium">Email</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="insira seu e-mail" className="bg-purple-950 rounded px-3 py-2 shadow-lg mb-3"/>
            <label htmlFor="input" className="text-sm font-medium">Senha</label>
            <input onChange={e => setPassword(e.target.value)} type="password" placeholder="insira sua senha" className="bg-purple-950 rounded px-3 py-2 shadow-lg mb-3"/>
            <label htmlFor="input" className="text-sm font-medium">Confirme sua senha</label>
            <input onChange={e => setPasswordAgain(e.target.value)} type="password" placeholder="confirme sua senha" className="bg-purple-950 rounded px-3 py-2 shadow-lg"/>
            <button type="submit" className="w-full bg-white hover:bg-white/90 text-black rounded py-1.5 text-md font-semibold mt-4 mb-2 shadow-lg" onClick={signin} disabled={(!email || !password || !passwordAgain) || (password !== passwordAgain)}>Criar conta</button>
            {error && <p>{error}</p>}
            <div className="flex items-center justify-center gap-3">
              <div className="w-28 h-[0.1px] bg-white/60"></div>
              <p className="text-white/60">ou</p>
              <div className="w-28 h-[0.1px] bg-white/60"></div>
            </div>
            <div className="flex self-center w-full space-x-8">
              <button className="w-full flex items-center justify-center mt-3 bg-white hover:bg-white/90 rounded text-black py-1" onClick={() => signIn()}><BiLogoGoogle className="w-6 h-6"/></button>
              {/* <button className="w-20 flex items-center justify-center mt-3 bg-white hover:bg-white/90 rounded text-black py-1"><BsMicrosoft className="w-5 h-5"/></button> */}
            </div>
          </form>
            <span className="text-sm text-white/70 mt-2">Feito com ❤ por Find<span className="text-purple-200">Fy</span></span>
        </div>
      </main>
    )
  }