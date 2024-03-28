"use client";
import { useEffect, useState } from "react";
import Wrapper from "../Wrapper";
import ProductsSlider from "./ProductsSlider";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";

const PopularProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      const response = await axios.get("/api/products/popular");
      const data = await response.data;
      setProducts(data);
      setIsLoading(false);
    };

    fetchPopularProducts();
  }, []);

  return (
    <Wrapper>
      <div className="pt-12 md:pt-24">
        <h3 className="text-xl">Najpopularniejsze produkty</h3>
        <p className="text-gray-400 text-lg mb-8">wybierane przez klientow</p>
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
