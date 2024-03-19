export const filterOptions = [
  {
    type: "radio",
    label: "Cena",
    value: "price",
    options: [
      { label: "Od najniższej", value: "asc" },
      { label: "Od najwyższej", value: "desc" },
    ],
  },
  {
    type: "checkbox",
    label: "Kategorie",
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
    label: "Sklepy",
    value: "shop",
    options: [
      { label: "Wszystkie", value: "allShops" },
      { label: "Biedronka", value: "biedronka" },
      { label: "Lidl", value: "lidl" },
      { label: "Kaufland", value: "kaufland" },
    ],
  },
];
