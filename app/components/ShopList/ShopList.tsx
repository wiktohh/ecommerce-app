import Image from "next/image";
import Wrapper from "../Wrapper";
import Biedronka from "@/public/images/biedronka.jpg";
import Lidl from "@/public/images/lidl.jpg";
import Kaufland from "@/public/images/kaufland.jpg";
import Link from "next/link";

const ShopList = () => {
  const tmpShops = [
    {
      id: 1,
      name: "biedronka",
      image: Biedronka,
    },
    {
      id: 2,
      name: "lidl",
      image: Lidl,
    },
    {
      id: 3,
      name: "kaufland",
      image: Kaufland,
    },
  ];

  return (
    <Wrapper>
      <h3 data-testid="shop-list-header" className="pt-12 md:pt-20 text-2xl">
        Dostępne sklepy
      </h3>
      <div className="pt-8 flex flex-col items-center gap-4 flex-wrap md:flex-row justify-around">
        {tmpShops.map((shop) => (
          <div data-testid="shop" key={shop.id} className="relative">
            <Link
              href={`/products?shop=${shop.name}`}
              className="cursor-pointer"
            >
              <Image
                width={350}
                height={350}
                className="rounded-2xl"
                src={shop.image}
                alt="Shop"
              />
              <div className="absolute inset-0 bg-black opacity-0 rounded-2xl transition-opacity hover:opacity-40" />
            </Link>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default ShopList;
