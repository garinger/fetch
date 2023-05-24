interface Props {
  onClick: () => void;
}

export default function LogoutButton({ onClick }: Props) {
  return (
    <div className="flex justify-end m-4">
      <button className="btn" onClick={onClick}>
        Logout
      </button>
    </div>
  );
}
