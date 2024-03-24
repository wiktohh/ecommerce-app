"use client";
import { useDispatch, useSelector } from "react-redux";
("react-redux");
import CartItem from "./components/CartItem";
import SummaryCart from "./components/SummaryCart";
import { RootState } from "../store/store";
import { ProductWithQuantity } from "../types/types";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const CartPage = () => {
  const cart = useSelector((state: RootState) => state.cart.value);

  if (cart.length === 0) {
    return (
      <h2 className="text-3xl text-center py-16">Twój koszyk jest pusty</h2>
    );
  }

  return (
    <div className="w-full md:w-1/2 mx-auto flex flex-col md:flex-row md:justify-between items-center md:items-start gap-8 my-8">
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
