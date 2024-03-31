"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FcCancel } from "react-icons/fc";

const CancelPaymentPage = () => {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const sessionID = params.get("sessionId");
    if (!sessionID) {
      router.push("/");
    }
  }, []);
  return (
    <div className="flex py-24 flex-col justify-start items-center">
      <FcCancel className="text-7xl text-red-500" />
      <h2 className="text-5xl text-red-500">Anulowano platność</h2>
    </div>
  );
};

export default CancelPaymentPage;
