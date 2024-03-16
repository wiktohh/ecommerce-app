"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Product from "./Product";
import { collectGenerateParams } from "next/dist/build/utils";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const response = await axios.get("/api/products");
      const data = await response.data;
      setProducts(data);
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <div className="w-5/6">
      <h2>Lista produktów: </h2>
      <div>
        {isLoading ? (
          <div>Loading</div>
        ) : (
          <div className="flex flex-wrap gap-16">
            {products.map((product, idx) => (
              <Product key={idx} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
