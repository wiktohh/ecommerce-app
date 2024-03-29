"use client";
import { createSlice } from "@reduxjs/toolkit";
import { ProductWithQuantity } from "../types/types";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: [] as ProductWithQuantity[],
  },
  reducers: {
    inicializeCart: (state, action) => {
      state.value = action.payload;
    },
    addToCart: (state, action) => {
      const { name } = action.payload;
      const product = state.value.find(
        (item: ProductWithQuantity) => item.name === name
      );
      if (product) {
        product.quantity += 1;
      } else {
        state.value.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.value));
    },
    removeFromCart: (state, action) => {
      state.value = state.value.filter(
        (item: ProductWithQuantity) => item.name !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify(state.value));
    },
    increaseQuantity: (state, action) => {
      const product = state.value.find(
        (item: ProductWithQuantity) => item.name === action.payload
      );
      if (product) {
        product.quantity += 1;
      }
      localStorage.setItem("cart", JSON.stringify(state.value));
    },
    decreaseQuantity: (state, action) => {
      const product = state.value.find(
        (item: ProductWithQuantity) => item.name === action.payload
      );
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
      localStorage.setItem("cart", JSON.stringify(state.value));
    },
    resetCart: (state) => {
      state.value = [];
      localStorage.setItem("cart", JSON.stringify(state.value));
    },
    numberOfItems: (state) => {
      state.value.reduce(
        (acc: number, item: ProductWithQuantity) => acc + item.quantity,
        0
      );
    },
  },
});

export const {
  numberOfItems,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  resetCart,
  inicializeCart,
} = cartSlice.actions;
