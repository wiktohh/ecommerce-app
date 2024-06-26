"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import Select from "../Select";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import SearchedProduct from "./SearchedProduct";
import { ProductInterface } from "@/app/types/types";
import { set } from "react-hook-form";
import LoadingSpinner from "../LoadingSpinner";

const categories = [
  { label: "Wszystkie", value: "all" },
  { label: "Napoje", value: "drinks" },
  { label: "Owoce", value: "fruits" },
  { label: "Warzywa", value: "vegetables" },
  { label: "Mięso", value: "meat" },
  { label: "Nabiał", value: "dairy" },
  { label: "Pieczywo", value: "bread" },
  { label: "Słodycze", value: "sweets" },
];

type SearchedProducts = ProductInterface[] | string | undefined;

const Searchbar = () => {
  const NOT_FOUND = "Nie znaleziono produktów";

  const searchRef = useRef<HTMLDivElement>(null);
  const [category, setCategory] = useState<string>("all");
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchedProducts, setSearchedProducts] = useState<SearchedProducts>();
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
        setQuery("");
        setSearchedProducts(undefined);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      if (query.length > 2) {
        const response = await axios.post(
          "/api/products/search",
          { category, query },
          { headers: { "Content-Type": "application/json" } }
        );
        const data = await response.data;
        if (data === "No products found") {
          setSearchedProducts(NOT_FOUND);
        } else {
          setSearchedProducts(data);
        }
      }
      setIsDropdownVisible(true);
      setIsLoading(false);
    };
    fetchProducts();
  }, [category, query]);

  const handleSelectChange = (value: string) => {
    setCategory(value);
  };

  useEffect(() => {
    if (query.length === 0) {
      setIsDropdownVisible(false);
      setSearchedProducts(undefined);
    }
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div
      data-testid="searchbar"
      className="hidden xl:flex xl:flex-col relative z-50"
    >
      <div className="h-8 bg-white rounded-full px-4 py-2 flex items-center gap-8 text-3xl">
        <Select
          onChange={handleSelectChange}
          selectedValue={category}
          options={categories}
          roundedFull={true}
        />
        <input
          onChange={handleInputChange}
          value={query}
          type="text"
          placeholder="Wyszukaj produkt..."
          className="text-black w-full text-base outline-none border-none"
        />
        <button>
          <FaSearch className="text-base text-black" />
        </button>
      </div>
      {isLoading && (
        <div
          ref={searchRef}
          className="absolute top-8 w-full text-center bg-white px-2 py-4 rounded-xl shadow-lg my-1"
        >
          <LoadingSpinner />
        </div>
      )}
      {isDropdownVisible && query.length > 0 && query.length < 3 && (
        <div
          ref={searchRef}
          className="absolute top-8 w-full text-center bg-white px-2 py-4 rounded-xl shadow-lg my-1"
        >
          Wpisz co najmniej 3 litery
        </div>
      )}
      {isDropdownVisible &&
        query.length >= 3 &&
        searchedProducts === NOT_FOUND && (
          <div
            ref={searchRef}
            className="absolute top-8 w-full text-center bg-white px-2 py-4 rounded-xl shadow-lg my-1"
          >
            Brak wyników
          </div>
        )}
      {isDropdownVisible &&
        query.length >= 3 &&
        Array.isArray(searchedProducts) &&
        searchedProducts.length > 0 && (
          <Suspense fallback={<LoadingSpinner />}>
            <div
              ref={searchRef}
              className="absolute top-8 w-full bg-white px-2 py-4 rounded-xl shadow-lg my-1"
            >
              {searchedProducts.map(
                (product: ProductInterface, idx: number) => (
                  <SearchedProduct key={idx} product={product} />
                )
              )}
            </div>
          </Suspense>
        )}
    </div>
  );
};

export default Searchbar;
