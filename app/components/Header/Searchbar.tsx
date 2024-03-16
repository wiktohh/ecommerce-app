"use client";
import { useState } from "react";
import Select from "../Select";
import { FaSearch } from "react-icons/fa";

const categories = [
  { label: "All", value: "all" },
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" },
];

const Searchbar = () => {
  const [category, setCategory] = useState<string>("all");

  const handleSelectChange = (value: string) => {
    setCategory(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  return (
    <div className="h-8 bg-white rounded-full px-4 py-2 flex items-center gap-8 text-3xl">
      <Select
        onChange={handleSelectChange}
        selectedValue={category}
        options={categories}
        roundedFull={true}
      />
      <input
        onChange={handleInputChange}
        value={category}
        type="text"
        placeholder="Search a product"
        className="text-black w-full text-base outline-none border-none"
      />
      <button>
        <FaSearch className="text-base text-black" />
      </button>
    </div>
  );
};

export default Searchbar;
