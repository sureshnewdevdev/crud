import React from "react";

function ItemList() {
  const items = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];

  return (
    <div>
      <h1>Fruits List</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}--{index}</li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;
