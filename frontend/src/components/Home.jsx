import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Todo from "./Todo";
import { useCommonContext } from "./CommonContext";
import expiredImage from "../assets/expired.png";
import Active from "../assets/active.png";
import Completed from "../assets/completed.png";
import Success from "../assets/success.png";
import "../styles/Home.css";
import OnProgress from "./OnProgress";
import Done from "./Done";

const Home = () => {
  const [description, setDescription] = useState("");
  const handleNavigate = (path) => {
    navigate(path);
  };
  const {
    tasks,
    loading,
    error,
    setUser,
    getTasks,
    addTask,
    overdueCount,
    completedCount,
    activeCount,
  } = useCommonContext();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [taskInput, setTaskInput] = useState("");
  const handleAddTask = async (event) => {
    event.preventDefault();
    if (
      taskInput &&
      description &&
      priority !== "Select Priority" &&
      selectedDate
    ) {
      console.log("All fields are valid. Proceeding with task creation.");

      const user = localStorage.getItem("userId");
      const newTask = {
        title: taskInput,
        description: description,
        priority: priority,
        deadline: selectedDate,
        category: "To Do",
        user: user,
      };

      await addTask(newTask);

      setIsPopupVisible(true);

      handleTaskReset();
      setTimeout(() => {
        setIsPopupVisible(false);
      }, 3000);
      toggleModal(event);
    } else {
      alert("Please fill in all fields.");
    }
  };

  const userId = localStorage.getItem("userId");
  console.log(userId);
  console.log("In home : " + tasks);
  useEffect(() => {
    if (!userId) return;
    setUser(userId);
  }, [setUser]);
  const [isOpen, setIsOpen] = useState(false);
  const [priority, setPriority] = useState("Select Priority");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handlePriorityChange = (priority) => {
    setPriority(priority);
    setIsOpen(false);
  };

  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleCalendarToggle = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const handleInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  const handleTaskReset = () => {
    setTaskInput("");
    setSelectedDate(null);
    setShowCalendar(false);
    handleCalendarToggle();
  };
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const toggleModal = (event) => {
    event.stopPropagation();
    setShowModal(!showModal);
  };

  const handleOutsideClick = () => {
    setShowModal(false);
  };
  const handlecalender = () => {
    navigate("/Calendar");
  };
  return (
    <>
    <div className="home-container" onClick={handleOutsideClick}>
      <div className="home-frame">
        <div className="search-box">
          <div className="search-row">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-search"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              className="search-text"
              placeholder="Search Project"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="filter-box">
          <div className="filter-frame">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-filter"
            >
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            <span className="filter-text">Filter</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-chevron-down"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
          <div className="filter-dropdown">
            <ul>
              <li onClick={() => handleNavigate("/todo")}>To Do</li>
              <li onClick={() => handleNavigate("/onprogress")}>On Progress</li>
              <li onClick={() => handleNavigate("/done")}>Done</li>
            </ul>
          </div>
        </div>
      </div>

      {isPopupVisible && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            color: "black",
            padding: "30px 40px",
            borderRadius: "8px",
            zIndex: 1000,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
            width: "100%",
            maxWidth: "450px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            <img src={Success}></img>
          </div>

          <p
            style={{
              marginBottom: "20px",
              fontSize: "18px",
              textAlign: "center",
            }}
          >
            New Task has been created Successfully!
          </p>

          <button
            onClick={() => {
              setIsPopupVisible(false);
            }}
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              display: "block",
              marginTop: "20px",
              width: "100%",
            }}
          >
            Back
          </button>
        </div>
      )}

      <div className="image-grid">
        <div className="i"></div>

        {(!loading&&
        <div>
          <div className="image-column">
            <div className="image-column-item">
              <div
                style={{
                  paddingLeft: "10%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                }}
              >
                <div className="block-1">
                  <img src={expiredImage}></img>
                </div>
                <div>
                  <h1>Expired Task</h1>
                  <div
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "28px",
                      fontWeight: "500",
                      lineHeight: "42px",
                      letterSpacing: "0.01em",
                      textAlign: "left",
                      textUnderlinePosition: "from-font",
                      textDecorationSkipInk: "none",
                    }}
                  >
                    {overdueCount}
                  </div>

                  {/* <h1> */}
                  {/* <center>{overdueCount}</center> */}
                  {/* {overdueCount} */}
                  {/* </h1> */}
                </div>
              </div>
            </div>
            <div className="image-column-item">
              <div
                style={{
                  paddingLeft: "10%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <div className="block-1">
                  <img src={Active}></img>
                </div>
                <div>
                  <h1>All Active Task</h1>
                  {/* <h1>{activeCount}</h1> */}
                  <div
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "28px",
                      fontWeight: "500",
                      lineHeight: "42px",
                      letterSpacing: "0.01em",
                      textAlign: "left",
                      textUnderlinePosition: "from-font",
                      textDecorationSkipInk: "none",
                    }}
                  >
                    {activeCount}
                  </div>
                </div>
              </div>
            </div>
            <div className="image-column-item">
              <div
                style={{
                  paddingLeft: "10%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                <div className="block-1">
                  <img src={Completed}></img>
                </div>
                <div>
                  <h1>Completed Task</h1>
                  {/* <h1>{completedCount}</h1> */}
                  <div
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "28px",
                      fontWeight: "500",
                      lineHeight: "42px",
                      letterSpacing: "0.01em",
                      textAlign: "left",
                      textUnderlinePosition: "from-font",
                      textDecorationSkipInk: "none",
                    }}
                  >
                    {completedCount}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br></br>
          <div
            id="_1_1563_Component_23"
            onClick={(e) => {
              e.stopPropagation();
              toggleModal(e);
            }}
            style={{
              position: "relative",
              background: "rgba(13, 6, 45, 1.00)",
              borderRadius: "19px",
              height: "60px",
              width: "auto",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "nowrap",
              gap: "6px",
              padding: "6px 14px 6px 12px",
              cursor: "pointer",
            }}
          >
            <div
              id="_1_1564_icons"
              style={{
                paddingRight: "10px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                shape-rendering="geometricPrecision"
                text-rendering="geometricPrecision"
                image-rendering="optimizeQuality"
                fill-rule="evenodd"
                clip-rule="evenodd"
                viewBox="0 0 512 512"
                style={{ width: "40", height: "40" }}
              >
                <path
                  fill="#fff"
                  fill-rule="nonzero"
                  d="M256 0c70.691 0 134.691 28.654 181.018 74.982C483.346 121.309 512 185.309 512 256s-28.654 134.691-74.982 181.018C390.691 483.346 326.691 512 256 512s-134.691-28.655-181.018-74.982C28.654 390.691 0 326.69 0 256c0-70.691 28.654-134.691 74.982-181.018C121.309 28.654 185.309 0 256 0zm.002 373.536h-.004c-11.233 0-20.43-9.253-20.43-20.427v-76.676h-74.022c-11.178 0-20.43-9.246-20.43-20.43v-.004c0-11.184 9.193-20.43 20.43-20.43h74.022v-76.673c0-11.174 9.25-20.43 20.43-20.43h.004c11.181 0 20.43 9.193 20.43 20.43v76.673h74.026c11.233 0 20.426 9.201 20.426 20.43v.004c0 11.233-9.249 20.43-20.426 20.43h-74.026v76.676c0 11.233-9.2 20.427-20.43 20.427zM412.87 99.13C372.726 58.985 317.263 34.155 256 34.155c-61.263 0-116.726 24.83-156.87 64.975C58.985 139.274 34.155 194.737 34.155 256c0 61.263 24.83 116.726 64.975 156.871 40.144 40.144 95.607 64.974 156.87 64.974 61.263 0 116.726-24.83 156.87-64.974 40.145-40.145 64.975-95.607 64.975-156.871 0-61.263-24.83-116.726-64.975-156.87z"
                />
              </svg>
            </div>

            <span
              id="Add_Task"
              style={{
                paddingRight: "10px",
                color: "#ffffff",
                fontFamily: "Poppins",
                fontSize: "20px",
                fontWeight: "500",
                lineHeight: "18px",
                textAlign: "left",
                height: "18px",
                width: "100px",
                position: "relative",
              }}
            >
              Add Task
            </span>
          </div>
        </div>
        )}
        {showModal && (
          <div
            className="modal-overlay"
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              right: "0",
              bottom: "0",
              background: "rgba(0, 0, 0, 0.5)",
              zIndex: 9999,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={handleOutsideClick}
          >
            <div
              className="modal-content"
              style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "8px",
                width: "100%",
                maxWidth: "400px",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Add Task</h3>

              <label style={{ fontSize: "25px" }}>Task Title</label>
              <input
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                placeholder="Enter task title"
                style={{
                  width: "80%",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  marginBottom: "10px",
                }}
              />
              <br></br>

              <label style={{ fontSize: "25px" }}>Task Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter task description"
                style={{
                  width: "80%",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  marginBottom: "10px",
                  height: "150px",
                  resize: "vertical",
                }}
              />
              <br></br>

              <label>Priority</label>
              <select
                value={priority}
                onChange={(e) => handlePriorityChange(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  marginBottom: "10px",
                }}
              >
                <option value="Select Priority" disabled>
                  Select Priority
                </option>
                <option value="High">High</option>
                <option value="Low">Low</option>
              </select>

              <label>Deadline</label>
              <div style={{ marginBottom: "10px" }}>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="MM/dd/yyyy"
                  placeholderText="Select a date"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
              </div>

              <div className="task-btns">
                <button
                  className="cancel"
                  onClick={toggleModal}
                  style={{
                    backgroundColor: "#ccc",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  className="save"
                  onClick={(e) => handleAddTask(e)}
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginLeft: "10px",
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        <Todo />
        <OnProgress />
        <Done />
      </div>
    </div>
    </>
  );
};

export default Home;
