// @ts-ignore
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Product from "@/app/products/components/ProductsList/Product";

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
  const settings = {
    accessibility: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <Slider {...settings}>
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </Slider>
  );
};

export default ProductsSlider;
