import React from "react";
import "./RegistrationForm.css";

function RegistrationForm() {
  console.log("Can you see this message?");

  return (
    <div className="flex-container">
      <h1>Welcome!</h1>
      <p>Register to join us today!</p>
      <form className="registration-form">
        <label className="firstname-label">Firstname</label>
        <input
          className="firstname-input"
          placeholder="Enter firstname"></input>
        <label className="lastname-label">Lastname</label>
        <input className="lastname-input" placeholder="Enter lastname"></input>
        <label className="email-label">Email</label>
        <input className="email-input" placeholder="Enter email"></input>
        <label className="password-label"></label>
        <input className="password-input" placeholder="Enter password"></input>
        <button className="register-btn">Register</button>
      </form>
    </div>
  );
}

export default RegistrationForm;
