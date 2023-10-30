import { GenresProps } from "@/app/interface/gentes";

export const Genres = ({ name, index, length}: any ) => {
    return (
        <div className="flex gap-4 text-white/60 hover:text-white transition-colors cursor-pointer text-lg font-semibold">
            <span>{name}</span>
            <span>{index + 1 !== length ? "/" : ""}</span>
        </div>
    )
}