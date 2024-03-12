import Image from "next/image";
import Header from "./components/Header/Header";
import PopularProducts from "./components/PopularProducts/PopularProducts";
import ShopList from "./components/ShopList/ShopList";
import DiscountCodeElement from "./components/DiscountCodeElement";

export default function Home() {
  return (
    <div>
      <Header />
      <ShopList />
      <PopularProducts />
      <DiscountCodeElement />
    </div>
  );
}
