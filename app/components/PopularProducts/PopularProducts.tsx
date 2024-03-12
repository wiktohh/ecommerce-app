"use client";
import Wrapper from "../Wrapper";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const temporaryProducts = [
  {
    id: 1,
    name: "Koszulka",
    price: 99,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Spodnie",
    price: 199,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Buty",
    price: 299,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Spodnica",
  },
];

const PopularProducts = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <Wrapper>
      <div>
        <h3>Najpopularniejsze produkty</h3>
        <p className="text-gray-400">wybierane przez klientow</p>
      </div>
      <Slider {...settings}>
        {temporaryProducts.map((product) => (
          <div className="bg-black" key={product.id}>
            <img src={product.image} alt={product.name} />
            <p>{product.name}</p>
            <p>{product.price}</p>
          </div>
        ))}
      </Slider>
    </Wrapper>
  );
};

export default PopularProducts;
