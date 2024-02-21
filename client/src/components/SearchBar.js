import React, { useState } from "react";
import "./search.css";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
    setSearchTerm(""); // Reset the search term after search
  };

  return (
<div className="relative flex items-center">
  <input
    id="searchInput"
    type="text"
    placeholder="Search..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="box-border p-2 w-12 bg-transparent border-3 border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500 text-black text-base transition-all duration-500 opacity-60"
  />
  <button
    id="searchBtn"
    type="submit"
    onClick={handleSearch}
    className="border-none bg-gradient-to-r from-blue-500 to-green-400 text-white overflow-hidden relative p-3 rounded-full text-base cursor-pointer transition-all duration-300 ml-2"
  >
    Search
    <div className="absolute top-0 left-0 w-3 h-full  animate-shiny-btn1"></div>
  </button>
</div>

  );
};

export default SearchBar;

