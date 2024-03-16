"use client";
import Button from "@/app/components/Button";
import { filterOptions } from "./constants";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const FilterPanel = () => {
  const searchParams = useSearchParams();
  const param = searchParams.get("category");
  const [filter, setFilter] = useState([param]);
  const [priceSort, setPriceSort] = useState("asc");

  const handleFilter = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    if (e.target.type === "radio") {
      setPriceSort(value);
      return;
    } else if (!filter.includes(value)) {
      setFilter([...filter, value]);
    } else {
      setFilter(filter.filter((f) => f !== value));
    }
  };

  useEffect(() => {
    console.log(filter);
    console.log(priceSort);
  }, [filter, priceSort]);

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
                    ? filter.includes(option.value)
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
        <Button fullWidth={true}>
          <span className="text-base">Filtruj</span>
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;
