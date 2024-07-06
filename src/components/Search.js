import React, { useState, useRef } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const Search = ({ filterCountry }) => {
  const params = useSearchParams();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState(params.get("search") || "");
  const router = useRouter();
  const debounceTimeout = useRef(null);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // return console.log(pathname, params.get("region"));
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      filterCountry(e.target.value);
      router.replace(`?region=${params.get("region")}&search=${e.target.value}`);
    }, 1000);
  };

  return (
    <div className="flex h-14 w-fit items-center overflow-hidden rounded-md px-8 dark:bg-darkblue-1 max-md:w-full shadow-medium">
      <i className="" id="icon-search">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </i>
      <input
        className="block h-full w-[400px] px-6 outline-none dark:bg-inherit max-md:w-full"
        type="text"
        onChange={handleSearch}
        value={searchQuery}
        placeholder="Search for a country..."
      />
    </div>
  );
};

export default Search;
