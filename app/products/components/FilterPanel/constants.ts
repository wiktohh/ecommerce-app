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
    type: "radio",
    label: "Name",
    value: "Name",
    options: [
      { label: "A to Z", value: "asc" },
      { label: "Z to A", value: "desc" },
    ],
  },
  {
    type: "checkbox",
    label: "Category",
    value: "category",
    options: [
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
      { label: "Biedronka", value: "biedronka" },
      { label: "Lidl", value: "lidl" },
      { label: "Kaufland", value: "kaufland" },
    ],
  },
];
