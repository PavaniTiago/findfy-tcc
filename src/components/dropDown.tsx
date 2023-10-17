'use client'

import { useRouter } from "next/navigation";
import LogoutButton from "./logoutButton";

export default function DropDown() {

  const router = useRouter();
  const pushUser = () => {
    router.push("/perfil")
  }
  const pushFavorites = () => {
    router.push("/favorites")
  }
  const pushConfig = () => {
    router.push("/config")
  }

  return (
    <div className="flex flex-col absolute w-48 z-10 top-20 right-6 items-center justify-center bg-[#594694] rounded-b-lg shadow-xl ">
        <div className="flex flex-col self-start items-start pl-4 gap-2 mt-6 mb-4">
            <button onClick={pushFavorites} className="text-xl font-bold hover:underline">Favoritos</button>
            <button onClick={pushConfig} className="text-xl font-bold hover:underline">Configuração</button>
            <button onClick={pushUser} className="text-xl font-bold hover:underline">Perfil</button>
        </div>
        <LogoutButton />
    </div>
  )
}