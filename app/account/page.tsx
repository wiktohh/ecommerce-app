"use client";

import { useSession } from "next-auth/react";
import Wrapper from "../components/Wrapper";
import AccountMenu from "./components/AccountMenu";

const AccountPage = () => {
  const session = useSession();

  console.log(session);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Twoje konto</h2>
      <div>Twoje imię: {session.data?.user?.name}</div>
      <div>Twój email: {session.data?.user?.email}</div>
    </div>
  );
};

export default AccountPage;
