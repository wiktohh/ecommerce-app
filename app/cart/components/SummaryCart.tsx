"use client";
import Button from "@/app/components/Button";
import { RootState } from "@/app/store/store";
import { ProductWithQuantity } from "@/app/types/types";
import { useAxios } from "@/app/hooks/use-axios";
import axios, { AxiosRequestConfig } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetCart } from "@/app/store/cartSlice";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";

const SummaryCart = () => {
  const [publishStripeKey, setPublishStripeKey] = useState("");
  const session = useSession();
  const email = session.data?.user?.email;
  const dispatch = useDispatch();

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

  const cart = useSelector((state: RootState) => state.cart.value);

  console.log(cart);

  const getTotalPrice = () => {
    return (
      cart &&
      cart
        .reduce(
          (acc: number, item: ProductWithQuantity) =>
            acc + item.price * item.quantity,
          0
        )
        .toFixed(2)
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
        toast.success("Kod rabatowy został zastosowany");
      } else {
        toast.error("Kod rabatowy jest nieprawidłowy");
      }
    });
  };

  const handlePaymentButtonClick = async () => {
    if (checkIfUserIsLogged()) {
      const stripe = await loadStripe(publishStripeKey);

      console.log("cart", cart);
      console.log("deliveryPrice", deliveryPrice);

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
      const result = await stripe?.redirectToCheckout({
        sessionId: session.id,
      });
      if (result && !result.error) {
        dispatch(resetCart());
        localStorage.removeItem("cart");
      }
    } else {
      router.push("/auth");
    }
  };

  return (
    <div className="min-w-max w-2/3 md:w-1/3 h-max bg-orange-100 rounded-xl p-4">
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
        <p>{(Number(getTotalPrice()) + deliveryPrice).toFixed(2)} zł</p>
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
