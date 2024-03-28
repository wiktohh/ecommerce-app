import { navLinks } from "./contants";
import { signOut, useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface MobileMenuProps {
  isOpen: boolean;
  toggleMobileMenu: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  toggleMobileMenu,
}) => {
  const session = useSession();

  const router = useRouter();

  const handleLinkClick = (link: string) => {
    router.push(link);
    toggleMobileMenu();
  };

  const handleSignOutButton = () => {
    signOut();
    toggleMobileMenu();
  };

  const variants = {
    open: { x: "-100%" },
    closed: { x: "0%" },
  };
  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={!isOpen ? "open" : "closed"}
      variants={variants}
      transition={{ stiffness: 100, duration: 0.3 }}
      className="absolute z-20 bg-white left-0 top-16 right-0 bottom-0 md:hidden overflow-hidden"
    >
      <ul className="flex flex-col items-center h-full justify-center gap-4">
        {navLinks.map((link) => (
          <li key={link.name}>
            <button onClick={() => handleLinkClick(link.path)}>
              <span className="text-orange-500 hover:underline text-2xl">
                {link.name}
              </span>
            </button>
          </li>
        ))}

        <li className="mt-12">
          <button onClick={() => handleLinkClick("/cart")}>
            <span className="text-orange-500 hover:underline text-2xl">
              Koszyk
            </span>
          </button>
        </li>
        {session.status === "authenticated" ? (
          <>
            <li>
              <button onClick={() => handleLinkClick("/account")}>
                <span className="text-orange-500 hover:underline text-2xl">
                  Konto
                </span>
              </button>
            </li>
            <li className="mt-12">
              <button onClick={handleSignOutButton}>
                <span className="text-orange-500 hover:underline text-2xl">
                  Wyloguj się
                </span>
              </button>
            </li>
          </>
        ) : (
          <li>
            <button onClick={() => handleLinkClick("/auth")}>
              <span className="text-orange-500 hover:underline text-2xl">
                Zaloguj się
              </span>
            </button>
          </li>
        )}
      </ul>
    </motion.div>
  );
};

export default MobileMenu;
