import Wrapper from "../Wrapper";
import Searchbar from "./Searchbar";
import { MdOutlineAccountCircle } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import NavLinks from "./NavLinks";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full h-full bg-orange-100">
      <Wrapper>
        <div className="w-full flex flex-col justify-between py-4">
          <div className="h-1/2 flex justify-between items-center">
            <h1>Ecommerce App</h1>
            <Searchbar />
            <div className="flex gap-8">
              <Link
                href={"/auth"}
                className="flex items-center gap-1 hover:text-orange-500"
              >
                <MdOutlineAccountCircle className="text-3xl" />
                <p>Konto</p>
              </Link>
              <div className="flex items-center gap-1">
                <FiShoppingCart className="text-2xl" />
                <p>Koszyk</p>
              </div>
            </div>
          </div>
        </div>
        <NavLinks />
      </Wrapper>
    </header>
  );
};

export default Header;
