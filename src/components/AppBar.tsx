import { Link } from "react-router-dom";
import { LeafIcon } from "./LeafIcon";
import { LinkButton } from "./LinkButton";

export function AppBar() {
  return (
    <header className="flex flex-row px-4 py-5 items-center">
      <div className="flex flex-row gap-4">
        <Link to="/">
          <LeafIcon className="hover:text-amber-700" />
        </Link>
        <Link to="/" className="hidden md:block text-amber-800 hover:underline">
          Home
        </Link>
      </div>
      <h1 className="flex flex-1 text-4xl text-amber-800 justify-center">
        Leaf Notepads
      </h1>
      <LinkButton to="/criar-notepad">Criar notepad</LinkButton>
    </header>
  );
}
