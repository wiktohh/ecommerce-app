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
  const email = session.data?.user?.email;

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
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
    };
    fetchOrders();
  }, [email]);

  return (
    <div className="w-full mx-auto">
      <h2 className="text-2xl font-bold mb-6">Zamówienia</h2>
      {isLoading && (
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      )}
      <div className="w-full mx-auto">
        {!isLoading &&
          orders.map((order: any) => <Order key={order.id} order={order} />)}
      </div>
    </div>
  );
};

export default OrdersPage;
