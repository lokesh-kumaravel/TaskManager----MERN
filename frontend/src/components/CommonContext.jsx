import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../config";

const CommonContext = createContext();

export const CommonProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [completedCount, setCompletedCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const updateCompletedCount = () => {
    const completedTasks = tasks.filter(task => task.status === "Completed");
    setCompletedCount(completedTasks.length);
  };

  const [overdueCount, setOverdueCount] = useState(0); 
  
  const getCurrentDate = () => {
    const currentDate = new Date();
    return currentDate.toISOString().split('T')[0];
  };

  const checkOverdueTasks = () => {
    const currentDate = getCurrentDate();
    const overdueTasks = tasks.filter(task => {
      if (task.deadline) {
        const taskDeadline = task.deadline.split("T")[0];
        return taskDeadline < currentDate;
      }
      return false;
    });
    setOverdueCount(overdueTasks.length);
  };
  const updateActiveCount = () => {
    const activeTasks = tasks.filter(task => task.category === "To Do" || task.category === "In Progress");
    setActiveCount(activeTasks.length);
  };
  useEffect(() => {
    checkOverdueTasks();
    updateCompletedCount();
    updateActiveCount();
  }, [tasks]); 

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []); 
  
  useEffect(() => {
    if (!userId) return; 
    getTasks(userId); 
  }, [userId]);

  const getTasks = async (userId) => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching tasks for user: " + userId);

      const response = await axios.post(`${baseURL}/task/get`, { userId });

      console.log("From Context (Tasks): ", response.data.tasks);
      setTasks(response.data.tasks); 
    } catch (err) {
      setError("Error fetching tasks");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    console.log(" TaskDA TA"+taskData)
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(`${baseURL}/task/add`, taskData);
      setTasks((prevTasks) => [...prevTasks, response.data.task]);
    } catch (err) {
      setError("Error adding task");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const setTask = async (taskId, updatedTaskData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.put(`${baseURL}/task/update/${taskId}`, updatedTaskData);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, ...updatedTaskData } : task
        )
      );
      
      console.log("Task updated successfully:", response.data);
    } catch (err) {
      setError("Error updating task");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    console.log(" Task in update status : "+taskId, newStatus)

    try {
      const response = await axios.patch(`${baseURL}/task/${taskId}/status`, { status: newStatus });
      if (response.data && response.data.task) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? { ...task, status: newStatus, category: newStatus } : task
          )
        );
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      alert("Failed to update task status");
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await axios.delete(`${baseURL}/task/tasks/${taskId}`); 

      setTasks(tasks.filter((task) => task._id !== taskId));
      console.log(response.data.message);
    } catch (err) {
      console.error("Error deleting task:", err);
      setError('Failed to delete task');
    }
  };
  const removeTask = async (taskId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.delete(`${baseURL}/task/delete/${taskId}`);
      
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      
      console.log("Task deleted successfully:", response.data);
    } catch (err) {
      setError("Error deleting task");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const setUser = (id) => {
    setUserId(id); 
  };

  return (
    <CommonContext.Provider
      value={{
        tasks,
        loading,
        error,
        getTasks,
        addTask,
        setTask, 
        removeTask,
        setUser,
        deleteTask,
        updateTaskStatus, 
        overdueCount,
        completedCount,
        activeCount
      }}
    >
      {children}
    </CommonContext.Provider>
  );
};

export const useCommonContext = () => {
  return useContext(CommonContext);
};
