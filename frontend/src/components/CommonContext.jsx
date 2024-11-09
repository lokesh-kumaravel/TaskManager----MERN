import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../config";

const CommonContext = createContext();

export const CommonProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  // Set the userId when the  first mounts (from localStorage)
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []); // This runs only once on mount

  // Effect to fetch tasks whenever userId changes
  useEffect(() => {
    if (!userId) return; // If no userId, don't fetch tasks
    getTasks(userId); // Fetch tasks for the current user
  }, [userId]); // Re-run when userId changes

  const getTasks = async (userId) => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching tasks for user: " + userId);

      const response = await axios.post(`${baseURL}/task/get`, { userId });

      // Handle tasks and update the state
      console.log("From Context (Tasks): ", response.data.tasks);
      setTasks(response.data.tasks); // Update the state with fetched tasks
    } catch (err) {
      setError("Error fetching tasks");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
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

  const setUser = (id) => {
    setUserId(id); // This will trigger the useEffect for tasks
  };

  return (
    <CommonContext.Provider
      value={{
        tasks,
        loading,
        error,
        getTasks,
        addTask,
        setUser,
      }}
    >
      {children}
    </CommonContext.Provider>
  );
};

// Custom hook to use the CommonContext
export const useCommonContext = () => {
  return useContext(CommonContext);
};
