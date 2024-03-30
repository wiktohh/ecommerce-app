import { ProductInterface } from "@/app/types/types";
import Button from "../Button";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/store/cartSlice";
import toast from "react-hot-toast";
import Image from "next/image";

interface SearchedProductProps {
  product: ProductInterface;
}

const SearchedProduct: React.FC<SearchedProductProps> = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCartButtonClick = (product: ProductInterface) => {
    toast.success("Produkt dodany do koszyka");
    dispatch(
      addToCart({
        name: product.name,
        image: product.image,
        price: product.price,
      })
    );
  };

  return (
    <div
      data-testid="searched-item"
      className="flex bg-white w-full justify-between items-center py-4 z-50"
    >
      <Image src={product.image} alt={product.name} width={64} height={64} />
      <p>{product.name}</p>
      <p>{product.price} zł</p>
      <Button onClick={() => handleAddToCartButtonClick(product)}>
        <FaCartPlus className="text-2xl" />
      </Button>
    </div>
  );
};

export default SearchedProduct;
