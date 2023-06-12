type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
};

export function Button({
  children,
  type,
  onClick,
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-amber-800 hover:bg-amber-700 rounded-md px-2 py-1 text-md text-white ${className}`}
    >
      {children}
    </button>
  );
}
