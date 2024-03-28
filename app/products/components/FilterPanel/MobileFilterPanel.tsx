"use client";
import Button from "@/app/components/Button";
import { filterOptions, shopsOptions } from "./constants";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PriceSort } from "../../page";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import { handleFilter, sendParams } from "../../utilts";

interface FilterPanelProps {
  changePriceSort: (value: PriceSort) => void;
  priceSort: PriceSort;
  categories: (string | null)[];
  shops: (string | null)[];
  onFilterChange: (
    localCategories: (string | null)[],
    localShops: (string | null)[]
  ) => void;
  setFirstCurrentPage: () => void;
  closePanel: () => void;
  sendParamsToParent: (
    category: string | null,
    shop: string | null,
    categories: (string | null)[],
    shops: (string | null)[]
  ) => void;
  showFilterPanel: boolean;
}

const MobileFilterPanel: React.FC<FilterPanelProps> = ({
  changePriceSort,
  priceSort,
  onFilterChange,
  setFirstCurrentPage,
  closePanel,
  sendParamsToParent,
  showFilterPanel,
  categories,
  shops,
}) => {
  const [localCategories, setLocalCategories] = useState<(string | null)[]>([
    ...categories,
  ]);
  const [localShops, setLocalShops] = useState<(string | null)[]>([...shops]);

  const searchParams = useSearchParams();
  const categoryFromParameter = searchParams.get("category");
  const shopFromParameter = searchParams.get("shop");

  useEffect(() => {
    setLocalCategories([...categories]);
    setLocalShops([...shops]);
  }, [categories, shops]);

  const handleButtonClick = () => {
    onFilterChange(localCategories, localShops);
    closePanel();
  };

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

  useEffect(() => {
    sendParams(
      categoryFromParameter,
      shopFromParameter,
      localCategories,
      localShops,
      sendParamsToParent
    );
    if (categoryFromParameter) {
      setLocalCategories([categoryFromParameter]);
    }
    if (shopFromParameter) {
      setLocalShops([shopFromParameter]);
    }
  }, [categoryFromParameter, shopFromParameter]);

  const variants = {
    open: { x: "-100%" },
    closed: { x: 0 },
  };

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={showFilterPanel ? "closed" : "open"}
      variants={variants}
      transition={{ stiffness: 100, duration: 0.3 }}
      className="absolute px-12 md:p-0 top-16 bottom-0 left-0 w-full shadow-lg bg-white z-20 overflow-hidden"
    >
      <IoMdClose
        onClick={closePanel}
        className="absolute top-4 right-4 text-4xl hover:text-red-500 cursor-pointer"
      />
      {filterOptions.map((filterOption) => (
        <div key={filterOption.value}>
          <h4 className="text-2xl mt-4 mb-2">{filterOption.label}</h4>
          {filterOption.options.map((option) => (
            <div key={option.value} className="flex items-center gap-4 mt-2">
              <input
                name={`mobile-${filterOption.value}`}
                className="w-4 h-4 cursor-pointer"
                checked={
                  filterOption.type === "checkbox"
                    ? localCategories.includes(option.value) ||
                      localShops.includes(option.value)
                    : priceSort === option.value
                }
                onChange={(e) => handleFilterChange(e, option.value)}
                type={filterOption.type}
                value={option.value}
                id={`mobile-${option.value}`}
              />
              <label
                className="text-xl cursor-pointer"
                htmlFor={`mobile-${option.value}`}
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      ))}
      <div className="my-4">
        <Button fullWidth={true} onClick={handleButtonClick}>
          <span className="text-base">Filtruj</span>
        </Button>
      </div>
    </motion.div>
  );
};

export default MobileFilterPanel;
