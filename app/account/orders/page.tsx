"use client";
import { useEffect, useState } from "react";
import AccountMenu from "../components/AccountMenu";
import { useSession } from "next-auth/react";
import axios from "axios";
import Wrapper from "@/app/components/Wrapper";
import Order from "./components/Order";
import { set } from "react-hook-form";
import LoadingSpinner from "@/app/components/LoadingSpinner";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const session = useSession();
  const [error, setError] = useState<string | null>(null);
  const email = session.data?.user?.email;

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        if (email) {
          const response = await axios.post(
            "/api/orders",
            { email },
            { headers: { "Content-Type": "application/json" } }
          );
          const data = await response.data;
          setOrders(data);
        }
        setIsLoading(false);
      } catch (error) {
        setError("Wystąpił błąd podczas pobierania historii zamówień");
      }
    };
    fetchOrders();
  }, [email]);

  if (isLoading) {
    return (
      <div className="w-full flex justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center text-xl mt-4">{error}</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="w-full mx-auto">
        <h2 className="text-2xl font-bold mb-6">Zamówienia</h2>
        <div className="flex justify-center">
          <p className="text-xl">Brak zamówień</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto">
      <h2 className="text-2xl font-bold mb-6">Zamówienia</h2>
      <div className="w-full mx-auto">
        {!isLoading &&
          orders.map((order: any) => <Order key={order.id} order={order} />)}
      </div>
    </div>
  );
};

export default OrdersPage;
