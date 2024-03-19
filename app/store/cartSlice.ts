"use client";
import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: JSON.parse(localStorage.getItem("cart")) || [],
  },
  reducers: {
    addToCart: (state, action) => {
      const { name } = action.payload;
      const product = state.value.find((item) => item.name === name);
      if (product) {
        product.quantity += 1;
      } else {
        state.value.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.value));
    },
    removeFromCart: (state, action) => {
      state.value = state.value.filter((item) => item.name !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.value));
    },
    increaseQuantity: (state, action) => {
      const product = state.value.find((item) => item.name === action.payload);
      if (product) {
        product.quantity += 1;
      }
      localStorage.setItem("cart", JSON.stringify(state.value));
    },
    decreaseQuantity: (state, action) => {
      const product = state.value.find((item) => item.name === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
      localStorage.setItem("cart", JSON.stringify(state.value));
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;
