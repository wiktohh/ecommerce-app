"use client";
import Button from "@/app/components/Button";
import { filterOptions } from "./constants";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PriceSort } from "../../page";
import { IoMdClose } from "react-icons/io";
import { send } from "process";

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
  toggleMobileFilterPanel: () => void;
  sendParamsToParent: (
    category: string | null,
    shop: string | null,
    categories: (string | null)[],
    shops: (string | null)[]
  ) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  changePriceSort,
  priceSort,
  onFilterChange,
  setFirstCurrentPage,
  toggleMobileFilterPanel,
  sendParamsToParent,
}) => {
  const shopsOptions = ["biedronka", "lidl", "kaufland"];

  const [categories, setCategories] = useState<(string | null)[]>([]);
  const [shops, setShops] = useState<(string | null)[]>([]);

  const searchParams = useSearchParams();
  const categoryFromParameter = searchParams.get("category");
  const shopFromParameter = searchParams.get("shop");

  const sendParams = () => {
    sendParamsToParent(
      categoryFromParameter,
      shopFromParameter,
      categories,
      shops
    );
  };

  useEffect(() => {
    sendParams();
  }, [categoryFromParameter, shopFromParameter, categories, shops]);

  // to refactor some day XD
  const handleFilter = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string | PriceSort
  ) => {
    const allCategories = filterOptions[1].options.map(
      (option) => option.value
    );
    const allShops = [...shopsOptions, "allShops"];
    setFirstCurrentPage();

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
    <div className="absolute px-12 md:p-0 top-16 bottom-0 left-0 w-full md:w-1/6 md:relative shadow-lg md:shadow-none bg-white md:bg-transparent z-20">
      <IoMdClose
        onClick={toggleMobileFilterPanel}
        className="absolute top-4 right-4 text-4xl hover:text-red-500 cursor-pointer md:hidden"
      />
      {filterOptions.map((filterOption) => (
        <div key={filterOption.value}>
          <h4 className="text-3xl md:text-xl mt-4 mb-2">
            {filterOption.label}
          </h4>
          {filterOption.options.map((option) => (
            <div
              key={option.value}
              className="flex items-center gap-4 md:gap-2 mt-2 md:mt-0"
            >
              <input
                name={filterOption.value}
                className="w-6 h-6 md:w-3 md:h-3"
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
              <label
                className="text-2xl md:text-sm lg:text-base"
                htmlFor={option.value}
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      ))}
      <div className="md:w-1/2 my-4">
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
