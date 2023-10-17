import Image, { StaticImageData } from "next/image";

interface ActorProps {
    img: StaticImageData,
    title: string,
}

export default function Actor({ img, title }: ActorProps){
    return (
        <div className="flex flex-col items-center gap-3">
            <Image src={img} alt="ator do filme" className="w-40 h-40 rounded-full object-cover shadow-xl"/>
            <h2 className="text-xl text-white/75 font-semibold">{title}</h2>
        </div>
    )
}