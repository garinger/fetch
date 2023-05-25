"use client";

interface Props {
  onClick: () => void;
  disabled: boolean;
}

export default function MatchButton({ onClick, disabled }: Props) {
  return (
    <div className="flex justify-center m-4">
      <button
        className="btn btn-primary w-64 h-16"
        onClick={onClick}
        disabled={disabled}
      >
        Match!
      </button>
    </div>
  );
}
