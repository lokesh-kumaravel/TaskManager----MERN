import { React, useState } from "react";
import { useCommonContext } from "./CommonContext";
import Low from "../assets/low.png";
import High from "../assets/high.png";
import Completed from "../assets/complete.png";

const Done = () => {
  const formatDate = (date) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = new Date(date).toLocaleDateString('en-GB', options); 
    return formattedDate;
  };

  const [showDropdownForTask, setShowDropdownForTask] = useState(null);
  const [taskStatus, setTaskStatus] = useState({});

  const handleDropdownToggle = (taskId) => {
    setShowDropdownForTask((prev) => (prev === taskId ? null : taskId));
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTaskStatus((prevStatus) => ({
      ...prevStatus,
      [taskId]: newStatus,
    }));
    setShowDropdownForTask(null); 
  };

  const { tasks, loading, error, setUser, getTasks } = useCommonContext();
  console.log("from Done", tasks);

  return (
    <div className="outer-div">
      <h3 style={{ textAlign: "center" }}>Done</h3>
      <hr
        style={{
          border: "none",
          borderTop: "5px solid #4169E1",
          margin: "20px 0",
        }}
      />

      <div className="image-column">
        {tasks.length > 0 ? (
          tasks.map((task) => {
            if (task.priority === "Completed") {
              const taskId = task._id;
              const currentStatus = taskStatus[taskId] || task.status; 

              return (
                <div className="image-column-items" key={task._id}>
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
                        <button style={{ background: "#dcf8c9", width: "140px", height: "40px" }}>
                          <img src={Completed} alt="Completed" />
                        </button>
                      )}
                    </div>

                    <div style={{ position: "relative", display: "inline-block", marginLeft: "auto" }}>
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
                        &#8942; 
                      </div>

                      {showDropdownForTask === taskId && (
                        <div
                          style={{
                            position: "absolute",
                            right: 0,
                            top: "30px", 
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

                  {task.price && <span>{task.price}</span>}

                  {/* {currentStatus && (
                    <div style={{ marginTop: "10px", fontSize: "16px" }}>
                      <strong>Current Status:</strong> {currentStatus}
                    </div>
                  )} */}
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

export default Done;