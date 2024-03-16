"use client";
import { useEffect, useState } from "react";
import Wrapper from "../Wrapper";
import ProductsSlider from "./ProductsSlider";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";

const PopularProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      setIsLoading(true);
      const response = await axios.get("/api/products/popular");
      const data = await response.data;
      setProducts(data);
      setIsLoading(false);
    };

    fetchPopularProducts();
  }, []);

  return (
    <Wrapper>
      <div className="pt-24">
        <h3>Najpopularniejsze produkty</h3>
        <p className="text-gray-400">wybierane przez klientow</p>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <LoadingSpinner />
        </div>
      ) : (
        <ProductsSlider products={products} />
      )}
    </Wrapper>
  );
};

export default PopularProducts;
