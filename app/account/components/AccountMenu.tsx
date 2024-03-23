import Link from "next/link";

const AccountMenu = () => {
  const links = [
    { name: "Informacje o koncie", path: "/account" },
    { name: "Zmień hasło", path: "/account/password" },
    { name: "Historia zamówień", path: "/account/orders" },
  ];

  return (
    <div className="flex flex-col gap-2">
      {links.map((link) => (
        <Link key={link.name} href={link.path}>
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default AccountMenu;
