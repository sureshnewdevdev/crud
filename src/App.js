import React, { useState } from "react";
import Login from "./api/Login";
import Welcome from "./api/Welcome";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to handle login
  const handleLogin = (username, password) => {
    if (username === "Admin" && password === "admin123") {
      // Save to localStorage
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);

      // Set authentication state
      setIsAuthenticated(true);
    } else {
      alert("Login Failed: Invalid username or password.");
    }  };

  return (
    <div>
      {
      isAuthenticated ? (
        <Welcome />
      ) : (
        <Login onLogin={handleLogin} />
        )
}</div>)
}

export default App;