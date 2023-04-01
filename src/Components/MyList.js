import { useState, useEffect, useContext } from "react";
import { MyContext } from "./MyContext";
import Loading from "./Loading";
import "./adminui.css";

/*UI Design framework (materialUI) imports below */
import Button from "@mui/material/Button";
import CancelPresentationSharpIcon from "@mui/icons-material/CancelPresentationSharp";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";

export default function MyList() {
  /*States and variable imported from MyContext - Global States */
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
    setCheckedRows,
    isSelectedAll,
    setIsSelectedAll,
    ITEMS_PER_PAGE,
  } = useContext(MyContext);

  /*Local States */
  const [isEditing, setIsEditing] = useState({});
  const [editedValName, setEditedValName] = useState("");
  const [editedValEmail, setEditedValEmail] = useState("");
  const [editedValRole, setEditedValRole] = useState("");
  const [isLoading, setIsLoading] = useState();

  //following commented states shifted to App.js after refactoring for contextAPI and required states imported via useContext()

  // const [filteredData, setFilteredData] = useState([]);
  // const [checkedRows, setCheckedRows] = useState([]);
  // const [editedValue, setEditedValue] = useState("");
  // const [searchTerm, setSearchTerm] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);
  // const [isSelectedAll, setIsSelectedAll] = useState(false);
  // const ITEMS_PER_PAGE = 10;

  function handleCheckChange(event, id) {
    setIsSelectedAll(false);
    console.log(checkedRows);
    if (event.target.checked) {
      // id.checkStatus = true;
      setCheckedRows([...checkedRows, id]);
    } else {
      setCheckedRows(checkedRows.filter((i) => i !== id));
    }
  }
  function handleCheckAll(event, name) {
    setIsSelectedAll(!isSelectedAll);
    console.log(event);
    if (event.target.checked) {
      const dataView = filteredData.slice(
        currentPage * ITEMS_PER_PAGE - ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      );
      const checkVisibleData = dataView.map((item) => item.id);
      // setCheckedRows(filteredData.map((item) => item.id));
      setCheckedRows(checkVisibleData);
    } else {
      setCheckedRows([]);
    }
  }

  function deleteMultiple() {
    const newFilteredData = filteredData.filter(
      (e) => !checkedRows.includes(e.id)
    );
    setFilteredData(newFilteredData);
    const newData = data.filter((e) => !checkedRows.includes(e.id));
    setData(newData);
    setIsSelectedAll(false);
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
    setIsLoading(true);
    fetchData();
    setIsLoading(false);
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

  //Transferred to SearchBar component
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

  //Codes without using Design Frameworks are kept as it is in comments at required places
  //In case, Code need to be shift back to Pure React Codes, just deleting MUI or framework icons and uncommenting old codes will be sufficient

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

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>
                  {" "}
                  <Checkbox
                    className="checkbox"
                    name="selectAll"
                    checked={isSelectedAll}
                    onChange={(event) => handleCheckAll(event)}
                  />
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th className="actionColumnHead">Actions</th>
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
                          name={item.name}
                          checked={checkedRows.includes(item.id)}
                          onChange={(event) =>
                            handleCheckChange(event, item.id)
                          }
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

                            <TextField
                              id="outlined-helperText"
                              label="E-Mail"
                              value={editedValEmail}
                              onChange={(e) =>
                                setEditedValEmail(e.target.value)
                              }
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
                      <td className="actionButtonsColumn">
                        {isEditing[item.id] ? (
                          <span className="save">
                            {/* <button className="pointer trash" onClick={() => handleSave(item.id)}>
                          Save
                        </button> */}

                            <Fab
                              color="secondary"
                              aria-label="save"
                              className="save"
                              onClick={() => handleSave(item.id)}
                            >
                              <SaveIcon />
                            </Fab>
                          </span>
                        ) : (
                          <span className="edit">
                            {/* <button onClick={() => handleEdit(item.id)}>
                          Edit
                        </button> */}

                            <Fab
                              color="secondary"
                              aria-label="edit"
                              className="edit"
                              onClick={() => handleEdit(item.id)}
                            >
                              <EditIcon />
                            </Fab>
                          </span>
                        )}
                        {/* <button onClick={() => handleEdit(item.id)}>Edit</button> */}

                        <div className="trash">
                          <Fab
                            color="secondary"
                            aria-label="delete"
                            className="trash"
                            onClick={() => handleDelete(item.id)}
                          >
                            <DeleteIcon />
                          </Fab>
                        </div>
                      </td>
                    </tr>
                  </>
                ))}
            </tbody>
          </table>
          <div className="footer">
            <span>
              <button className="deleteSelected" onClick={deleteMultiple}>
                Delete Selected
              </button>
            </span>
          </div>
        </>
      )}
    </div>
  );
}
