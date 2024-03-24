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
import { RootState } from "@/app/store/store";
import { ProductWithQuantity } from "@/app/types/types";

const Header = () => {
  const cart = useSelector((state: RootState) => state.cart.value);
  const session = useSession();
  const router = useRouter();

  const handleCartClick = () => {
    router.push("/cart");
  };

  const getCartQuantity = () => {
    return cart.reduce(
      (acc: number, item: ProductWithQuantity) => acc + item.quantity,
      0
    );
  };

  return (
    <header className="w-full bg-orange-100">
      <Wrapper>
        <div className="w-full flex flex-col justify-between py-4">
          <div className="h-1/2 flex justify-between items-center">
            <Link href="/">
              <h1 className="font-semibold text-orange-500 text-2xl">
                FoodieMarket
              </h1>
            </Link>
            <Searchbar />
            <div className="flex gap-8">
              <button
                onClick={handleCartClick}
                className="flex items-center gap-1 hover:text-orange-500 cursor-pointer"
              >
                <FiShoppingCart className="text-2xl" />
                <p>
                  Koszyk {getCartQuantity() > 0 && `(${getCartQuantity()})`}
                </p>
              </button>
              {session.status === "authenticated" ? (
                <div className="flex gap-8">
                  <Link
                    href={"/account"}
                    className="flex items-center gap-1 hover:text-orange-500"
                  >
                    <MdOutlineAccountCircle className="text-3xl" />
                    <p>Konto</p>
                  </Link>
                  <Button onClick={() => signOut()}>Wyloguj się</Button>
                </div>
              ) : (
                <Link
                  href={"/auth"}
                  className="flex items-center gap-1 hover:text-orange-500"
                >
                  <MdOutlineAccountCircle className="text-3xl" />
                  <p>Zaloguj się</p>
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
