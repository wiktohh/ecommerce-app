"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const AccountMenu = () => {
  const links = [
    { name: "Informacje o koncie", path: "/account" },
    { name: "Zmień hasło", path: "/account/password" },
    { name: "Historia zamówień", path: "/account/orders" },
  ];

  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-2 w-1/4">
      {links.map((link) => (
        <Link key={link.name} href={link.path}>
          <span
            className={`${
              pathname === link.path && "font-semibold"
            } hover:text-red-500`}
          >
            {link.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default AccountMenu;
