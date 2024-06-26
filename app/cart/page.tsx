"use client";
import { useDispatch, useSelector } from "react-redux";
("react-redux");
import CartItem from "./components/CartItem";
import SummaryCart from "./components/SummaryCart";
import { RootState } from "../store/store";
import { ProductWithQuantity } from "../types/types";

const CartPage = () => {
  const cart = useSelector((state: RootState) => state.cart.value);

  if (!cart || cart.length === 0) {
    return (
      <h3 className="text-3xl text-center py-16">Twój koszyk jest pusty</h3>
    );
  }

  return (
    <div
      data-testid="cart-page"
      className="w-full md:w-1/2 mx-auto flex flex-col lg:flex-row lg:justify-between items-center lg:items-start gap-8 my-8"
    >
      <div className="min-w-max w-2/3 flex flex-col justify-between items-center">
        {cart.map((item: ProductWithQuantity, idx: number) => (
          <CartItem item={item} key={idx} />
        ))}
      </div>
      <SummaryCart />
    </div>
  );
};

export default CartPage;
