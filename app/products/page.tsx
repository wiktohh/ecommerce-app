"use client";
import FilterPanel from "./components/FilterPanel/FilterPanel";
import Wrapper from "../components/Wrapper";
import ProductsList from "./components/ProductsList/ProductsList";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export type PriceSort = "asc" | "desc";

const ProductsPage = () => {
  const [priceSort, setPriceSort] = useState<PriceSort>("asc");

  const searchParams = useSearchParams();
  const [categories, setCategories] = useState([searchParams.get("category")]);
  const [shops, setShops] = useState([searchParams.get("shop")]);
  const [currentPage, setCurrentPage] = useState(1);
  const categoryFromParameter = searchParams.get("category");
  const shopFromParameter = searchParams.get("shop");

  console.log(categoryFromParameter, shopFromParameter);

  useEffect(() => {
    if (categoryFromParameter) {
      setCategories([categoryFromParameter]);
    }
    if (shopFromParameter) {
      setShops([shopFromParameter]);
    }
  }, [categoryFromParameter, shopFromParameter]);

  const changePriceSort = (value: PriceSort) => {
    setPriceSort(value);
  };

  const applyFilter = (
    categories: (string | null)[],
    shops: (string | null)[]
  ) => {
    setCategories(categories);
    setShops(shops);
  };

  const setFirstCurrentPage = () => {
    setCurrentPage(1);
  };

  console.log(categories);

  console.log(categories, shops);

  return (
    <Wrapper>
      <div className="flex w-100 my-8">
        <FilterPanel
          changePriceSort={changePriceSort}
          priceSort={priceSort}
          categories={categories}
          shops={shops}
          onFilterChange={applyFilter}
          setFirstCurrentPage={setFirstCurrentPage}
        />
        <ProductsList
          priceSort={priceSort}
          categories={categories}
          shops={shops}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </Wrapper>
  );
};

export default ProductsPage;
