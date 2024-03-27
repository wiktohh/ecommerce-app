export interface ProductInterface {
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface ProductWithQuantity extends ProductInterface {
  quantity: number;
}

export interface OrderProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}
