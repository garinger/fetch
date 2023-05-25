import { Dog } from "@/app/page";
import Image from "next/image";

interface Props {
  dog: Dog;
  liked: boolean;
  onLike: (id: string) => void;
}

export default function DogGridItem({ dog, liked, onLike }: Props) {
  return (
    <div className="card w-3/4 bg-base-100 shadow-xl m-2">
      <figure>
        <Image src={dog.img} width={400} height={400} alt={dog.name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {dog.name}, {dog.age}
        </h2>
        <p>{dog.zip_code}</p>
        <p>{dog.breed}</p>
        <div className="card-actions justify-end">
          <button
            className={liked ? "btn btn-primary" : "btn"}
            onClick={() => onLike(dog.id)}
          >
            Like
          </button>
        </div>
      </div>
    </div>
  );
}
