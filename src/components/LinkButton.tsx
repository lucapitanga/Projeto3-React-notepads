import { Link } from "react-router-dom";

type LinkButtonProps = {
  children: React.ReactNode;
  className?: string;
  to: string;
};

export function LinkButton({ children, className = "", to }: LinkButtonProps) {
  return (
    <Link
      to={to}
      className={`bg-amber-800 hover:bg-amber-700 rounded-md px-2 py-2 text-sm text-white ${className}`}
    >
      {children}
    </Link>
  );
}
