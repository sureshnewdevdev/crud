import React, { useEffect, useState } from "react";
import axiosInstance from "./api/axiosInstance";

const App = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/products");
      setProducts(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Add a new product
  const addProduct = async () => {
    try {
      const newProduct = { name: "Tablet", price: 299.99 };
      await axiosInstance.post("/products", newProduct);
      fetchProducts(); // Refresh products
    } catch (err) {
      setError(err.message);
    }
  };

  // Update a product
  const updateProduct = async (id) => {
    try {
      const updatedProduct = { name: "Updated Laptop", price: 1099.99 };
      await axiosInstance.put(`/products/${id}`, updatedProduct);
      fetchProducts(); // Refresh products
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete a product
  const deleteProduct = async (id) => {
    try {
      await axiosInstance.delete(`/products/${id}`);
      fetchProducts(); // Refresh products
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price.toFixed(2)}
            <button onClick={() => updateProduct(product.id)}>Update</button>
            <button onClick={() => deleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={addProduct}>Add Product</button>
    </div>
  );
};

export default App;
