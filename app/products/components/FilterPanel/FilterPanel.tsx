"use client";
import Button from "@/app/components/Button";
import { filterOptions } from "./constants";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PriceSort } from "../../page";

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

  const handleFilter = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string | PriceSort
  ) => {
    if ((e.target.type === "radio" && value === "asc") || value === "desc") {
      changePriceSort(value);
      return;
    } else if (shopsOptions.includes(value)) {
      if (shops.includes(value)) {
        setShops(shops.filter((shop) => shop !== value));
      } else {
        setShops([...shops, value]);
      }
    } else {
      if (categories.includes(value)) {
        setCategories(categories.filter((category) => category !== value));
      } else {
        setCategories([...categories, value]);
      }
    }
  };

  useEffect(() => {
    console.log(categories);
    console.log(priceSort);
  }, [categories, priceSort]);

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
                      shops.includes(option.value) ||
                      categoryFromParameter === option.value ||
                      shopFromParameter === option.value
                    : priceSort === option.value
                }
                onChange={(e) => handleFilter(e, option.value)}
                type={filterOption.type}
                value={option.value}
                id={option.label}
              />
              <label htmlFor={option.label}>{option.label}</label>
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
