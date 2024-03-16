import Image from "next/image";
import { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import Button from "@/app/components/Button";

interface ProductProps {
  product: {
    name: string;
    description: string;
    price: number;
    image: string;
  };
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  return (
    <div
      className=" relative w-40 flex flex-col justify-between items-center p-4 border-2 border-gray-200 rounded-md"
      onMouseLeave={() => setIsButtonVisible(false)}
      onMouseEnter={() => setIsButtonVisible(true)}
    >
      {isButtonVisible && (
        <div className="absolute top-2 right-2">
          <Button>
            <FaCartPlus className="text-2xl" />
          </Button>
        </div>
      )}
      <img src={product.image} alt="product image" className="w-40" />
      <div>
        <h3>{product.name}</h3>
        <p>{product.price}</p>
      </div>
    </div>
  );
};

export default Product;