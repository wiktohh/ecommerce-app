import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
  };

  return (
    <Slider {...settings}>
      {products.map((product) => (
        <div key={product.id}>
          <img src={product.image} alt={product.name} />
          <p>{product.name}</p>
          <p>{product.price}</p>
        </div>
      ))}
    </Slider>
  );
};

export default ProductsSlider;
