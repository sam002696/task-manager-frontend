import React from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
// import SearchBar from "./SearchBar";
import UserDropdown from "./UserDropdown";

const Topbar = ({ setSidebarOpen }) => {
  return (
    <div className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-xs sm:px-6 lg:px-8">
      {/*  Sidebar Toggle */}
      <button
        type="button"
        onClick={() => setSidebarOpen(true)}
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon aria-hidden="true" className="size-6" />
      </button>

      <div aria-hidden="true" className="h-6 w-px bg-gray-900/10 lg:hidden" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-end">
        {/* <SearchBar /> */}

        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <div aria-hidden="true" className="hidden lg:block lg:h-6" />

          <UserDropdown />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
