export const filterOptions = [
  {
    type: "radio",
    label: "Price",
    value: "price",
    options: [
      { label: "Low to High", value: "asc" },
      { label: "High to Low", value: "desc" },
    ],
  },
  {
    type: "checkbox",
    label: "Category",
    value: "category",
    options: [
      { label: "Wszystkie", value: "allCategories" },
      { label: "Napoje", value: "drinks" },
      { label: "Owoce", value: "fruits" },
      { label: "Warzywa", value: "vegetables" },
      { label: "Mięso", value: "meat" },
      { label: "Nabiał", value: "dairy" },
      { label: "Słodycze", value: "sweets" },
      { label: "Pieczywo", value: "bread" },
    ],
  },
  {
    type: "checkbox",
    label: "Shop",
    value: "shop",
    options: [
      { label: "Wszystkie", value: "allShops" },
      { label: "Biedronka", value: "biedronka" },
      { label: "Lidl", value: "lidl" },
      { label: "Kaufland", value: "kaufland" },
    ],
  },
];
