import Wrapper from "../Wrapper";

const ShopList = () => {
  const tmpShops = [
    {
      id: 1,
      name: "Shop 1",
      location: "Location 1",
      description: "Description 1",
      image: "Image 1",
    },
    {
      id: 2,
      name: "Shop 2",
      location: "Location 2",
      description: "Description 2",
      image: "Image 2",
    },
    {
      id: 3,
      name: "Shop 3",
      location: "Location 3",
      description: "Description 3",
      image: "Image 3",
    },
  ];

  return (
    <Wrapper>
      <h3>Dostępne sklepy</h3>
      <div className="flex justify-around">
        {tmpShops.map((shop) => (
          <div key={shop.id}>
            <p>{shop.name}</p>
            <p>{shop.location}</p>
            <p>{shop.description}</p>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default ShopList;
