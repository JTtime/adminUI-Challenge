import React, { useState, useEffect, useContext } from "react";
import { MyContext } from "./MyContext";
import "./adminui.css";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditTwoToneIcon from "@mui/icons-material/ModeEditTwoTone";
import SaveAsSharpIcon from "@mui/icons-material/SaveAsSharp";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import CancelPresentationSharpIcon from "@mui/icons-material/CancelPresentationSharp";
import OutlinedInput from "@mui/material/OutlinedInput";
import { FaUserEdit } from "react-icons/fa";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";

export default function MyList() {
  const ITEMS_PER_PAGE = 10;
  const {
    data,
    setData,
    searchTerm,
    setSearchTerm,
    filteredData,
    setFilteredData,
  } = useContext(MyContext);
  //filteredData shifted to searchBar after refactoring for contextAPI
  // const [filteredData, setFilteredData] = useState([]);

  const [isEditing, setIsEditing] = useState({});
  const [checkedRows, setCheckedRows] = useState([]);
  // const [editedValue, setEditedValue] = useState("");
  const [editedValName, setEditedValName] = useState("");
  const [editedValEmail, setEditedValEmail] = useState("");
  const [editedValRole, setEditedValRole] = useState("");
  // const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  function handleCheckChange(event, id) {
    console.log(checkedRows);
    if (event.target.checked) {
      setCheckedRows([...checkedRows, id]);
    } else {
      setCheckedRows(checkedRows.filter((i) => i !== id));
    }
  }

  // const handleDelete = (id) => {
  //   setFilteredData((prevState) => {
  //     const newData = [...prevState];
  //     // newData.splice(id - 1, 1);

  //     const filteredNewData = newData.filter((e) => e[id] !== id);

  //     return filteredNewData;
  //   });
  // };

  const handleDelete = (id) => {
    {
      /* Deleted data should be deleted from both, data and filtered data*/
    }
    const newFilteredData = filteredData.filter((e) => e.id !== id);
    setFilteredData(newFilteredData);
    const newData = data.filter((e) => e.id !== id);
    setData(newData);
  };

  useEffect(() => {
    // If user is on page other than 1st Page, then searching results blank list because page number is not set to 1.
    // So, it is actually showing further pages of search results
    setCurrentPage(1);
  }, [searchTerm]);

  async function fetchData() {
    const response = await fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    const data1 = await response.json();
    setFilteredData(data1);
    setData(data1);
    console.log(data1);
  }
  useEffect(() => {
    fetchData();
  }, []);

  function handleEdit(id) {
    setIsEditing({ [id]: true });

    const index = data.findIndex((e) => e.id === id);
    // setEditedValue(data[index].name);

    setEditedValName(data[index].name);
    setEditedValEmail(data[index].email);
    setEditedValRole(data[index].role);

    console.log(isEditing);
  }

  function changeEditMode(id) {
    setIsEditing({ [id]: !isEditing[id] });
  }

  function handleSave(id) {
    const newData = [...data];
    const index = data.findIndex((e) => e.id === id);

    newData[index].name = editedValName;
    newData[index].email = editedValEmail;
    newData[index].role = editedValRole;

    setData(newData);
    setFilteredData(newData);
    setIsEditing({ [id]: false });
    //Once Editing mode is close, then value stored in Edited mode should be cleared  off
    setEditedValEmail("");
    setEditedValName("");
    setEditedValRole("");
    //following logic is commented because we are manually calling FilterData() function again to retain the state of users edited page
    // const searchquery = searchTerm
    // setSearchTerm("");
    // setSearchTerm(searchquery);
    FilterData();
  }
  {
    /* This particular code snippet is repeated here just to improve user experience.
  whenever user searches any query, clicks save, web-app takes it back to page number 1,
  and user looses sight of edit. so to maintain that state,
  we need to re-search again after clicking save*/
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

  // function handleChangeSearch(e) {
  //   setSearchTerm(e.target.value);
  //   const dataFilter = data.filter(
  //     (item) =>
  //       item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       item.role.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  //   setFilteredData(dataFilter);
  // }

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="MyList">
      {/* Search Bar was first created here
      and after implemting contextAPI,
      transferred to seperate component

      <input
        type="text"
        placeholder="search"
        value={searchTerm}
        onChange={(e) => handleChangeSearch(e)}
      /> */}
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData
            .slice(
              currentPage * ITEMS_PER_PAGE - ITEMS_PER_PAGE,
              currentPage * ITEMS_PER_PAGE
            )
            .map((item, index) => (
              <>
                <tr
                  key={item.id}
                  className={
                    checkedRows.includes(item.id) ? "checked" : "unchecked"
                  }
                >
                  <td>
                    {/* <input
                      type="checkbox"
                      onChange={(event) => handleCheckChange(event, item.id)}
                    /> */}
                    <Checkbox
                      className="checkbox"
                      onChange={(event) => handleCheckChange(event, item.id)}
                    />
                  </td>
                  <td>
                    {isEditing[item.id] ? (
                      <>
                        {/* <input
                          type="text"
                          value={editedValName}
                          onChange={(e) => setEditedValName(e.target.value)}
                        /> */}
                        {/* <OutlinedInput
                          id="component-outlined"
                          defaultValue="Composed TextField"
                          label="Name"
                          value={editedValName}
                          onChange={(e) => setEditedValName(e.target.value)}
                        /> */}
                        <TextField
                          id="outlined-helperText"
                          label="Name"
                          value={editedValName}
                          onChange={(e) => setEditedValName(e.target.value)}
                          defaultValue="UserName"
                          helperText="User FullName"
                        />
                        <CancelPresentationSharpIcon
                          className="close pointer"
                          onClick={() => changeEditMode(item.id)}
                        ></CancelPresentationSharpIcon>
                        {/* <button onClick={() => handleSave(index)}>Save</button> */}
                      </>
                    ) : (
                      <>
                        <span>{item.name}</span>
                        {/* <button onClick={() => handleEdit(index)}>Edit</button> */}
                      </>
                    )}
                  </td>
                  {/*  Email Column conditional rendering */}
                  <td>
                    {isEditing[item.id] ? (
                      <>
                        {/* <input
                          type="text"
                          value={editedValEmail}
                          onChange={(e) => setEditedValEmail(e.target.value)}
                        />     */}
                        {/* <OutlinedInput
                          id="component-outlined"
                          defaultValue="Composed TextField"
                          label="E-Mail"
                          value={editedValEmail}
                          onChange={(e) => setEditedValEmail(e.target.value)}
                        /> */}
                        <TextField
                          id="outlined-helperText"
                          label="E-Mail"
                          value={editedValEmail}
                          onChange={(e) => setEditedValEmail(e.target.value)}
                          defaultValue="E-mail ID"
                          helperText="User Official Mail ID"
                        />
                        <CancelPresentationSharpIcon
                          className="close pointer"
                          onClick={() => changeEditMode(item.id)}
                        ></CancelPresentationSharpIcon>
                      </>
                    ) : (
                      <>
                        <span>{item.email}</span>
                      </>
                    )}
                  </td>

                  {/* // <td>{item.email}</td> */}

                  {/*  Role Column conditional rendering */}
                  <td>
                    {isEditing[item.id] ? (
                      <>
                        {/* <input
                          type="text"
                          value={editedValRole}
                          onChange={(e) => setEditedValRole(e.target.value)}
                        /> */}
                        {/* <OutlinedInput
                          id="component-outlined"
                          defaultValue="Composed TextField"
                          label="Role"
                          value={editedValRole}
                          onChange={(e) => setEditedValRole(e.target.value)}
                        /> */}
                        <TextField
                          id="outlined-helperText"
                          label="Role"
                          value={editedValRole}
                          onChange={(e) => setEditedValRole(e.target.value)}
                          defaultValue="UserName"
                          helperText="User Role in Organisation"
                        />
                        <CancelPresentationSharpIcon
                          className="close pointer"
                          onClick={() => changeEditMode(item.id)}
                        ></CancelPresentationSharpIcon>
                      </>
                    ) : (
                      <>
                        <span>{item.role}</span>
                      </>
                    )}
                  </td>

                  {/* <td>{item.role}</td> */}
                  <td>
                    {isEditing[item.id] ? (
                      <>
                        {/* <button className="pointer trash" onClick={() => handleSave(item.id)}>
                          Save
                        </button> */}
                        {/* <SaveAsSharpIcon
                          className="pointer save"
                          onClick={() => handleSave(item.id)}
                        ></SaveAsSharpIcon> */}
                        <Button
                          className="pointer save"
                          onClick={() => handleSave(item.id)}
                          variant="outlined"
                        >
                          <SaveAsSharpIcon className="saveicon" />
                          Save
                        </Button>
                      </>
                    ) : (
                      <>
                        {/* <button onClick={() => handleEdit(item.id)}>
                          Edit
                        </button> */}
                        {/* <ModeEditTwoToneIcon
                          className="pointer edit"
                          onClick={() => handleEdit(item.id)}
                        ></ModeEditTwoToneIcon> */}
                        {/* <FaUserEdit
                          className="pointer edit"
                          onClick={() => handleEdit(item.id)}
                        /> */}
                        <Fab
                          color="secondary"
                          aria-label="edit"
                          className="pointer edit"
                          onClick={() => handleEdit(item.id)}
                        >
                          <EditIcon />
                        </Fab>
                      </>
                    )}
                    {/* <button onClick={() => handleEdit(item.id)}>Edit</button> */}

                    {/* <button onClick={() => handleDelete(item.id)}>
                      Delete
                    </button> */}
                    {/* <DeleteIcon
                      className="pointer trash"
                      onClick={() => handleDelete(item.id)}
                    ></DeleteIcon> */}
                    <Button
                      className="pointer trash"
                      onClick={() => handleDelete(item.id)}
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              </>
            ))}
        </tbody>
      </table>
      <ul className="paginationBtns">
        {pageNumbers.map((number, index) => {
          return (
            <li key={number}>
              <button
                className="paginationButton"
                onClick={() => setCurrentPage(number)}
              >
                {number}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
