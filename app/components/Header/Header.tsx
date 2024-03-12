import Wrapper from "../Wrapper";
import Searchbar from "./Searchbar";
import { MdOutlineAccountCircle } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";

const Header = () => {
  return (
    <header className="w-full h-32 bg-red-400">
      <Wrapper>
        <div className="flex justify-between items-center h-1/2">
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
        <div></div>
      </Wrapper>
    </header>
  );
};

export default Header;
