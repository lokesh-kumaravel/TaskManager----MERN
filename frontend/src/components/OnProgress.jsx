import { React, useState } from "react";
import { useCommonContext } from "./CommonContext";
import Low from "../assets/low.png";
import High from "../assets/high.png";
import Completed from "../assets/complete.png";

const OnProgress = () => {
  const formatDate = (date) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = new Date(date).toLocaleDateString('en-GB', options); // 'en-GB' gives us DD/MM/YYYY format
    return formattedDate;
  };
  const [showDropdownForTask, setShowDropdownForTask] = useState(null); // Track dropdown visibility for each task
  const [taskStatus, setTaskStatus] = useState({}); // Store status for each task

  const handleDropdownToggle = (taskId) => {
    // Toggle visibility for the dropdown of a specific task
    setShowDropdownForTask((prev) => (prev === taskId ? null : taskId));
  };

  const handleStatusChange = (taskId, newStatus) => {
    // Set new status for the specific task
    setTaskStatus((prevStatus) => ({
      ...prevStatus,
      [taskId]: newStatus, // Update the status for the task with the given ID
    }));
    setShowDropdownForTask(null); // Close dropdown after selection
  };

  const { tasks, loading, error, setUser, getTasks } = useCommonContext();
  console.log("from onProgress", tasks);

  return (
    <div className="outer-div">
      <h3 style={{ textAlign: "center" }}>On Progress</h3>
      <hr
        style={{
          border: "none",
          borderTop: "5px solid #4169E1",
          margin: "20px 0",
        }}
      />

      <div className="image-column">
        {/* Check if there are tasks */}
        {tasks.length > 0 ? (
          tasks.map((task) => {
            // Only render tasks with the category 'In Progress'
            if (task.category === "In Progress" && task.priority !== "Completed") {
              const taskId = task._id;
              const currentStatus = taskStatus[taskId] || task.status; // Use saved status or default from task

              return (
                <div className="image-column-items" key={task._id}>
                  {/* Render based on task priority */}
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ padding: "20px 22px 0px" }}>
                      {task.priority === "Low" && (
                        <button
                          style={{
                            background: "#fee9d4",
                            width: "70px",
                            height: "40px",
                          }}
                        >
                          <img src={Low} alt="Low priority" />
                        </button>
                      )}
                      {task.priority === "High" && (
                        <button
                          style={{
                            background: "#fae9ed",
                            width: "70px",
                            height: "40px",
                          }}
                        >
                          <img src={High} alt="High priority" />
                        </button>
                      )}
                      {task.priority === "Completed" && (
                        <button
                          style={{
                            background: "#dcf8c9",
                            width: "70px",
                            height: "40px",
                          }}
                        >
                          <img src={Completed} alt="Completed" />
                        </button>
                      )}
                    </div>

                    {/* Dropdown - Three vertical dots (ellipsis) */}
                    <div
                      style={{
                        position: "relative",
                        display: "inline-block",
                        marginLeft: "auto", // Align to the right side
                      }}
                    >
                      <div
                        style={{
                          cursor: "pointer",
                          fontSize: "24px",
                          lineHeight: "24px",
                          paddingRight  : "27px",
                          paddingTop  : "27px",
                        }}
                        onClick={() => handleDropdownToggle(taskId)} // Toggle dropdown for this specific task
                      >
                        &#8942; {/* Unicode for horizontal ellipsis */}
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
                            style={{
                              padding: "10px",
                              cursor: "pointer",
                              borderBottom: "1px solid #ddd",
                            }}
                            onClick={() => handleStatusChange(taskId, "Completed")}
                          >
                            Completed
                          </div>
                          <div
                            style={{
                              padding: "10px",
                              cursor: "pointer",
                              borderBottom: "1px solid #ddd",
                            }}
                            onClick={() => handleStatusChange(taskId, "Not Completed")}
                          >
                            Not Completed
                          </div>
                          <div
                            style={{
                              padding: "10px",
                              cursor: "pointer",
                            }}
                            onClick={() => handleStatusChange(taskId, "In Progress")}
                          >
                            In Progress
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <h3
                    style={{
                      paddingLeft: "20px",
                      fontSize: "18px",
                      fontStyle: "normal",
                    }}
                  >
                    {task.title}
                  </h3>
                  <p
                    style={{
                      paddingLeft: "20px",
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      fontWeight: "400",
                      fontSize: "17px",
                      lineHeight: "22px", // Increased line height for better spacing
                      color: "#787486",
                    }}
                  >
                    {task.description}
                  </p>

                  {/* Ensure price exists before rendering */}
                  {/* {task.deadline && <span>{task.deadline}</span>} */}
                  {task.deadline && (
                    <div style={{ paddingLeft: "20px", marginTop: "10px", fontSize: "16px" }}>
                      <strong>Deadline:</strong> {formatDate(task.deadline)}
                    </div>
                  )}
                  {/* Display selected status */}
                  {/* {currentStatus && (
                    <div style={{ marginTop: "10px", fontSize: "16px" }}>
                      <strong>Current Status:</strong> {currentStatus}
                    </div>
                  )} */}
                </div>
              );
            }
            return null; // Return null if the task category is not "In Progress"
          })
        ) : (
          <p>No tasks available.</p>
        )}
      </div>
    </div>
  );
};

export default OnProgress;

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