interface Props {
  onBreedChange: (breed: string) => void;
}

export default function Filter({ onBreedChange }: Props) {
  return (
    <>
      <div className="flex justify-center items-center my-4">
        <input
          type="text"
          placeholder="Breed"
          className="input input-bordered"
          onChange={(event) => onBreedChange(event.target.value)}
        />
      </div>
    </>
  );
}
