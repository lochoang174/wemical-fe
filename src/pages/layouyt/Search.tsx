import React from "react";
import { CiSearch } from "react-icons/ci";

const Search = () => {
  return (
    <div className="relative mb-14 mt-[72px]">
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2  text-2xl text-[#C4C4C4]">
        <CiSearch />
      </span>
      <input
        type="text"
        placeholder="Search"
        className="pl-10 pr-4 py-2 w-full  rounded-xl focus:outline-none focus:ring-2 outline-none border-[#C4C4C4] bg-[transparent] border-solid border-[1px]"
      />
    </div>
  );
};

export default Search;
