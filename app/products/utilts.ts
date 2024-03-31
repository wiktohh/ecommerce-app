import { filterOptions } from "./components/FilterPanel/constants";
import { PriceSort } from "./page";

const toggleArrayItem = (array: (string | null)[], item: string | null) => {
  return array.includes(item)
    ? array.filter((i) => i !== item)
    : [...array, item];
};

export const handleFilter = (
  value: string | PriceSort,
  localCategories: (string | null)[],
  localShops: (string | null)[],
  setLocalCategories: (categories: (string | null)[]) => void,
  setLocalShops: (shops: (string | null)[]) => void,
  changePriceSort: (value: PriceSort) => void,
  setFirstCurrentPage: () => void,
  shopsOptions: string[]
) => {
  const allCategories = filterOptions[1].options.map((option) => option.value);
  const allShops = [...shopsOptions, "allShops"];
  setFirstCurrentPage();

  if (value === "asc" || value === "desc") {
    changePriceSort(value);
    return;
  }

  if (value === "allCategories") {
    setLocalCategories(
      localCategories.length === filterOptions[1].options.length
        ? []
        : allCategories
    );
  } else if (
    localShops.length === shopsOptions.length + 1 &&
    value !== "allShops" &&
    shopsOptions.includes(value)
  ) {
    setLocalShops(
      localShops.filter((shop) => shop !== "allShops" && shop !== value)
    );
  } else if (
    localCategories.length === filterOptions[1].options.length &&
    value !== "allCategories" &&
    filterOptions[1].options.map((option) => option.value).includes(value)
  ) {
    setLocalCategories(
      localCategories.filter(
        (category) => category !== "allCategories" && category !== value
      )
    );
  } else if (value === "allShops") {
    setLocalShops(
      localShops.length === shopsOptions.length + 1 ? [] : allShops
    );
  } else if (value === "asc" || value === "desc") {
    changePriceSort(value);
  } else if (shopsOptions.includes(value)) {
    setLocalShops(toggleArrayItem(localShops, value));
  } else {
    setLocalCategories(toggleArrayItem(localCategories, value));
  }
};
