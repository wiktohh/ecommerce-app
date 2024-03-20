"use client";
import Button from "@/app/components/Button";
import { RootState } from "@/app/store/store";
import { ProductWithQuantity } from "@/app/types/types";
import { useAxios } from "@/app/api/hooks/use-axios";
import axios, { AxiosRequestConfig } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";

const SummaryCart = () => {
  const cart = useSelector((state: RootState) => state.cart.value);
  const [publishStripeKey, setPublishStripeKey] = useState("");
  const session = useSession();

  useEffect(() => {
    const fetchStripeKey = async () => {
      const response = await axios.get("/api/config");
      setPublishStripeKey(response.data);
    };
    fetchStripeKey();
  }, []);

  const checkIfUserIsLogged = () => {
    if (session.status === "authenticated") {
      return true;
    }
    return false;
  };

  const [discountCode, setDiscountCode] = useState("");
  const [deliveryPrice, setDeliveryPrice] = useState(10);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const inputRef = useRef(null);

  const router = useRouter();

  const getTotalPrice = () => {
    return cart.reduce(
      (acc: number, item: ProductWithQuantity) =>
        acc + item.price * item.quantity,
      0
    );
  };

  const checkIfDiscountCodeIsValid = () => {
    axios.post("/api/discount", { discountCode }).then((res) => {
      if (res.data.isValid) {
        setDeliveryPrice(0);
        if (inputRef.current) {
          (inputRef.current as HTMLInputElement).disabled = true;
        }
        setIsButtonDisabled(true);
      } else {
        alert("Kod rabatowy jest nieprawidłowy");
      }
    });
  };

  const handlePaymentButtonClick = async () => {
    if (checkIfUserIsLogged()) {
      const stripe = await loadStripe(publishStripeKey);

      const response = await axios.post(
        "/api/payments",
        { cart, deliveryPrice },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const session = await response.data;
      const result = stripe?.redirectToCheckout({
        sessionId: session.id,
      });
    } else {
      router.push("/auth");
    }
  };

  return (
    <div className="w-1/3 h-max bg-orange-100 rounded-xl p-4">
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
      <Button onClick={handlePaymentButtonClick} fullWidth={true}>
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
