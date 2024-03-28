"use client";
import FilterPanel from "./components/FilterPanel/FilterPanel";
import Wrapper from "../components/Wrapper";
import ProductsList from "./components/ProductsList/ProductsList";
import { Suspense, useEffect, useState } from "react";
import Button from "../components/Button";
import LoadingSpinner from "../components/LoadingSpinner";
import MobileFilterPanel from "./components/FilterPanel/MobileFilterPanel";

export type PriceSort = "asc" | "desc";

const ProductsPage = () => {
  const [priceSort, setPriceSort] = useState<PriceSort>("asc");
  const [showMobileFilterPanel, setShowMobileFilterPanel] = useState(false);

  const [categoryFromParameter, setCategoryFromParameter] = useState<
    string | null
  >(null);
  const [shopFromParameter, setShopFromParameter] = useState<string | null>(
    null
  );

  const sendParamsToParent = (
    category: string | null,
    shop: string | null,
    categories: (string | null)[],
    shops: (string | null)[]
  ) => {
    if (category) {
      setCategoryFromParameter(category);
    }
    if (shop) {
      setShopFromParameter(shop);
    }
    if (categories) {
      setCategories(categories);
    }
    if (shops) {
      setShops(shops);
    }
  };

  console.log(priceSort);

  const [categories, setCategories] = useState<(string | null)[]>([]);
  const [shops, setShops] = useState<(string | null)[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

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

  const openPanel = () => {
    setShowMobileFilterPanel(true);
  };

  const closePanel = () => {
    setShowMobileFilterPanel(false);
  };

  return (
    <Wrapper>
      <div className="flex flex-col md:flex-row w-100 my-8">
        <div className="block w-1/3 md:hidden">
          <Button fullWidth={true} onClick={openPanel}>
            Filtry
          </Button>
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          <div className="w-1/6 hidden md:block">
            <FilterPanel
              changePriceSort={changePriceSort}
              priceSort={priceSort}
              categories={categories}
              shops={shops}
              onFilterChange={applyFilter}
              setFirstCurrentPage={setFirstCurrentPage}
              sendParamsToParent={sendParamsToParent}
            />
          </div>
          <div className="w-1/6 block md:hidden">
            <MobileFilterPanel
              changePriceSort={changePriceSort}
              priceSort={priceSort}
              categories={categories}
              shops={shops}
              onFilterChange={applyFilter}
              setFirstCurrentPage={setFirstCurrentPage}
              closePanel={closePanel}
              sendParamsToParent={sendParamsToParent}
              showFilterPanel={showMobileFilterPanel}
            />
          </div>
          <ProductsList
            priceSort={priceSort}
            categories={categories}
            shops={shops}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Suspense>
      </div>
    </Wrapper>
  );
};

export default ProductsPage;
