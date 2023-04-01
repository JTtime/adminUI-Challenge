import React, { useEffect, useContext } from "react";
import { MyContext } from "./MyContext";
import "./adminui.css";
import TextField from "@mui/material/TextField";

export default function SearchBar() {
  /*States and variable imported from MyContext - Global States */
  const { data, searchTerm, setSearchTerm, filteredData, setFilteredData } =
    useContext(MyContext);

  function handleChangeSearch(e) {
    setSearchTerm(e.target.value);
  }

  const FilterData = () => {
    const dataFilter = data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(dataFilter);
  };

  useEffect(() => {
    FilterData();
  }, [searchTerm]);

  return (
    <div className="searchBar">
      <TextField
        fullWidth
        size="small"
        id="filled-basic"
        label="Search for Name, E-mail or Role"
        variant="filled"
        value={searchTerm}
        onChange={(e) => handleChangeSearch(e)}
        className="searchTextBox"
      />
      {/* <input
        type="text"
        placeholder="search"
        value={searchTerm}
        onChange={(e) => handleChangeSearch(e)}
      /> */}
    </div>
  );
}
// export {FilterData};
