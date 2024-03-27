import React from "react";
import Wrapper from "@/app/components/Wrapper";
import AccountMenu from "./components/AccountMenu";

interface AccountLayoutProps {
  children: React.ReactNode;
}

const AccountLayout: React.FC<AccountLayoutProps> = ({ children }) => {
  return (
    <Wrapper>
      <div className="flex flex-col md:flex-row py-12">
        <AccountMenu />
        {children}
      </div>
    </Wrapper>
  );
};

export default AccountLayout;
