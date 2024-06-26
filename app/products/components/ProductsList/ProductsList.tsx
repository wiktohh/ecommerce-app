"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Product from "./Product";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import Button from "@/app/components/Button";
import Select from "@/app/components/Select";
import { itemsPerPageOptions } from "./constants";
import { useSearchParams } from "next/navigation";
import { set } from "react-hook-form";

interface ProductListProps {
  priceSort: "asc" | "desc";
  categories: (string | null)[];
  shops: (string | null)[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const ProductsList: React.FC<ProductListProps> = ({
  priceSort,
  categories,
  shops,
  currentPage,
  setCurrentPage,
}) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const url = `/api/products?page=${currentPage}&limit=${itemsPerPage}&sort=${priceSort}&shop=${shops.join(
          "-"
        )}&category=${categories.join("-")}`;
        const response = await axios.get(url);
        const data = await response.data;
        setTotalProducts(data.productsLength);
        setProducts(data.products);
        setIsLoading(false);
      } catch (error) {
        setError("Wystąpił błąd podczas pobierania produktów");
        setIsLoading(false);
      }
    };

    if (categories.length > 0 || shops.length > 0) {
      fetchProducts();
    }
  }, [currentPage, itemsPerPage, priceSort, categories, shops]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSelectChange = (value: string) => {
    setCurrentPage(1);
    setItemsPerPage(Number(value));
  };

  if (error) {
    return (
      <div className="text-red-500 text-center text-xl md:w-5/6 mt-4">
        {error}
      </div>
    );
  }

  return (
    <div className="md:w-5/6">
      <div className="flex justify-between mt-4 mb-2">
        <h2 className="text-xl">Lista produktów: </h2>

        <Select
          label="Wybierz ilość produktów"
          onChange={handleSelectChange}
          selectedValue={itemsPerPage.toString()}
          options={itemsPerPageOptions}
        />
      </div>
      <div>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <LoadingSpinner />
          </div>
        ) : products.length === 0 ? (
          <div>
            <h3 data-testid="no-products-info" className="text-xl text-center">
              Brak produktów
            </h3>
          </div>
        ) : (
          <>
            <div className="flex justify-center flex-wrap gap-16">
              {products.map((product, idx) => (
                <Product key={idx} product={product} />
              ))}
            </div>
            <div className="flex justify-center items-center mt-4">
              <Button onClick={handlePrevPage} disabled={currentPage === 1}>
                Poprzednia
              </Button>
              <span className="mx-4">
                {currentPage} z {totalPages}
              </span>
              <Button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Następna
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
