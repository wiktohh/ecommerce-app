"use client";
import FilterPanel from "./components/FilterPanel/FilterPanel";
import Wrapper from "../components/Wrapper";
import ProductsList from "./components/ProductsList/ProductsList";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export type PriceSort = "asc" | "desc";

const ProductsPage = () => {
  const [priceSort, setPriceSort] = useState<PriceSort>("asc");

  const [categories, setCategories] = useState([]);
  const [shops, setShops] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const categoryFromParameter = searchParams.get("category");
  const shopFromParameter = searchParams.get("shop");

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

  const applyFilter = (categories: string[], shops: string[]) => {
    setCategories(categories);
    setShops(shops);
  };

  console.log(categories);

  // const changeFilter = (value: string) => {
  //   if (!categories.includes(value)) {
  //     setCategories([...categories, value]);
  //   } else {
  //     setCategories(categories.filter((f) => f !== value));
  //   }
  // };

  // const changeShop = (value: string) => {
  //   if (!shops.includes(value)) {
  //     setShops([...shops, value]);
  //   } else {
  //     setShops(shops.filter((f) => f !== value));
  //   }
  // };

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
        />
        <ProductsList
          priceSort={priceSort}
          categories={categories}
          shops={shops}
        />
      </div>
    </Wrapper>
  );
};

export default ProductsPage;
