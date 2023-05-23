import { Dog } from "@/app/page";
import DogGridItem from "./DogGridItem";

interface Props {
  dogs: Dog[];
  likes: string[];
  onLike: (id: string) => void;
}

export default function DogGrid({ dogs, likes, onLike }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-items-center">
      {dogs.map((dog) => (
        <DogGridItem
          key={dog.id}
          dog={dog}
          liked={likes.includes(dog.id)}
          onLike={onLike}
        />
      ))}
    </div>
  );
}
