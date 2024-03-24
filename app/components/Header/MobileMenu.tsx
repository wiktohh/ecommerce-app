import Link from "next/link";
import { navLinks } from "./contants";
import { useSession } from "next-auth/react";

const MobileMenu = () => {
  const session = useSession();

  return (
    <div className="absolute z-20 bg-white left-0 top-16 right-0 bottom-0 md:hidden">
      <ul className="flex flex-col items-center h-full justify-center gap-4">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link href={link.path}>
              <span className="text-orange-500 hover:underline text-2xl">
                {link.name}
              </span>
            </Link>
          </li>
        ))}

        <li className="mt-12">
          <Link href="/cart">
            <span className="text-orange-500 hover:underline text-2xl">
              Koszyk
            </span>
          </Link>
        </li>
        {session.status === "authenticated" ? (
          <li>
            <Link href="/account">
              <span className="text-orange-500 hover:underline text-2xl">
                Konto
              </span>
            </Link>
          </li>
        ) : (
          <li>
            <Link href="/auth">
              <span className="text-orange-500 hover:underline text-2xl">
                Zaloguj się
              </span>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default MobileMenu;
