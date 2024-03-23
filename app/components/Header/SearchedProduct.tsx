import { Product } from "@/app/types/types";
import Button from "../Button";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/store/cartSlice";

interface SearchedProductProps {
  product: Product;
}

const SearchedProduct: React.FC<SearchedProductProps> = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCartButtonClick = (product: Product) => {
    dispatch(
      addToCart({
        name: product.name,
        image: product.image,
        price: product.price,
      })
    );
  };

  return (
    <div className="flex bg-white w-full justify-between items-center py-4 z-50">
      <img src={product.image} alt={product.name} className="w-16 h-16" />
      <p>{product.name}</p>
      <p>{product.price} zł</p>
      <Button onClick={() => handleAddToCartButtonClick(product)}>
        <FaCartPlus className="text-2xl" />
      </Button>
    </div>
  );
};

export default SearchedProduct;
