import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./search.css";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="relative flex items-center">
      <input
        id="searchInput"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
        className="box-border p-2 w-12 bg-transparent border-3 border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500 text-black text-base transition-all duration-500 opacity-60 "
      />
      <FaSearch
        style={{ fontSize: '34px', color: '#646262', cursor: 'pointer' }}
        onClick={handleSearch}
        className="ml-4"
      />
    </div>
  );
};

export default SearchBar;

