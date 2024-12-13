// import React, { useState } from "react";
// import Login from "./api/Login";
// import Welcome from "./api/Welcome";

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // Function to handle login
//   const handleLogin = (username, password) => {
//     if (username === "Admin" && password === "admin123") {
//       // Save to localStorage
//       localStorage.setItem("username", username);
//       localStorage.setItem("password", password);
//       localStorage.setItem("Role", "Admin");
//       localStorage.setItem("Region", "SouthAsia");
//       localStorage.setItem("LoginTime",new Date().toLocaleTimeString())

//       // Set authentication state
//       setIsAuthenticated(true);
//     } else {
//       alert("Login Failed: Invalid username or password.");
//     }  };

//   return (
//     <div>
//       {
//       isAuthenticated ? (
//         <Welcome />
//       ) : (
//         //setup --1
//         <Login onLogin={handleLogin} />
//         )
// }</div>)
// }

// export default App;

import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [token, setToken] = useState("");
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
//https://localhost:7127/api/Products/GetToken
  // API Base URL
  const apiBaseUrl = "https://localhost:7127/api/Products";

  const getToken = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/GetToken`);
      
      // await axios.post(`${apiBaseUrl}/validate`, {
      //   username: "Ram",
      //   password: "JaiKrishna",
      // });

      // Log the entire response to check the structure
      console.log("API Response:", response.data);
  
      // Fetch the token based on the actual response structure
      const fetchedToken = response.data?.Token || response.data?.token || response.data;
  
      if (fetchedToken) {
        setToken(fetchedToken);
        localStorage.setItem("token", fetchedToken);
        alert("Token fetched and stored in localStorage!");
        alert(`Fetched Token: ${fetchedToken}`);
      } else {
        alert("Token not found in the response.");
      }
    } catch (error) {
      console.error("Error fetching token:", error);
      alert("Failed to fetch token.");
    }
  };
  

  // Fetch Products using Token
  const getProductsByToken = async () => {
    try {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        alert("No token found. Fetch the token first!");
        return;
      }

      const response = await axios.post(`${apiBaseUrl}/GetProductsByToken`, storedToken, {
        headers: { "Content-Type": "application/json" },
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Failed to fetch products. Check the token!");
    }
  };

  // Fetch Customers using Token (no validation)
  const getCustomersByToken = async () => {
    try {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        alert("No token found. Fetch the token first!");
        return;
      }

      const response = await axios.post(`${apiBaseUrl}/GetCustomersByToken`, storedToken, {
        headers: { "Content-Type": "application/json" },
      });
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
      alert("Failed to fetch customers.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>React Token-Based API App</h1>

      {/* Fetch and Store Token */}
      <button onClick={getToken} style={{ margin: "10px" }}>
        Fetch and Store Token
      </button>

      {/* Get Products */}
      <button onClick={getProductsByToken} style={{ margin: "10px" }}>
        Get Products By Token
      </button>

      {/* Get Customers */}
      <button onClick={getCustomersByToken} style={{ margin: "10px" }}>
        Get Customers By Token
      </button>

      {/* Display Products */}
      <div>
        <h2>Products:</h2>
        {products.length > 0 ? (
          <ul>
            {products.map((product, index) => (
              <li key={index}>{product}</li>
            ))}
          </ul>
        ) : (
          <p>No products available.</p>
        )}
      </div>

      {/* Display Customers */}
      <div>
        <h2>Customers:</h2>
        {customers.length > 0 ? (
          <ul>
            {customers.map((customer, index) => (
              <li key={index}>{customer}</li>
            ))}
          </ul>
        ) : (
          <p>No customers available.</p>
        )}
      </div>
    </div>
  );
};

export default App;
