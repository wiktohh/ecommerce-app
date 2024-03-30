"use client";
// @ts-ignore
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Product from "@/app/products/components/ProductsList/Product";
import { useEffect, useState } from "react";

interface ProductsSliderProps {
  products: {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    category: string;
    shop: string;
  }[];
}

const ProductsSlider: React.FC<ProductsSliderProps> = ({ products }) => {
  const [slidesToShow, setSlidesToShow] = useState(5);

  const settings = {
    accessibility: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    arrows: true,
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesToShow(2);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(3);
      } else if (window.innerWidth < 1280) {
        setSlidesToShow(4);
      } else {
        setSlidesToShow(5);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Slider {...settings} className="w-4/5 mx-auto md:w-full cursor-grab">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </Slider>
  );
};

export default ProductsSlider;
