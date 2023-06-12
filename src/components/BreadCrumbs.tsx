import { Link } from "react-router-dom";
import { RiArrowLeftSFill as BackLogo } from "react-icons/ri";

type BreadCrumbsProps = {
  links: {
    href: string;
    label: React.ReactNode;
  };
};

export function BreadCrumbs({ links }: BreadCrumbsProps) {
  return (
    <div className="flex flex-row gap-2 items-center px-4 mt-4">
      {links.map((link: any, index: any) => (
        <div key={index} className="flex items-center gap-1">
          <Link to={link.href} className="hover:underline text-amber-800">
            {link.label}
          </Link>
          {index < links.length - 1 && <BackLogo className="text-lg" />}
        </div>
      ))}
    </div>
  );
}
