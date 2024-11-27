import axios from "axios";

// Create an Axios instance
// local
// const axiosInstance = axios.create({
//   baseURL: "https://localhost:7233/api", // Replace with your API's base URL
//   timeout: 10000, // Optional: Set a timeout for requests (10 seconds)
//   headers: {
//     "Content-Type": "application/json", // Default headers for requests
//   },
// });

// Deployed code at real time
const axiosInstance = axios.create({
  baseURL: " https://webapplication120241127085146.azurewebsites.net/api", // Replace with your API's base URL
  timeout: 10000, // Optional: Set a timeout for requests (10 seconds)
  headers: {
    "Content-Type": "application/json", // Default headers for requests
  },
});

// Request interceptor for logging and adding custom headers
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`Sending request to ${config.baseURL}${config.url}`);
    // Example: Add an authorization token if needed
    // config.headers.Authorization = `Bearer ${yourToken}`;
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for logging and handling errors
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response received:", response);
    return response;
  },
  (error) => {
    console.error("Response error:", error);
    // Optionally, you can handle specific status codes here
    if (error.response) {
      // Server responded with a status code outside 2xx
      console.error(`Error ${error.response.status}:`, error.response.data);
    } else if (error.request) {
      // No response was received from the server
      console.error("No response received:", error.request);
    } else {
      // Something else happened during the request setup
      console.error("Error setting up request:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
