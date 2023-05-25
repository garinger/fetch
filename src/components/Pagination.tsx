"use client";

interface Props {
  onPageChange: (next: boolean) => void;
  nextDisabled: boolean;
  previousDisabled: boolean;
}

export default function Pagination({
  onPageChange,
  nextDisabled,
  previousDisabled,
}: Props) {
  return (
    <div className="btn-group flex justify-center my-12 gap-1">
      <button
        className="btn w-36"
        onClick={() => onPageChange(false)}
        disabled={previousDisabled}
      >
        Previous
      </button>
      <button
        className="btn w-36"
        onClick={() => onPageChange(true)}
        disabled={nextDisabled}
      >
        Next
      </button>
    </div>
  );
}
