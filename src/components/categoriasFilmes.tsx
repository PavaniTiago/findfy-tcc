import Image, { StaticImageData } from "next/image";

interface CategoriasFilmesProps {
    img: StaticImageData;
    title: string;
}

export default function CategoriasFilmes({ img, title }: CategoriasFilmesProps) {
  return (
    <div className="w-[28rem] h-64 relative flex items-center justify-center bg-purple-900 rounded-3xl">
      <span className="text-4xl font-semibold self-center z-10 uppercase">{title}</span>
        <Image width={1500} src={img} alt="banner de filmes" className="h-full absolute w-full rounded-3xl object-cover hover:opacity-100 hover:ease-in-out cursor-pointer transition duration-300 opacity-0"></Image>
    </div>
  )
}