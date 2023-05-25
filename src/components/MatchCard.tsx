import { Dog } from "@/app/page";
import Image from "next/image";

interface Props {
  dog: Dog;
  onClose: () => void;
}

export default function MatchCard({ dog, onClose }: Props) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <Image src={dog.img} width={400} height={400} alt={dog.name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {dog.name}, {dog.age}
        </h2>
        <p>{dog.breed}</p>
        <p>{dog.zip_code}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-square btn-sm" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
