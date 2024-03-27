"use client";
import FilterPanel from "./components/FilterPanel/FilterPanel";
import Wrapper from "../components/Wrapper";
import ProductsList from "./components/ProductsList/ProductsList";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Button from "../components/Button";

export type PriceSort = "asc" | "desc";

const ProductsPage = () => {
  const [priceSort, setPriceSort] = useState<PriceSort>("asc");
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  let categoryFromParameter: string | null = null;
  let shopFromParameter: string | null = null;

  const sendParamsToParent = (
    category: string | null,
    shop: string | null,
    categories: (string | null)[],
    shops: (string | null)[]
  ) => {
    if (category) {
      categoryFromParameter = category;
    }
    if (shop) {
      shopFromParameter = shop;
    }
    if (categories) {
      setCategories(categories);
    }
    if (shops) {
      setShops(shops);
    }
  };

  const [categories, setCategories] = useState<(string | null)[]>([]);
  const [shops, setShops] = useState<(string | null)[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < window.innerHeight);
    }
  }, []);

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
    if (isMobile) {
      setShowFilterPanel(false);
    }
  };

  const setFirstCurrentPage = () => {
    setCurrentPage(1);
  };

  const toggleMobileFilterPanel = () => {
    setShowFilterPanel((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined" && window.innerWidth < 768) {
        setShowFilterPanel(false);
      } else {
        setShowFilterPanel(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Wrapper>
      <div className="flex flex-col md:flex-row w-100 my-8">
        <div className="block w-1/3 md:hidden">
          <Button fullWidth={true} onClick={toggleMobileFilterPanel}>
            Filtry
          </Button>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          {showFilterPanel && (
            <FilterPanel
              changePriceSort={changePriceSort}
              priceSort={priceSort}
              categories={categories}
              shops={shops}
              onFilterChange={applyFilter}
              setFirstCurrentPage={setFirstCurrentPage}
              toggleMobileFilterPanel={toggleMobileFilterPanel}
              sendParamsToParent={sendParamsToParent}
            />
          )}
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
