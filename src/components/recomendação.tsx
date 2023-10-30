import { Heart } from "lucide-react";
import Image, { StaticImageData } from "next/image"
import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"

interface RecomendacaoProps {
    image: StaticImageData | string;
    description: string;
    episodes: string;
    temps: string;
}
export default function Recomendacao({ image, description, episodes, temps }: RecomendacaoProps) {

    const [liked, setLiked] = useState<boolean>(false)

  return (
        <div className="flex w-[64rem] items-center justify-center">
            <Image width={0} height={0} alt="imagem de recomendação do dia" src={image} sizes="100vw" className="h-[425.131px] w-[300.22px] rounded-3xl object-cover -rotate-12 shadow-2xl mr-32"></Image>
            <div className="flex flex-col">
              <h2 className="text-white font-extrabold text-3xl text-center mb-8">Recomendação do dia</h2>
              <p className="text-white text-xl pb-4">{description}</p>
                <div className="flex gap-12">
                    <span className="text-white font-bold text-3xl bg-purple-100 py-3 px-12 rounded-xl text-center shadow-lg">{episodes}</span>
                    <span className="text-white font-bold text-3xl bg-purple-100 py-3 px-12 rounded-xl text-center shadow-lg">{temps}T</span>
                    {
                        liked ? <button className="border-0" onClick={() => setLiked(false)}><AiFillHeart size={55}/></button> 
                        : <button className="border-0" onClick={() => setLiked(true)}><AiOutlineHeart size={55}/></button>
                    }
                </div>
            </div>
          </div>
    )
}