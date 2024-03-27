"use client";
import FilterPanel from "./components/FilterPanel/FilterPanel";
import Wrapper from "../components/Wrapper";
import ProductsList from "./components/ProductsList/ProductsList";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Button from "../components/Button";

export type PriceSort = "asc" | "desc";

const ProductsPage = () => {
  const [priceSort, setPriceSort] = useState<PriceSort>("asc");
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const searchParams = useSearchParams();
  const [categories, setCategories] = useState([searchParams.get("category")]);
  const [shops, setShops] = useState([searchParams.get("shop")]);
  const [currentPage, setCurrentPage] = useState(1);
  const categoryFromParameter = searchParams.get("category");
  const shopFromParameter = searchParams.get("shop");
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < window.innerHeight
  );

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
      if (window.innerWidth < 768) {
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

        {showFilterPanel && (
          <FilterPanel
            changePriceSort={changePriceSort}
            priceSort={priceSort}
            categories={categories}
            shops={shops}
            onFilterChange={applyFilter}
            setFirstCurrentPage={setFirstCurrentPage}
            toggleMobileFilterPanel={toggleMobileFilterPanel}
          />
        )}
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
