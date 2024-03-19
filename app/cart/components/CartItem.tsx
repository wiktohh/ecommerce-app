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

interface CartItemProps {
  item: ProductWithQuantity;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useDispatch();

  const removeFromCartHandler = (name: string) => {
    dispatch(removeFromCart(name));
  };

  return (
    <div className="bg-orange-100 rounded-2xl flex justify-between items-center h-40 p-4 mb-4">
      <img
        src={item.image}
        className="w-32 h-32 border-4 border-orange-400"
        alt="product image"
      />
      <span className="w-1/3 text-center">{item.name}</span>
      <div className="flex w-1/4 items-center gap-1">
        <button onClick={() => dispatch(decreaseQuantity(item.name))}>
          <CiCircleMinus className="text-3xl hover:text-orange-600" />
        </button>
        <span>Ilość: {item.quantity}</span>
        <button onClick={() => dispatch(increaseQuantity(item.name))}>
          <CiCirclePlus className="text-3xl hover:text-orange-600" />
        </button>
      </div>
      <div className="h-full w-1/7 flex flex-col justify-between items-end">
        <span>Cena: {item.price}zł</span>
        <button onClick={() => removeFromCartHandler(item.name)}>
          <FaTrash className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
