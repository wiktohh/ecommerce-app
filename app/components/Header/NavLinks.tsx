import Link from "next/link";
import { navLinks } from "./contants";

const NavLinks = () => {
  return (
    <nav>
      <ul className="mt-4 pb-4 flex justify-evenly">
        {navLinks.map((link, idx) => (
          <li key={idx}>
            <Link href={link.path}>
              <span className="p-1 hover:border-b-2 border-red-500">
                {link.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavLinks;