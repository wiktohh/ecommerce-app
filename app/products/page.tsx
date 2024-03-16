import FilterPanel from "./components/FilterPanel/FilterPanel";
import Wrapper from "../components/Wrapper";
import ProductsList from "./components/ProductsList/ProductsList";

const ProductsPage = () => {
  return (
    <Wrapper>
      <div className="flex w-100 my-8">
        <FilterPanel />
        <ProductsList />
      </div>
    </Wrapper>
  );
};

export default ProductsPage;
