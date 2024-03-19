"use client";
import Button from "@/app/components/Button";
import { filterOptions } from "./constants";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PriceSort } from "../../page";
import { set } from "react-hook-form";

interface FilterPanelProps {
  changePriceSort: (value: PriceSort) => void;
  priceSort: PriceSort;
  categories: (string | null)[];
  shops: (string | null)[];
  onFilterChange: (
    categories: (string | null)[],
    shops: (string | null)[]
  ) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  changePriceSort,
  priceSort,
  onFilterChange,
}) => {
  const shopsOptions = ["biedronka", "lidl", "kaufland"];

  const [categories, setCategories] = useState<(string | null)[]>([]);
  const [shops, setShops] = useState<(string | null)[]>([]);

  const searchParams = useSearchParams();
  const categoryFromParameter = searchParams.get("category");
  const shopFromParameter = searchParams.get("shop");

  // to refactor some day XD
  const handleFilter = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string | PriceSort
  ) => {
    const allCategories = filterOptions[1].options.map(
      (option) => option.value
    );
    const allShops = [...shopsOptions, "allShops"];

    if (value === "allCategories") {
      setCategories(
        categories.length === filterOptions[1].options.length
          ? []
          : allCategories
      );
    } else if (
      shops.length === shopsOptions.length + 1 &&
      value !== "allShops" &&
      shopsOptions.includes(value)
    ) {
      setShops(shops.filter((shop) => shop !== "allShops" && shop !== value));
    } else if (
      categories.length === filterOptions[1].options.length &&
      value !== "allCategories" &&
      filterOptions[1].options.map((option) => option.value).includes(value)
    ) {
      setCategories(
        categories.filter(
          (category) => category !== "allCategories" && category !== value
        )
      );
    } else if (value === "allShops") {
      setShops(shops.length === shopsOptions.length + 1 ? [] : allShops);
    } else if (value === "asc" || value === "desc") {
      changePriceSort(value);
    } else if (shopsOptions.includes(value)) {
      setShops(toggleArrayItem(shops, value));
    } else {
      setCategories(toggleArrayItem(categories, value));
    }
  };

  const toggleArrayItem = (array: (string | null)[], item: string | null) => {
    return array.includes(item)
      ? array.filter((i) => i !== item)
      : [...array, item];
  };

  useEffect(() => {
    if (categoryFromParameter) {
      setCategories([categoryFromParameter]);
    }
    if (shopFromParameter) {
      setShops([shopFromParameter]);
    }
  }, [categoryFromParameter, shopFromParameter]);

  return (
    <div className="w-1/6">
      {filterOptions.map((filterOption) => (
        <div key={filterOption.value}>
          <h4 className="text-xl mt-4 mb-2">{filterOption.label}</h4>
          {filterOption.options.map((option) => (
            <div key={option.value} className="flex gap-2">
              <input
                name={filterOption.value}
                checked={
                  filterOption.type === "checkbox"
                    ? categories.includes(option.value) ||
                      shops.includes(option.value)
                    : priceSort === option.value
                }
                onChange={(e) => handleFilter(e, option.value)}
                type={filterOption.type}
                value={option.value}
                id={option.value}
              />
              <label htmlFor={option.value}>{option.label}</label>
            </div>
          ))}
        </div>
      ))}
      <div className="w-1/2 my-4">
        <Button
          fullWidth={true}
          onClick={() => onFilterChange(categories, shops)}
        >
          <span className="text-base">Filtruj</span>
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;
