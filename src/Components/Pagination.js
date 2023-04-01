import React, { useState, useEffect, useContext } from "react";
import { MyContext } from "./MyContext";
import "./adminui.css";
import { TbChevronsLeft } from "react-icons/tb";
import { TbChevronLeft } from "react-icons/tb";
import { TbChevronRight } from "react-icons/tb";
import { TbChevronsRight } from "react-icons/tb";

export default function Pagination() {
  const {
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
  } = useContext(MyContext);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  function handlePageChange(number) {
    setCurrentPage(number);
    setCheckedRows([]);
    setIsSelectedAll(false);

    // settingDataView();
  }

  return (
    <div>
      <ul className="paginationBtns">
        <li>
          <div
            className="firstPage paginationButton"
            onClick={() => setCurrentPage(1)}
          >
            <TbChevronsLeft />{" "}
          </div>
        </li>
        <li>
          <div
            className="prevPage paginationButton"
            onClick={() =>
              currentPage !== 1
                ? setCurrentPage(currentPage - 1)
                : setCurrentPage(1)
            }
          >
            <TbChevronLeft />
          </div>
        </li>
        {pageNumbers.map((number, index) => {
          return (
            <li key={number}>
              <button
                className={
                  currentPage == number
                    ? "activePage paginationButton"
                    : "inactivePage paginationButton"
                }
                onClick={() => handlePageChange(number)}
              >
                {number}
              </button>
            </li>
          );
        })}
        <li>
          <div
            className="nextPage paginationButton"
            onClick={() =>
              currentPage !== totalPages
                ? setCurrentPage(currentPage + 1)
                : setCurrentPage(totalPages)
            }
          >
            <TbChevronRight />{" "}
          </div>
        </li>
        <li>
          <div
            className="lastPage paginationButton"
            onClick={() => setCurrentPage(totalPages)}
          >
            <TbChevronsRight />
          </div>
        </li>
      </ul>
    </div>
  );
}
