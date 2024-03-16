import FilterPanel from "./components/FilterPanel/FilterPanel";
import Wrapper from "../components/Wrapper";

const ProductsPage = () => {
  return (
    <Wrapper>
      <div className="flex w-100 my-8">
        <FilterPanel />
        <div
          className="w-5/6
        bg-green-400"
        >
          xd
        </div>
      </div>
    </Wrapper>
  );
};

export default ProductsPage;
