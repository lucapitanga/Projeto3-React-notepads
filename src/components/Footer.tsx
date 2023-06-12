import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="flex py-8 px-6 bottom-0 left-0 fixed">
      <Link to="/" className="text-amber-800 hover:text-amber-700">
        © 2023 Leaf Notepads
      </Link>
    </footer>
  );
}
