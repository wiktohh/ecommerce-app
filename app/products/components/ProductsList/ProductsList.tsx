"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Product from "./Product";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import Button from "@/app/components/Button";
import Select from "@/app/components/Select";
import { itemsPerPageOptions } from "./constants";

interface ProductListProps {
  priceSort: "asc" | "desc";
  categories: (string | null)[];
  shops: (string | null)[];
}

const ProductsList: React.FC<ProductListProps> = ({
  priceSort,
  categories,
  shops,
}) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  useEffect(() => {
    const fetchProducts = async () => {
      console.log("shops", shops.join("-"));
      console.log("categories", categories.join("-"));
      const response = await axios.get(
        `/api/products?page=${currentPage}&limit=${itemsPerPage}&sort=${priceSort}&shop=${shops.join(
          "-"
        )}&category=${categories.join("-")}`
      );
      const data = await response.data;
      setProducts(data.products);
      setTotalProducts(data.productsLength);
      setIsLoading(false);
    };
    fetchProducts();
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

  return (
    <div className="w-5/6">
      <div className="flex justify-between mt-4 mb-2">
        <h2 className="text-xl">Lista produktów: </h2>

        <Select
          label="Wybierz ilość produktów"
          onChange={handleSelectChange}
          selectedValue="10"
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
            <h3 className="text-xl text-center">Brak produktów</h3>
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
