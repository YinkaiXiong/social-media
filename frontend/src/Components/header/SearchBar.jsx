import React, { useState } from "react";
import { Search } from "react-bootstrap-icons";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const onSearchChange = (event) => {
    const newValue = event.target.value;
    setSearchTerm(newValue);
  };

  const handleClick = (event) => {
    //pass input value to where its needed.

    event.preventDefault();
  };

  return (
    <div>
      <form>
        <input
          name="searchInput"
          placeholder="Search for ... "
          onChange={onSearchChange}
          value={searchTerm}
        />
        <button onClick={handleClick}>
          <Search />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
