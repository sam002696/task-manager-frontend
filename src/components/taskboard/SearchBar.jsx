import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const SearchBar = () => {
  return (
    <form action="#" method="GET" className="grid flex-1 grid-cols-1">
      <input
        name="search"
        type="search"
        placeholder="Search"
        aria-label="Search"
        className="col-start-1 row-start-1 block size-full bg-white pl-8 text-base text-gray-900 outline-hidden placeholder:text-gray-400 sm:text-sm/6"
      />
      <MagnifyingGlassIcon
        aria-hidden="true"
        className="pointer-events-none col-start-1 row-start-1 size-5 self-center text-gray-400"
      />
    </form>
  );
};

export default SearchBar;
