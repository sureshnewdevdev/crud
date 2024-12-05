import React from "react";

function Welcome() {
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("Role");
  const region = localStorage.getItem("Region");
  const loginTime = localStorage.getItem("LoginTime");

  return (
    <div>
      <h2>Welcome, {username} - {role}!</h2>
      <h1>{region} - {loginTime}</h1>
      <p>You have successfully logged in.</p>
    </div>
  );
}

export default Welcome;
