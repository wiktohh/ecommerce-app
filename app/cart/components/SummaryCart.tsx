"use client";
import Button from "@/app/components/Button";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";

const SummaryCart = () => {
  const cart = useSelector((state) => state.cart.value);

  const [discountCode, setDiscountCode] = useState("");
  const [deliveryPrice, setDeliveryPrice] = useState(10);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const inputRef = useRef(null);
  const buttonRef = useRef(null);

  const getTotalPrice = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const checkIfDiscountCodeIsValid = () => {
    if (discountCode.toLowerCase() === "FREEDELIVERY24".toLowerCase()) {
      setDeliveryPrice(0);
      if (inputRef.current) {
        (inputRef.current as HTMLInputElement).disabled = true;
      }
      setIsButtonDisabled(true);
    }
  };

  return (
    <div className="w-1/3 bg-orange-100 rounded-xl p-4">
      <h3 className="text-2xl pb-4">Podsumowanie</h3>
      <div className="flex justify-between">
        <p>Suma</p>
        <p>{getTotalPrice()} zł</p>
      </div>
      <div className="flex justify-between">
        <p>Dostawa</p>
        <p>{deliveryPrice} zł</p>
      </div>
      <div className="flex justify-between py-2">
        <p>Do zapłaty</p>
        <p>{getTotalPrice() + deliveryPrice} zł</p>
      </div>
      <Button onClick={checkIfDiscountCodeIsValid} fullWidth={true}>
        Zapłać
      </Button>

      <h3 className="text-2xl py-4">Kod rabatowy</h3>
      <input
        type="text"
        value={discountCode}
        ref={inputRef}
        onChange={(e) => setDiscountCode(e.target.value)}
        className="w-full border-2 border-gray-200 rounded-xl p-2 mb-4"
      />
      <Button
        disabled={isButtonDisabled}
        onClick={checkIfDiscountCodeIsValid}
        fullWidth={true}
      >
        Zastosuj kod
      </Button>
    </div>
  );
};

export default SummaryCart;
