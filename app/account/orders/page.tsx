"use client";
import { useEffect, useState } from "react";
import AccountMenu from "../components/AccountMenu";
import { useSession } from "next-auth/react";
import axios from "axios";
import Wrapper from "@/app/components/Wrapper";
import Order from "./components/Order";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const session = useSession();
  const email = session.data?.user?.email;

  useEffect(() => {
    const fetchOrders = async () => {
      if (email) {
        const response = await axios.post(
          "/api/orders",
          { email },
          { headers: { "Content-Type": "application/json" } }
        );
        const data = await response.data;
        setOrders(data);
      }
    };
    fetchOrders();
  }, [email]);

  return (
    <Wrapper>
      <div className="py-12 flex justify-between">
        <AccountMenu />
        <div className="w-4/5">
          <h2 className="text-2xl font-bold mb-6">Zamówienia</h2>
          <div className="w-full mx-auto">
            {orders.map((order: any) => (
              <Order key={order.id} order={order} />
            ))}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default OrdersPage;
