export default function Header(){
    return(
        <header className="w-full h-12 flex items-center bg-purple-950 text-white px-6">
            <span>LOGO</span>
            <div className="flex items-center justify-end w-full gap-6">
                <button className="flex justify-center items-center px-6 py-1 border border-white rounded-md">Entrar</button>
                <button className="flex justify-center items-center px-6 py-1 border border-white rounded-md">Cadastrar</button>
            </div>
        </header>
    )
}