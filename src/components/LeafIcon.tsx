import { ImLeaf as LogoIcon } from "react-icons/im";

type LeafIconProps = {
  className?: string;
};

export function LeafIcon({ className }: LeafIconProps) {
  return <LogoIcon className={`text-3xl text-amber-800 ${className}`} />;
}
