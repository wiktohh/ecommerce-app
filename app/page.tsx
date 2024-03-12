import Image from "next/image";
import Header from "./components/Header/Header";
import PopularProducts from "./components/PopularProducts/PopularProducts";

export default function Home() {
  return (
    <div>
      <Header />
      <PopularProducts />
    </div>
  );
}
