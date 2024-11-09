import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { baseURL } from '../config';
const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const requestBody = {
        username,
        email,
        password,
      };
      const response = await fetch(`${baseURL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Registration successful:", data);
        alert("Registration successful!");
        navigate('/login')
      } else {
        const errorData = await response.json();
        alert(`Registration failed: ${errorData.message}`);
        console.error("Registration error:", errorData);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred during registration. Please try again.");
    }
  };
  

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f4f4f4',
      fontFamily: 'Arial, sans-serif',
      padding: '10px'
    }}>
      <form onSubmit={handleRegister} style={{
        width: '100%',
        maxWidth: '400px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        borderRadius: '8px',
        backgroundColor: '#ffffff',
        boxSizing: 'border-box'
      }}>
        <h2 style={{
          textAlign: 'center',
          color: '#333',
          marginBottom: '20px'
        }}>Register</h2>

        <label style={{
          display: 'block',
          marginBottom: '8px',
          color: '#555'
        }}>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '16px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
        </label>

        <label style={{
          display: 'block',
          marginBottom: '8px',
          color: '#555'
        }}>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '16px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
        </label>

        <label style={{
          display: 'block',
          marginBottom: '8px',
          color: '#555'
        }}>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '16px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
        </label>

        <label style={{
          display: 'block',
          marginBottom: '8px',
          color: '#555'
        }}>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '16px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
        </label>

        <button type="submit" style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#4CAF50',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px',
          boxSizing: 'border-box'
        }}>
          Register
        </button>

        <p style={{
          textAlign: 'center',
          marginTop: '20px'
        }}>
          Already have an account? 
          <button 
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#007BFF', 
              cursor: 'pointer' 
            }}
            onClick={() => navigate('/')}  
          >
            Login here
          </button>
        </p>
      </form>
    </div>
  );
};

export default Register;
