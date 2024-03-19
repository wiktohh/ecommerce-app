"use client";
import { useDispatch, useSelector } from "react-redux";
("react-redux");
import CartItem from "./components/CartItem";
import SummaryCart from "./components/SummaryCart";

const CartPage = () => {
  const cart = useSelector((state) => state.cart.value);

  if (cart.length === 0) {
    return (
      <h2 className="text-3xl text-center py-16">Twój koszyk jest pusty</h2>
    );
  }

  return (
    <div className="w-1/2 mx-auto flex justify-between gap-8 my-8">
      <div className="min-w-max w-2/3">
        {cart.map((item, idx) => (
          <CartItem item={item} key={idx} />
        ))}
      </div>
      <SummaryCart />
    </div>
  );
};

export default CartPage;
