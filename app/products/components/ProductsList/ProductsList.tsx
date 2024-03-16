"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Product from "./Product";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import Button from "@/app/components/Button";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [itemsPerPage] = useState(10);

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(
        `/api/products?page=${currentPage}&limit=${itemsPerPage}`
      );
      const data = await response.data;
      setProducts(data.popularProducts);
      setTotalProducts(data.productsLength);
      setIsLoading(false);
    };
    fetchProducts();
  }, [currentPage]);

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

  return (
    <div className="w-5/6">
      <h2 className="text-xl mt-4 mb-2">Lista produktów: </h2>
      <div>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <LoadingSpinner />
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
