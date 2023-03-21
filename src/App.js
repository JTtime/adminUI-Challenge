import MyList from "./Components/MyList";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { MyContext } from "./Components/MyContext";
import SearchBar from "./Components/SearchBar";
import "./Components/adminui.css";

export default function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  return (
    <MyContext.Provider
      value={{
        data,
        setData,
        searchTerm,
        setSearchTerm,
        filteredData,
        setFilteredData
      }}
    >
      <div className="App">
        <Router>
          <h1>ADMIN UI</h1>
          <SearchBar />
          <Routes>
            <Route exact path="/" element={<MyList />} />
          </Routes>
        </Router>
      </div>
    </MyContext.Provider>
  );
}
