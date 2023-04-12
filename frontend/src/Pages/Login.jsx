import React from "react";
import "./Styles/Login.css";

export default function Login() {
  console.log("/login " + "Can you see this message?");
  return (
        <div className="login-container"> 
          <form className="login-form">
            <label>Email:</label>
            <input type="email" placeholder="Enter email..."/>
            <label>Password:</label>
            <input type="password" placeholder="Enter password..." />
          </form>
        </div>
  );
}
