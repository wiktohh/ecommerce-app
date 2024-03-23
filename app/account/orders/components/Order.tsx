interface OrderProps {
  order: {
    id: number;
    createdAt: string;
    status: string;
    total: number;
    orderProducts: any[];
  };
}

const status: { [key: string]: string } = {
  paid: "Zapłacone",
};

const Order: React.FC<OrderProps> = ({ order }) => {
  return (
    <div key={order.id} className="w-full bg-white shadow-lg p-4 mb-4">
      <h3 className="text-xl text-center font-bold">Zamówienie #{order.id}</h3>
      <p className="text-sm text-gray-500">
        Data: {new Date(order.createdAt).toLocaleString()}
      </p>
      <p className="text-sm text-gray-500">Status: {status[order.status]}</p>
      <p className="text-sm text-gray-500">Cena: {order.total} PLN</p>
      <div className="mt-4">
        {order.orderProducts.map((product: any) => (
          <div key={product.id} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 object-cover"
              />
              <div>
                <h4 className="font-bold">{product.name}</h4>
                <p>{product.price} PLN</p>
                <p>Ilość: {product.quantity}</p>
              </div>
            </div>
            <p>{product.price * product.quantity} PLN</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
