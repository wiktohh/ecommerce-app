"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { use, useEffect } from "react";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import { resetCart } from "../store/cartSlice";
const SuccessPaymentPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useSearchParams();

  useEffect(() => {
    const sessionID = params.get("sessionId");
    if (!sessionID) {
      router.push("/");
    } else {
      dispatch(resetCart());
    }
  }, []);
  return (
    <div className="flex py-24 flex-col justify-start items-center">
      <IoMdCheckmarkCircle className="text-7xl text-green-500" />
      <h2 className="text-5xl text-green-500">Płatność zaakceptowana</h2>
    </div>
  );
};

export default SuccessPaymentPage;
