import Wrapper from "../Wrapper";
import Searchbar from "./Searchbar";
import { MdOutlineAccountCircle } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import NavLinks from "./NavLinks";

const Header = () => {
  return (
    <header className="w-full h-full bg-red-400">
      <Wrapper>
        <div className="w-full flex flex-col justify-between p-4">
          <div className="h-1/2 flex justify-between items-center">
            <h1>Ecommerce App</h1>
            <Searchbar />
            <div className="flex gap-8">
              <div className="flex items-center gap-1">
                <MdOutlineAccountCircle className="text-3xl" />
                <p>Konto</p>
              </div>
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
