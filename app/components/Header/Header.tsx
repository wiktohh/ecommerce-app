"use client";
import Wrapper from "../Wrapper";
import Searchbar from "./Searchbar";
import { MdOutlineAccountCircle } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import NavLinks from "./NavLinks";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/app/store/store";
import { ProductWithQuantity } from "@/app/types/types";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { Suspense, use, useEffect, useLayoutEffect, useState } from "react";
import MobileMenu from "./MobileMenu";
import { inicializeCart, numberOfItems } from "@/app/store/cartSlice";
import LoadingSpinner from "../LoadingSpinner";

const Header = () => {
  const session = useSession();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);
  const cart = useSelector((state: RootState) => state.cart.value);
  const dispatch = useDispatch();

  const handleCartClick = () => {
    router.push("/cart");
  };
  const getCartQuantity = () => {
    setCartQuantity(
      cart.reduce(
        (acc: number, item: ProductWithQuantity) => acc + item.quantity,
        0
      )
    );
  };

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") as string);
    if (cart) {
      dispatch(inicializeCart(cart));
    }
  }, []);

  useEffect(() => {
    getCartQuantity();
  }, [cart]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="w-full shadow-lg bg-orange-100 h-16 md:h-32">
      <Wrapper>
        <div className="w-full flex flex-col justify-between py-4">
          <div className="h-1/2 flex justify-between md:justify-evenly lg:justify-between items-center">
            <Link data-testid="heading-title" href="/">
              <h1 className="font-semibold text-orange-500 text-2xl">
                FoodieMarket
              </h1>
            </Link>
            <Searchbar />
            {!isMobileMenuOpen ? (
              <GiHamburgerMenu
                data-testid="mobile-menu"
                className="text-3xl cursor-pointer md:hidden hover:text-orange-500"
                onClick={toggleMobileMenu}
              />
            ) : (
              <IoMdClose
                data-testid="close-mobile-menu"
                className="text-3xl cursor-pointer md:hidden  hover:text-orange-500"
                onClick={toggleMobileMenu}
              />
            )}
            <div className="hidden md:flex gap-8">
              <Link
                data-testid="cart-button"
                href={"/cart"}
                className="flex items-center gap-1 hover:text-orange-500 cursor-pointer"
              >
                <FiShoppingCart className="text-2xl" />
                <p>Koszyk</p>
                {cartQuantity > 0 && (
                  <span
                    suppressHydrationWarning
                    className="bg-orange-500 text-white rounded-full px-2"
                  >
                    {cartQuantity}
                  </span>
                )}
              </Link>
              {session.status === "authenticated" ? (
                <div className="flex gap-8">
                  <Link
                    href={"/account"}
                    className="flex items-center gap-1 hover:text-orange-500"
                  >
                    <MdOutlineAccountCircle className="text-3xl" />
                    <p>Konto</p>
                  </Link>
                  <Button data-testid="logout-button" onClick={() => signOut()}>
                    Wyloguj się
                  </Button>
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
        <Suspense fallback={<LoadingSpinner />}>
          <MobileMenu
            isOpen={isMobileMenuOpen}
            toggleMobileMenu={toggleMobileMenu}
          />
        </Suspense>
      </Wrapper>
    </header>
  );
};

export default Header;
