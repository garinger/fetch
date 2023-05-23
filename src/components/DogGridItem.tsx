import { Dog } from "@/app/page";
import Image from "next/image";

interface Props {
  dog: Dog;
}

export default function DogGridItem({ dog }: Props) {
  return (
    <div className="card w-3/4 bg-base-100 shadow-xl m-2">
      <figure>
        <Image
          src={dog.img}
          width={0}
          height={0}
          alt={dog.name}
          sizes="100vw"
          className="w-full h-auto"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {dog.name}, {dog.age}
        </h2>
        <p>{dog.breed}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Like</button>
        </div>
      </div>
    </div>
  );
}
