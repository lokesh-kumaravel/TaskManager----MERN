import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { baseURL } from "../config";

const Login = () => {
  const [email, setEmail] = useState("lokeshkumaravel29@gmail.com");
  const [password, setPassword] = useState("111");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const requestBody = {
        email,
        password,
      };

      const response = await fetch(`${baseURL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("userId",data.user.id)
        console.log("Login successful UserId:", data.user);
        alert("Login successful!");
        navigate("/home")
      } else {
        const errorData = await response.json();
        alert(`Login failed: ${errorData.message}`);
        console.error("Login error:", errorData);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again.");
    }
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f4f4f4",
        fontFamily: "Arial, sans-serif",
        padding: "10px",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          borderRadius: "8px",
          backgroundColor: "#ffffff",
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#333",
            marginBottom: "20px",
          }}
        >
          Login
        </h2>

        <label
          style={{
            display: "block",
            marginBottom: "8px",
            color: "#555",
          }}
        >
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "16px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              boxSizing: "border-box",
            }}
          />
        </label>

        <label
          style={{
            display: "block",
            marginBottom: "8px",
            color: "#555",
          }}
        >
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "16px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              boxSizing: "border-box",
            }}
          />
        </label>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            boxSizing: "border-box",
          }}
        >
          Login
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Don't have an account?
          <button
            style={{
              background: "none",
              border: "none",
              color: "#007BFF",
              cursor: "pointer",
            }}
            onClick={() => navigate("/register")} 
          >
            Register here
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
