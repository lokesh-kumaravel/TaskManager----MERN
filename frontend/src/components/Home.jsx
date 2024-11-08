import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "../styles/Home.css";

const Home = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [taskInput, setTaskInput] = useState(false);
  const handleAddTask = (event) => {
    setIsPopupVisible(true);
    setTimeout(() => {
      setIsPopupVisible(false);
    }, 3000); // 3 seconds
    toggleModal(event);
  };

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
              class="lucide lucide-filter"
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
              class="lucide lucide-chevron-down"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 472.37"
        width="50"
        height="50"
        style={{
          display: "block",
          margin: "0 auto",
        }}
      >
        <path
          fill-rule="nonzero"
          d="M145.33 172.6l57.21-.75c2.76-.04 5.33.74 7.51 2.1 11.85 6.86 23.04 14.67 33.45 23.48 5.86 4.97 11.53 10.28 16.99 15.96 19.67-30.56 43.04-61.58 67.52-90.78 31.9-38.04 65.91-73.2 96.22-100.37 2.65-2.37 5.97-3.53 9.26-3.53l44.22-.07c7.7 0 13.95 6.25 13.95 13.95 0 3.86-1.56 7.34-4.09 9.87-40.58 45.12-82.2 96.78-119.92 149.72-34.92 49.02-66.55 99.17-90.93 146.26-3.52 6.83-11.92 9.51-18.75 5.99a13.796 13.796 0 01-6.23-6.5c-13.36-28.57-29.28-54.8-48.23-78.2-18.93-23.37-41-44.09-66.69-61.72-6.35-4.33-7.98-13-3.65-19.35 2.82-4.14 7.49-6.27 12.16-6.06zM62.55 0h270.16c-19.14 19.72-35.72 38.96-49.97 57.45H62.55c-1.42 0-2.71.57-3.64 1.46a5.27 5.27 0 00-1.46 3.64v347.26c0 1.34.6 2.6 1.54 3.55.96.95 2.23 1.56 3.56 1.56h386.89c1.29 0 2.55-.62 3.52-1.58.97-.97 1.59-2.24 1.59-3.53V213.59c20.82-8.61 40.4-17.48 57.45-25.81v222.03c0 17.14-7.11 32.82-18.43 44.14-11.33 11.33-26.99 18.42-44.13 18.42H62.55c-17.13 0-32.83-7.06-44.17-18.4C7.08 442.67 0 427.03 0 409.81V62.55C0 45.4 7.04 29.78 18.35 18.46l.11-.11C29.78 7.04 45.4 0 62.55 0z"
        />
      </svg>
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

        <div className="image-column">
          <div className="image-column-item">
            <div className="block-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                shape-rendering="geometricPrecision"
                text-rendering="geometricPrecision"
                image-rendering="optimizeQuality"
                fill-rule="evenodd"
                clip-rule="evenodd"
                viewBox="0 0 512 512"
              >
                <path
                  fill="#A82C1F"
                  fill-rule="nonzero"
                  d="M256 0c70.686 0 134.69 28.658 181.016 74.984C483.342 121.31 512 185.314 512 256c0 70.686-28.658 134.69-74.984 181.016C390.69 483.342 326.686 512 256 512c-70.686 0-134.69-28.658-181.016-74.984C28.658 390.69 0 326.686 0 256c0-70.686 28.658-134.69 74.984-181.016C121.31 28.658 185.314 0 256 0z"
                />
                <circle fill="#D03827" cx="256" cy="256" r="226.536" />
                <path
                  fill="#fff"
                  fill-rule="nonzero"
                  d="M275.546 302.281c-.88 22.063-38.246 22.092-39.099-.007-3.779-37.804-13.444-127.553-13.136-163.074.312-10.946 9.383-17.426 20.99-19.898 3.578-.765 7.512-1.136 11.476-1.132 3.987.007 7.932.4 11.514 1.165 11.989 2.554 21.402 9.301 21.398 20.444l-.044 1.117-13.099 161.385zm-19.55 39.211c14.453 0 26.168 11.717 26.168 26.171 0 14.453-11.715 26.167-26.168 26.167s-26.171-11.714-26.171-26.167c0-14.454 11.718-26.171 26.171-26.171z"
                />
              </svg>
              <p>Some text content or description related to this image.</p>
            </div>
            <div className="block-2">
              <img src="assets/images/18945496082.svg" alt="Group_621" />
              <p>Another description or additional information.</p>
            </div>
          </div>
          <div className="image-column-item">
            <div className="block-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                shape-rendering="geometricPrecision"
                text-rendering="geometricPrecision"
                image-rendering="optimizeQuality"
                fill-rule="evenodd"
                clip-rule="evenodd"
                viewBox="0 0 512 440.478"
              >
                <g fill-rule="nonzero">
                  <path d="M39.1 73.078h109.472V32.764c0-9.004 3.679-17.184 9.609-23.116l.039-.039C164.152 3.678 172.332 0 181.336 0h149.329c9.031 0 17.223 3.677 23.155 9.609.216.216.42.441.612.671 5.572 5.892 8.998 13.813 8.998 22.484v40.314h109.469c21.433 0 39.101 17.661 39.101 39.1v289.2c0 21.434-17.659 39.1-39.101 39.1H39.1c-21.42 0-39.1-17.686-39.1-39.1v-289.2c0-21.418 17.687-39.1 39.1-39.1zm149.732 0H323.17V40.259H188.832v32.819z" />
                  <path
                    fill="#92521E"
                    d="M39.1 84.4h433.8c15.247 0 27.778 12.547 27.778 27.779v289.199c0 15.25-12.543 27.778-27.778 27.778H39.1c-15.247 0-27.778-12.546-27.778-27.778V112.179C11.322 96.932 23.868 84.4 39.1 84.4z"
                  />
                  <path
                    fill="#AD6739"
                    d="M39.1 84.4h433.8c15.247 0 27.778 12.547 27.778 27.779v85.472c-126.623 55.716-232.313 158.899-489.355-6.303v-79.169C11.323 96.93 23.867 84.4 39.1 84.4z"
                  />
                  <path
                    fill="#03040D"
                    d="M9.866 190.341c31.556 21.314 66.418 39.504 102.402 54.354 38.374 15.836 78.105 27.923 116.539 35.993l-2.752 11.379c-39.134-8.217-79.65-20.549-118.847-36.725-36.89-15.224-72.547-33.815-104.712-55.541l7.37-9.46zM510.248 199.277c-32.362 21.917-68.128 40.626-105.057 55.898-39.294 16.25-79.943 28.64-119.244 36.892l-2.752-11.379c38.532-8.091 78.377-20.235 116.885-36.16 36.209-14.974 71.212-33.272 102.798-54.666l7.37 9.415z"
                  />
                  <path d="M246.202 240.255H265.8c5.685 0 10.82 2.293 14.536 6.009a20.476 20.476 0 016.01 14.538v51.147a20.482 20.482 0 01-6.009 14.538 20.478 20.478 0 01-14.537 6.009h-19.598c-5.645 0-10.769-2.291-14.503-6.01l-.054-.055c-3.707-3.732-5.99-8.847-5.99-14.482v-51.147c0-5.645 2.29-10.768 6.009-14.503l.055-.054c3.732-3.707 8.848-5.99 14.483-5.99zm19.598 17.652h-19.598c-.833 0-1.56.307-2.057.804l-.034.034c-.498.498-.805 1.224-.805 2.057v51.147c0 .833.308 1.56.805 2.056l.034.035c.497.497 1.224.804 2.057.804H265.8c.812 0 1.54-.32 2.057-.838a2.894 2.894 0 00.838-2.057v-51.147c0-.813-.321-1.539-.839-2.057a2.89 2.89 0 00-2.056-.838z" />
                  <path
                    fill="#FDB735"
                    d="M246.201 249.081H265.8a11.69 11.69 0 0111.721 11.721v51.147A11.69 11.69 0 01265.8 323.67h-19.599a11.69 11.69 0 01-11.72-11.721v-51.147a11.69 11.69 0 0111.72-11.721z"
                  />
                  <path
                    fill="#8D531F"
                    d="M178.767 74.45h-20.13V32.764c0-12.506 10.193-22.699 22.699-22.699h149.329c12.506 0 22.7 10.194 22.7 22.699V74.45h-20.13V32.764c0-1.394-1.175-2.569-2.57-2.569H181.336c-1.395 0-2.569 1.174-2.569 2.569V74.45z"
                  />
                </g>
              </svg>
              <p>Some text content or description related to this image.</p>
            </div>
            <div className="block-2">
              <img src="assets/images/18945496082.svg" alt="Group_621" />
              <p>Another description or additional information.</p>
            </div>
          </div>
          <div className="image-column-item">
            <div className="block-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                shape-rendering="geometricPrecision"
                text-rendering="geometricPrecision"
                image-rendering="optimizeQuality"
                fill-rule="evenodd"
                clip-rule="evenodd"
                viewBox="0 0 512 472.37"
              >
                <path
                  fill-rule="nonzero"
                  d="M145.33 172.6l57.21-.75c2.76-.04 5.33.74 7.51 2.1 11.85 6.86 23.04 14.67 33.45 23.48 5.86 4.97 11.53 10.28 16.99 15.96 19.67-30.56 43.04-61.58 67.52-90.78 31.9-38.04 65.91-73.2 96.22-100.37 2.65-2.37 5.97-3.53 9.26-3.53l44.22-.07c7.7 0 13.95 6.25 13.95 13.95 0 3.86-1.56 7.34-4.09 9.87-40.58 45.12-82.2 96.78-119.92 149.72-34.92 49.02-66.55 99.17-90.93 146.26-3.52 6.83-11.92 9.51-18.75 5.99a13.796 13.796 0 01-6.23-6.5c-13.36-28.57-29.28-54.8-48.23-78.2-18.93-23.37-41-44.09-66.69-61.72-6.35-4.33-7.98-13-3.65-19.35 2.82-4.14 7.49-6.27 12.16-6.06zM62.55 0h270.16c-19.14 19.72-35.72 38.96-49.97 57.45H62.55c-1.42 0-2.71.57-3.64 1.46a5.27 5.27 0 00-1.46 3.64v347.26c0 1.34.6 2.6 1.54 3.55.96.95 2.23 1.56 3.56 1.56h386.89c1.29 0 2.55-.62 3.52-1.58.97-.97 1.59-2.24 1.59-3.53V213.59c20.82-8.61 40.4-17.48 57.45-25.81v222.03c0 17.14-7.11 32.82-18.43 44.14-11.33 11.33-26.99 18.42-44.13 18.42H62.55c-17.13 0-32.83-7.06-44.17-18.4C7.08 442.67 0 427.03 0 409.81V62.55C0 45.4 7.04 29.78 18.35 18.46l.11-.11C29.78 7.04 45.4 0 62.55 0z"
                />
              </svg>
              <p>Some text content or description related to this image.</p>
            </div>
            <div className="block-2">
              <img src="assets/images/18945496082.svg" alt="Group_621" />
              <p>Another description or additional information.</p>
            </div>
          </div>
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
              height: "36px",
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
            {taskInput && (
              <button
                onClick={handleTaskReset}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: "none",
                  border: "none",
                  color: "red",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              >
                X
              </button>
            )}
            {showModal && (
              <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-content">
                  <div>
                    <h2>
                      Add Task
                      <div
                        style={{
                          cursor: "pointer",
                          display: "inline-block",
                          paddingLeft: "160px",
                          padding: "5px",
                          fontSize: "24px",
                        }}
                        onClick={toggleDropdown}
                      >
                        &#8942;{" "}
                      </div>
                      {isOpen && (
                        <ul
                          style={{
                            height: "70px",
                            listStyleType: "none",
                            padding: "0",
                            margin: "0",
                            display: "flex",
                            backgroundColor: "#fff",
                            border: "none",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                            // top: "40px",
                          }}
                        >
                          <li
                            onClick={() => handlePriorityChange("High")}
                            style={{
                              cursor: "pointer",
                              borderBottom: "none",
                              flex: "1",
                              textAlign: "center",
                            }}
                          >
                            <h6>High</h6>
                          </li>

                          <li
                            onClick={() => handlePriorityChange("Low")}
                            style={{
                              cursor: "pointer",
                              borderBottom: "none",
                              flex: "1",
                              textAlign: "center",
                            }}
                          >
                            <h6>Low</h6>
                          </li>
                          <li
                            onClick={() => handlePriorityChange("Completed")}
                            style={{
                              // padding: "10px 15px",
                              cursor: "pointer",
                              borderBottom: "none",
                              flex: "1",
                              textAlign: "center",
                            }}
                          >
                            <h6>Completed</h6>
                          </li>
                        </ul>
                      )}
                      <hr
                        style={{
                          border: "none",
                          borderTop: "3px solid #4169E1",
                          margin: "20px 0",
                        }}
                      />
                    </h2>

                    <div>
                      <strong>Priority: </strong> {priority}
                    </div>
                  </div>
                  {selectedDate && (
                    <div>
                      <p>Selected Date: {selectedDate.toLocaleDateString()}</p>
                    </div>
                  )}

                  {/* Large Input Box */}
                  <textarea
                    placeholder="Enter task details"
                    style={{
                      width: "90%",
                      height: "100px",
                      padding: "10px",
                      fontSize: "16px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                      resize: "vertical",
                    }}
                  />

                  <div className="modal-actions">
                    <button
                      onClick={handleCalendarToggle}
                      style={{
                        padding: "10px 20px",
                        width: "30%",
                        background: "none",
                        color: "Black",
                        border: "none",
                        borderRadius: "5px",
                        fontSize: "16px",
                        cursor: "pointer",
                      }}
                    >
                      <b>Deadline</b>
                    </button>

                    {/* The DatePicker Component */}
                    {showCalendar && (
                      <div
                        style={{
                          position: "absolute",
                          zIndex: "9999",
                          marginTop: "10px",
                          alignContent: "center",
                          justifyContent: "center",
                        }}
                      >
                        <DatePicker
                          selected={selectedDate}
                          onChange={handleDateChange}
                          inline
                        />
                      </div>
                    )}

                    <button
                      onClick={handleAddTask}
                      style={{
                        padding: "10px 20px",
                        width: "40%",
                        background: "none",
                        color: "Black",
                        border: "none",
                        borderRadius: "5px",
                        fontSize: "16px",
                        cursor: "pointer",
                      }}
                    >
                      <b>Save Task</b>
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div
              id="_1_1564_icons"
              style={{
                position: "relative",
                overflow: "hidden",
                height: "14px",
                width: "14px",
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
                style={{ width: "12px", height: "12px" }}
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
                color: "#ffffff",
                fontFamily: "Poppins",
                fontSize: "14px",
                fontWeight: "500",
                lineHeight: "18px",
                textAlign: "left",
                height: "18px",
                width: "65px",
                position: "relative",
              }}
            >
              Add Task
            </span>
          </div>
        </div>

        <div className="outer-div">
          <h3 style={{ textAlign: "center" }}>To Do</h3>
          <hr
            style={{
              border: "none",
              borderTop: "5px solid #4169E1",
              margin: "20px 0",
            }}
          />

          <div className="image-column">
            <div className="image-column-items">Hello</div>
            <div className="image-column-items">Hello</div>
          </div>
        </div>
        <div className="outer-div">
          <h3 style={{ textAlign: "center" }}>On Progress</h3>
          <hr
            style={{
              border: "none",
              borderTop: "5px solid #FFA500",
              margin: "20px 0",
            }}
          />
          <div className="image-column">
            <div className="image-column-items">Hello</div>
            <div className="image-column-items">Hello</div>
          </div>
        </div>
        <div className="outer-div">
          <h3 style={{ textAlign: "center" }}>Done</h3>
          <hr
            style={{
              border: "none",
              borderTop: "5px solid #32CD32",
              margin: "20px 0",
            }}
          />
          <div className="image-column">
            <div className="image-column-items">Hello</div>
            <div className="image-column-items">Hello</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
