"use client";
import Button from "@/app/components/Button";
import { filterOptions, shopsOptions } from "./constants";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PriceSort } from "../../page";
import { handleFilter } from "../../utilts";

interface FilterPanelProps {
  changePriceSort: (value: PriceSort) => void;
  priceSort: PriceSort;
  categories: (string | null)[];
  shops: (string | null)[];
  onFilterChange: (
    categories: (string | null)[],
    shops: (string | null)[]
  ) => void;
  setFirstCurrentPage: () => void;
}

type NullableString = string | null;

const FilterPanel: React.FC<FilterPanelProps> = ({
  changePriceSort,
  priceSort,
  onFilterChange,
  setFirstCurrentPage,
  categories,
  shops,
}) => {
  const [localCategories, setLocalCategories] = useState<NullableString[]>([
    ...categories,
  ]);
  const [localShops, setLocalShops] = useState<NullableString[]>([...shops]);

  useEffect(() => {
    setLocalCategories([...categories]);
    setLocalShops([...shops]);
  }, [categories, shops]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string | PriceSort
  ) => {
    handleFilter(
      value,
      localCategories,
      localShops,
      setLocalCategories,
      setLocalShops,
      changePriceSort,
      setFirstCurrentPage,
      shopsOptions
    );
  };

  return (
    <div className="p-0 top-16 bottom-0 left-0 shadow-none bg-transparent z-20">
      {filterOptions.map((filterOption) => (
        <div key={filterOption.value}>
          <h4 className="text-xl mt-4 mb-2">{filterOption.label}</h4>
          {filterOption.options.map((option) => (
            <div key={option.value} className="flex items-center gap-2 mt-0">
              <input
                name={filterOption.value}
                className="w-3 h-3 cursor-pointer"
                checked={
                  filterOption.type === "checkbox"
                    ? localCategories.includes(option.value) ||
                      localShops.includes(option.value)
                    : priceSort == option.value
                }
                onChange={(e) => handleFilterChange(e, option.value)}
                type={filterOption.type}
                value={option.value}
                id={option.value}
              />
              <label
                className="text-sm lg:text-base cursor-pointer "
                htmlFor={option.value}
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      ))}
      <div className="w-1/2 my-4">
        <Button
          fullWidth={true}
          onClick={() => onFilterChange(localCategories, localShops)}
        >
          <span className="text-base">Filtruj</span>
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;
