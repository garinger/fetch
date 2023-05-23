"use client";

interface Props {
  onBreedsChange: (breeds: string[]) => void;
}

export default function Filter({ onBreedsChange }: Props) {
  return (
    <>
      <div className="flex justify-center items-center my-4">
        <input
          type="text"
          placeholder="Breed"
          className="input input-bordered"
          onChange={(event) =>
            event.target.value === ""
              ? onBreedsChange([])
              : onBreedsChange([event.target.value])
          }
        />
      </div>
    </>
  );
}
