import Wrapper from "./components/Wrapper";
import { FaFaceSadTear } from "react-icons/fa6";

const NotFound = () => {
  return (
    <Wrapper>
      <div className="flex justify-center items-center py-16 text-xl">
        <h2 className="border-r-2 border-black pr-2">404</h2>
        <p className="pl-2">Page not found</p>
      </div>
    </Wrapper>
  );
};

export default NotFound;
