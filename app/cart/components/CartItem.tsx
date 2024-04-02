import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "@/app/store/cartSlice";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { useEffect } from "react";
import { ProductWithQuantity } from "@/app/types/types";
import toast from "react-hot-toast";
import Image from "next/image";

interface CartItemProps {
  item: ProductWithQuantity;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useDispatch();

  const removeFromCartHandler = (name: string) => {
    toast.success("Produkt usunięty z koszyka");
    dispatch(removeFromCart(name));
  };

  return (
    <div className="w-full bg-orange-100 rounded-2xl flex justify-between items-center h-40 p-4 mb-4">
      <Image
        src={item.image}
        width={128}
        height={128}
        className="border-4 border-orange-400"
        alt={`${item.name} image`}
      />
      <span className="w-1/4 text-sm px-2 md:text-base text-center">
        {item.name}
      </span>
      <div className="flex flex-col-reverse px-2 md:flex-row w-1/3 items-center gap-1">
        <button onClick={() => dispatch(decreaseQuantity(item.name))}>
          <CiCircleMinus className="text-3xl hover:text-orange-600" />
        </button>
        <span className="text-center">Ilość: {item.quantity}</span>
        <button onClick={() => dispatch(increaseQuantity(item.name))}>
          <CiCirclePlus className="text-3xl hover:text-orange-600" />
        </button>
      </div>
      <div className="h-full w-1/7 flex flex-col justify-between items-end">
        <span className="flex gap-1">
          <span className="hidden md:block">Cena: </span> {item.price}zł
        </span>
        <button
          data-testid="remove-btn"
          onClick={() => removeFromCartHandler(item.name)}
        >
          <FaTrash className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
