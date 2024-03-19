"use client";
import Wrapper from "../Wrapper";
import Searchbar from "./Searchbar";
import { MdOutlineAccountCircle } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import NavLinks from "./NavLinks";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Button from "../Button";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const Header = () => {
  const cart = useSelector((state) => state.cart.value);
  const session = useSession();
  const router = useRouter();

  const handleCartClick = () => {
    router.push("/cart");
  };

  const getCartQuantity = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  return (
    <header className="w-full bg-orange-100">
      <Wrapper>
        <div className="w-full flex flex-col justify-between py-4">
          <div className="h-1/2 flex justify-between items-center">
            <Link href="/">
              <h1>Ecommerce App</h1>
            </Link>
            <Searchbar />
            <div className="flex gap-8">
              <div
                onClick={handleCartClick}
                className="flex items-center gap-1"
              >
                <FiShoppingCart className="text-2xl" />
                <p>Koszyk ({getCartQuantity()})</p>
              </div>
              {session.status === "authenticated" ? (
                <Button onClick={() => signOut()}>Wyloguj się</Button>
              ) : (
                <Link
                  href={"/auth"}
                  className="flex items-center gap-1 hover:text-orange-500"
                >
                  <MdOutlineAccountCircle className="text-3xl" />
                  <p>Konto</p>
                </Link>
              )}
            </div>
          </div>
        </div>
        <NavLinks />
      </Wrapper>
    </header>
  );
};

export default Header;
