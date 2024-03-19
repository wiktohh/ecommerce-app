export interface Product {
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface ProductWithQuantity extends Product {
  quantity: number;
}
