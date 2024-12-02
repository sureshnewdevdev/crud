import React from "react";

function Welcome() {
  const username = localStorage.getItem("username");

  return (
    <div>
      <h2>Welcome, {username}!</h2>
      <p>You have successfully logged in.</p>
    </div>
  );
}

export default Welcome;
