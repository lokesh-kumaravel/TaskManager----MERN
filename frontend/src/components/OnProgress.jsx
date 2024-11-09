import { React, useState } from "react";
import { useCommonContext } from "./CommonContext";
import Low from "../assets/low.png";
import High from "../assets/high.png";
import Completed from "../assets/complete.png";

const OnProgress = () => {
  // Format date in DD/MM/YYYY format
  const formatDate = (date) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = new Date(date).toLocaleDateString('en-GB', options); 
    return formattedDate;
  };

  const [showDropdownForTask, setShowDropdownForTask] = useState(null); 
  const [taskStatus, setTaskStatus] = useState({}); 
  const [isEditing, setIsEditing] = useState(null); // Track if a task is being edited
  const [editTaskData, setEditTaskData] = useState({}); // Store the edited data for task

  const { tasks, setTask, deleteTask, updateTaskStatus } = useCommonContext(); // Assuming setTask updates the task in the context

  // Toggle the visibility of the dropdown for a specific task
  const handleDropdownToggle = (taskId) => {
    setShowDropdownForTask((prev) => (prev === taskId ? null : taskId));
  };

  // Handle status change for a task
  const handleStatusChange = async (taskId, newStatus) => {
    await updateTaskStatus(taskId, newStatus); // This will update the status globally
  };

  const handleDeleteClick = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(taskId); // Call the delete function
    }
  };
  // Handle the start of editing a task
  const handleEditClick = (task) => {
    setShowDropdownForTask(null); // Close dropdown
    setIsEditing(task._id); // Set task as editing
    setEditTaskData({
      title: task.title,
      description: task.description,
      deadline: task.deadline ? task.deadline.split("T")[0] : "", // Ensure the date is in correct format
    });
  };

  // Submit the edited task data to update it
  const handleEditSubmit = async (taskId) => {
    const updatedTask = {
      title: editTaskData.title,
      description: editTaskData.description,
      deadline: editTaskData.deadline,
    };

    // Call setTask to update the task in the context
    await setTask(taskId, updatedTask);

    // Reset the editing state
    setIsEditing(null);
  };

  return (
    <div className="outer-div">
      <h3 style={{ textAlign: "center" }}>On Progress</h3>
      <hr
        style={{
          border: "none",
          borderTop: "5px solid orange",
          margin: "20px 0",
        }}
      />
      <div className="image-column">
        {/* Check if there are tasks */}
        {tasks.length > 0 ? (
          tasks.map((task) => {
            // Only render tasks with the category "In Progress"
            if ((task.category === "In Progress" && task.priority !== "Completed")|| task.status=="In rogress") {
              const taskId = task._id;
              const currentStatus = taskStatus[taskId] || task.status; 

              return (
                <div className="image-column-items" key={task._id}>
                  {/* Render task priority */}
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ padding: "20px 22px 0px" }}>
                      {task.priority === "Low" && (
                        <button style={{ background: "#fee9d4", width: "70px", height: "40px" }}>
                          <img src={Low} alt="Low priority" />
                        </button>
                      )}
                      {task.priority === "High" && (
                        <button style={{ background: "#fae9ed", width: "70px", height: "40px" }}>
                          <img src={High} alt="High priority" />
                        </button>
                      )}
                      {task.priority === "Completed" && (
                        <button style={{ background: "#dcf8c9", width: "70px", height: "40px" }}>
                          <img src={Completed} alt="Completed" />
                        </button>
                      )}
                    </div>

                    {/* Dropdown - Three vertical dots (ellipsis) */}
                    <div
                      style={{
                        position: "relative",
                        display: "inline-block",
                        marginLeft: "auto",
                      }}
                    >
                      <div
                        style={{
                          cursor: "pointer",
                          fontSize: "24px",
                          lineHeight: "24px",
                          paddingRight: "27px",
                          paddingTop: "27px",
                        }}
                        onClick={() => handleDropdownToggle(taskId)} 
                      >
                        &#8942; {/* Dropdown icon */}
                      </div>

                      {/* Dropdown Menu for specific task */}
                      {showDropdownForTask === taskId && (
                        <div
                          style={{
                            position: "absolute",
                            right: 0,
                            top: "30px", // Position dropdown below the dots
                            backgroundColor: "#fff",
                            border: "1px solid #ddd",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                            borderRadius: "4px",
                            width: "150px",
                            zIndex: "1",
                          }}
                        >
                          <div
                            style={{ padding: "10px", cursor: "pointer", borderBottom: "1px solid #ddd" }}
                            onClick={() => handleEditClick(task)} // Open edit mode for task
                          >
                            Edit
                          </div>

                          <div
                            style={{ padding: "10px", cursor: "pointer", borderBottom: "1px solid #ddd" }}
                            onClick={() => handleStatusChange(taskId, "Completed")}
                          >
                            Completed
                          </div>
                          <div
                            style={{ padding: "10px", cursor: "pointer" }}
                            onClick={() => handleStatusChange(taskId, "To Do")}
                          >
                            To Do
                          </div>
                          <div
                            style={{
                              padding: "10px",
                              cursor: "pointer",
                              borderTop: "1px solid #ddd",
                            }}
                            onClick={() => handleDeleteClick(taskId)}
                          >
                            Delete
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Task Details */}
                  {isEditing === task._id ? (
                    <div>
                      <input
                        type="text"
                        value={editTaskData.title}
                        onChange={(e) =>
                          setEditTaskData({ ...editTaskData, title: e.target.value })
                        }
                        style={{ margin: "10px 0", width: "100%", padding: "8px", fontSize: "16px" }}
                      />
                      <textarea
                        value={editTaskData.description}
                        onChange={(e) =>
                          setEditTaskData({ ...editTaskData, description: e.target.value })
                        }
                        style={{
                          width: "100%",
                          padding: "8px",
                          fontSize: "16px",
                          height: "100px",
                          marginBottom: "10px",
                        }}
                      />
                      <input
                        type="date"
                        value={editTaskData.deadline}
                        onChange={(e) =>
                          setEditTaskData({ ...editTaskData, deadline: e.target.value })
                        }
                        style={{ padding: "8px", fontSize: "16px", width: "100%" }}
                      />
                      <div style={{ marginTop: "10px",display:'flex', justifyContent:'space-evenly' }}>
                        <div>
                        <button style={{background:'green'}} onClick={() => handleEditSubmit(task._id)} >
                          Save
                        </button>
                        </div>
                        <div>
                        <button style={{background:'red'}} onClick={() => setIsEditing(null)}>
                          Cancel
                        </button>
                          </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3 style={{ paddingLeft: "20px", fontSize: "18px", fontStyle: "normal" }}>
                        {task.title}
                      </h3>
                      <p
                        style={{
                          paddingLeft: "20px",
                          fontFamily: "Inter",
                          fontStyle: "normal",
                          fontWeight: "400",
                          fontSize: "17px",
                          lineHeight: "22px",
                          color: "#787486",
                        }}
                      >
                        {task.description}
                      </p>

                      {task.deadline && (
                        <div style={{ paddingLeft: "20px", marginTop: "10px", fontSize: "16px" }}>
                          <strong>Deadline:</strong> {formatDate(task.deadline)}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            }
            return null; 
          })
        ) : (
          <p>No tasks available.</p>
        )}
      </div>
    </div>
  );
};

export default OnProgress;

// import { React, useState } from "react";
// import { useCommonContext } from "./CommonContext";
// import Low from "../assets/low.png";
// import High from "../assets/high.png";
// import Completed from "../assets/complete.png";

// const OnProgress = () => {
//   const formatDate = (date) => {
//     const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
//     const formattedDate = new Date(date).toLocaleDateString('en-GB', options); // 'en-GB' gives us DD/MM/YYYY format
//     return formattedDate;
//   };
//   const [showDropdownForTask, setShowDropdownForTask] = useState(null); // Track dropdown visibility for each task
//   const [taskStatus, setTaskStatus] = useState({}); // Store status for each task

//   const handleDropdownToggle = (taskId) => {
//     // Toggle visibility for the dropdown of a specific task
//     setShowDropdownForTask((prev) => (prev === taskId ? null : taskId));
//   };

//   const handleStatusChange = (taskId, newStatus) => {
//     // Set new status for the specific task
//     setTaskStatus((prevStatus) => ({
//       ...prevStatus,
//       [taskId]: newStatus, // Update the status for the task with the given ID
//     }));
//     setShowDropdownForTask(null); // Close dropdown after selection
//   };

//   const { tasks, loading, error, setUser, getTasks } = useCommonContext();
//   console.log("from onProgress", tasks);

//   return (
//     <div className="outer-div">
//       <h3 style={{ textAlign: "center" }}>On Progress</h3>
//       <hr
//         style={{
//           border: "none",
//           borderTop: "5px solid #4169E1",
//           margin: "20px 0",
//         }}
//       />

//       <div className="image-column">
//         {/* Check if there are tasks */}
//         {tasks.length > 0 ? (
//           tasks.map((task) => {
//             // Only render tasks with the category 'In Progress'
//             if (task.category === "In Progress" && task.priority !== "Completed") {
//               const taskId = task._id;
//               const currentStatus = taskStatus[taskId] || task.status; // Use saved status or default from task

//               return (
//                 <div className="image-column-items" key={task._id}>
//                   {/* Render based on task priority */}
//                   <div style={{ display: "flex", justifyContent: "space-between" }}>
//                     <div style={{ padding: "20px 22px 0px" }}>
//                       {task.priority === "Low" && (
//                         <button
//                           style={{
//                             background: "#fee9d4",
//                             width: "70px",
//                             height: "40px",
//                           }}
//                         >
//                           <img src={Low} alt="Low priority" />
//                         </button>
//                       )}
//                       {task.priority === "High" && (
//                         <button
//                           style={{
//                             background: "#fae9ed",
//                             width: "70px",
//                             height: "40px",
//                           }}
//                         >
//                           <img src={High} alt="High priority" />
//                         </button>
//                       )}
//                       {task.priority === "Completed" && (
//                         <button
//                           style={{
//                             background: "#dcf8c9",
//                             width: "70px",
//                             height: "40px",
//                           }}
//                         >
//                           <img src={Completed} alt="Completed" />
//                         </button>
//                       )}
//                     </div>

//                     {/* Dropdown - Three vertical dots (ellipsis) */}
//                     <div
//                       style={{
//                         position: "relative",
//                         display: "inline-block",
//                         marginLeft: "auto", // Align to the right side
//                       }}
//                     >
//                       <div
//                         style={{
//                           cursor: "pointer",
//                           fontSize: "24px",
//                           lineHeight: "24px",
//                           paddingRight  : "27px",
//                           paddingTop  : "27px",
//                         }}
//                         onClick={() => handleDropdownToggle(taskId)} // Toggle dropdown for this specific task
//                       >
//                         &#8942; {/* Unicode for horizontal ellipsis */}
//                       </div>

//                       {/* Dropdown Menu for specific task */}
//                       {showDropdownForTask === taskId && (
//                         <div
//                           style={{
//                             position: "absolute",
//                             right: 0,
//                             top: "30px", // Position dropdown below the dots
//                             backgroundColor: "#fff",
//                             border: "1px solid #ddd",
//                             boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//                             borderRadius: "4px",
//                             width: "150px",
//                             zIndex: "1",
//                           }}
//                         >
//                           <div
//                             style={{
//                               padding: "10px",
//                               cursor: "pointer",
//                               borderBottom: "1px solid #ddd",
//                             }}
//                             onClick={() => handleStatusChange(taskId, "Completed")}
//                           >
//                             Completed
//                           </div>
//                           <div
//                             style={{
//                               padding: "10px",
//                               cursor: "pointer",
//                               borderBottom: "1px solid #ddd",
//                             }}
//                             onClick={() => handleStatusChange(taskId, "Not Completed")}
//                           >
//                             Not Completed
//                           </div>
//                           <div
//                             style={{
//                               padding: "10px",
//                               cursor: "pointer",
//                             }}
//                             onClick={() => handleStatusChange(taskId, "In Progress")}
//                           >
//                             In Progress
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   <h3
//                     style={{
//                       paddingLeft: "20px",
//                       fontSize: "18px",
//                       fontStyle: "normal",
//                     }}
//                   >
//                     {task.title}
//                   </h3>
//                   <p
//                     style={{
//                       paddingLeft: "20px",
//                       fontFamily: "Inter",
//                       fontStyle: "normal",
//                       fontWeight: "400",
//                       fontSize: "17px",
//                       lineHeight: "22px", // Increased line height for better spacing
//                       color: "#787486",
//                     }}
//                   >
//                     {task.description}
//                   </p>

//                   {/* Ensure price exists before rendering */}
//                   {/* {task.deadline && <span>{task.deadline}</span>} */}
//                   {task.deadline && (
//                     <div style={{ paddingLeft: "20px", marginTop: "10px", fontSize: "16px" }}>
//                       <strong>Deadline:</strong> {formatDate(task.deadline)}
//                     </div>
//                   )}
//                   {/* Display selected status */}
//                   {/* {currentStatus && (
//                     <div style={{ marginTop: "10px", fontSize: "16px" }}>
//                       <strong>Current Status:</strong> {currentStatus}
//                     </div>
//                   )} */}
//                 </div>
//               );
//             }
//             return null; // Return null if the task category is not "In Progress"
//           })
//         ) : (
//           <p>No tasks available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OnProgress;

// import { React, useContext } from "react";
// import { useCommonContext } from "./CommonContext";
// import Low from "../assets/low.png";
// import High from "../assets/high.png";
// import Completed from "../assets/complete.png";

// const OnProgress = () => {
//   const { tasks, loading, error, setUser, getTasks } = useCommonContext();
//   console.log("from todo", tasks);

//   return (
//     <div className="outer-div">
//       <h3 style={{ textAlign: "center" }}>On Progress</h3>
//       <hr
//         style={{
//           border: "none",
//           borderTop: "5px solid #4169E1",
//           margin: "20px 0",
//         }}
//       />

//       <div className="image-column">
//         {/* Check if there are tasks */}
//         {tasks.length > 0 ? (
//           tasks.map((task) => {
//             // Only render tasks with the category 'In Progress'
//             if (task.category === "In Progress"&&task.priority!="Completed") {
//               return (
//                 <div className="image-column-items" key={task._id}>
//                   {/* Render based on task priority */}
//                   <div style={{ padding: "20px 22px 0px" }}> 
//                   {task.priority === "Low" && (
//                     <button style={{ background: "#fee9d4", width:'70px', height:'40px' }}>
//                       <img src={Low} alt="Low priority" />
//                     </button>
//                   )}
//                   {task.priority === "High" && (
//                     <button style={{ background: "#fae9ed", width:'70px', height:'40px' }}>
//                       <img src={High} alt="High priority" />
//                     </button>
//                   )}
//                   {task.priority === "Completed" && (
//                     <button style={{ background: "#dcf8c9", width:'70px', height:'40px' }}>
//                       <img src={Completed} alt="Completed" />
//                     </button>
//                   )}
//                   </div>
//                   <h3
//                     style={{
//                       paddingLeft: "20px",
//                       fontSize: "18px",
//                       fontStyle: "normal",
//                     }}
//                   >
//                     {task.title}
//                   </h3>
//                   <p
//                     style={{
//                       paddingLeft: "20px",
//                       fontFamily: "Inter",
//                       fontStyle: "normal",
//                       fontWeight: "400",
//                       fontSize: "17px",
//                       lineHeight: "22px", // Increased line height for better spacing
//                       color: "#787486",
//                     }}
//                   >
//                     {task.description}
//                   </p>

//                   {/* Ensure price exists before rendering */}
//                   {task.price && <span>{task.price}</span>}
//                 </div>
//               );
//             }
//             return null; // Return null if the task category is not "In Progress"
//           })
//         ) : (
//           <p>No tasks available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OnProgress;
// // import React from "react";

// // const OnProgress = () =>
// // {
// //     return (
// //         <div className="outer-div">
// //           <h3 style={{ textAlign: "center" }}>On Progress</h3>
// //           <hr
// //             style={{
// //               border: "none",
// //               borderTop: "5px solid #FFA500",
// //               margin: "20px 0",
// //             }}
// //           />
// //           <div className="image-column">
// //             <div className="image-column-items">Hello</div>
// //             <div className="image-column-items">Hello</div>
// //           </div>
// //         </div>
// //     );
// // }

// // export default OnProgress;