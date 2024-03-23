"use client";

import { useSession } from "next-auth/react";
import Wrapper from "../components/Wrapper";
import AccountMenu from "./components/AccountMenu";

const AccountPage = () => {
  const session = useSession();

  console.log(session);

  return (
    <Wrapper>
      <div className="flex py-12 gap-12">
        <AccountMenu />
        <div>
          <h2 className="text-2xl pb-4">Twoje konto</h2>
          <div>Twoje imię: {session.data?.user?.name}</div>
          <div>Twój email: {session.data?.user?.email}</div>
        </div>
      </div>
    </Wrapper>
  );
};

export default AccountPage;
