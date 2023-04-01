import MyList from "./Components/MyList";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { MyContext } from "./Components/MyContext";
import SearchBar from "./Components/SearchBar";
import Pagination from "./Components/Pagination";
import "./Components/adminui.css";

export default function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [checkedRows, setCheckedRows] = useState([]);
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const ITEMS_PER_PAGE = 10;

  return (
    <MyContext.Provider
      value={{
        data,
        setData,
        searchTerm,
        setSearchTerm,
        filteredData,
        setFilteredData,
        currentPage,
        setCurrentPage,
        checkedRows,
        setCheckedRows, isSelectedAll, setIsSelectedAll, 
        ITEMS_PER_PAGE,
      }}
    >
      <div className="App">
        <Router>
          <h1>ADMIN UI</h1>
          <SearchBar />
          <Routes>
            <Route exact path="/" element={<MyList />} />
          </Routes>
          <Pagination />
        </Router>
      </div>
    </MyContext.Provider>
  );
}
