import { Search } from "lucide-react"

function SearchBar() {
  return (
    <div className="flex relative items-center justify-center md:w-[1024px] rounded-lg md:h-12 bg-purple-100 shadow-xl">
      <Search size={30} className="absolute left-4"/>
        <input type="text" placeholder="descreva o que você deseja assistir" className="placeholder-white pl-20 w-full h-full rounded-lg bg-purple-100" />
    </div>
  )
}

export default SearchBar