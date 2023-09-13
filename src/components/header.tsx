import Link from "next/link";

export default function Header(){
    return(
        <header className="w-full h-12 flex items-center bg-purple-950 text-white pt-4 px-6">
            <span className="block">LOGO</span>
            <div className="flex items-center justify-end w-full gap-6">
                <Link href="/" className="flex justify-center items-center px-6 py-1 border border-white rounded-md">Entrar</Link>
                <Link href="/cadastro" className="flex justify-center items-center bg-white text-black hover:text-white font-semibold px-6 py-1 hover:border hover:bg-purple-950 border-white rounded-md transition-colors">Cadastrar</Link>
            </div>
        </header>
    )
}