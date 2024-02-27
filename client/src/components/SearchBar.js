import React, { useState } from "react";
import "./search.css";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
    setSearchTerm(""); 
  };

  return (
<div className="relative flex items-center">
  <input
    id="searchInput"
    type="text"
    placeholder="Search..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    onClick={handleSearch}
    className="box-border p-2 w-12 bg-transparent border-3 border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500 text-black text-base transition-all duration-500 opacity-60"
  />

</div>

  );
};

export default SearchBar;

