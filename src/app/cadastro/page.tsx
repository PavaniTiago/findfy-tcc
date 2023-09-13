import { Github, Facebook } from "lucide-react";

export default function page() {
  return (
    <main className="w-full h-screen bg-purple-950 text-white pb-28">
      <div className="h-full flex flex-col items-center justify-center">
        <span>Logo</span>
        <h1 className="text-3xl font-bold mb-6">
          Sing in to FindFy
        </h1>

        <form className="w-[400px] flex flex-col gap-1 px-6 pt-8 pb-4 bg-purple-900 rounded-lg">
          <label htmlFor="input" className="text-sm font-medium">Email</label>
          <input type="email" placeholder="insira seu e-mail" className="bg-purple-950 rounded px-3 py-2 shadow-lg mb-3"/>
          <label htmlFor="input" className="text-sm font-medium">Senha</label>
          <input type="password" placeholder="insira sua senha" className="bg-purple-950 rounded px-3 py-2 shadow-lg mb-3"/>
          <label htmlFor="input" className="text-sm font-medium">Confirme sua senha</label>
          <input type="password" placeholder="confirme sua senha" className="bg-purple-950 rounded px-3 py-2 shadow-lg"/>
          <button type="submit" className="w-full bg-white hover:bg-white/90 text-black rounded py-1.5 text-md font-semibold mt-4 mb-2 shadow-lg">Criar conta</button>
          <div className="flex self-center space-x-8">
            <button className="w-20 flex items-center justify-center mt-3 bg-white hover:bg-white/90 rounded text-black py-1"><Github className="w-6 h-6"/></button>
            <button className="w-20 flex items-center justify-center mt-3 bg-white hover:bg-white/90 rounded text-black py-1"><Facebook className="w-6 h-6"/></button>
          </div>
        </form>
          <span className="text-sm text-white/70 mt-1">Feito com ❤ por Find<span className="text-purple-200">Fy</span></span>
      </div>
    </main>
  )
}