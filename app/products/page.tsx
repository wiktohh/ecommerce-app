"use client";
import FilterPanel from "./components/FilterPanel/FilterPanel";
import Wrapper from "../components/Wrapper";
import ProductsList from "./components/ProductsList/ProductsList";
import { Suspense, useEffect, useState } from "react";
import Button from "../components/Button";
import LoadingSpinner from "../components/LoadingSpinner";
import MobileFilterPanel from "./components/FilterPanel/MobileFilterPanel";
import { useSearchParams } from "next/navigation";

export type PriceSort = "asc" | "desc";

const ProductsPage = () => {
  const searchParams = useSearchParams();

  const [priceSort, setPriceSort] = useState<PriceSort>("asc");
  const [showMobileFilterPanel, setShowMobileFilterPanel] = useState(false);

  const [categories, setCategories] = useState<(string | null)[]>([
    searchParams.get("category"),
  ]);
  const [shops, setShops] = useState<(string | null)[]>([
    searchParams.get("shop"),
  ]);
  const [currentPage, setCurrentPage] = useState(1);

  const changePriceSort = (value: PriceSort) => {
    setPriceSort(value);
  };

  useEffect(() => {
    setCategories([searchParams.get("category")]);
    setShops([searchParams.get("shop")]);
  }, [searchParams]);

  const applyFilter = (
    categories: (string | null)[],
    shops: (string | null)[]
  ) => {
    setCategories(categories);
    setShops(shops);
  };

  return (
    <Wrapper>
      <div className="flex flex-col md:flex-row w-100 my-8">
        <div className="block w-1/3 md:hidden">
          <Button
            fullWidth={true}
            onClick={() => {
              setShowMobileFilterPanel(true);
            }}
          >
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
              setFirstCurrentPage={() => {
                setCurrentPage(1);
              }}
            />
          </div>
          <div className="w-1/6 block md:hidden">
            <MobileFilterPanel
              changePriceSort={changePriceSort}
              priceSort={priceSort}
              categories={categories}
              shops={shops}
              onFilterChange={applyFilter}
              setFirstCurrentPage={() => {
                setCurrentPage(1);
              }}
              closePanel={() => {
                setShowMobileFilterPanel(false);
              }}
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
