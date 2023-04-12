import React from "react";
import { Link } from "react-router-dom";
import HeaderLogo from "../../assets/image/ShitShatLogo.png";
import "./PageHeader.css";

function PageHeader() {
  return (
    <div className="header-container">
      <section className="header-section">
        <button className="header_return-btn">Back</button>
        <h2 className="header-title">Kanal 16</h2>
        <button className="settings-btn">Settings</button>
      </section>
      <img
        src={HeaderLogo}
        alt="Page logo, warning sign containing a radio"
        width="100"
      />
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/register">Sign up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default PageHeader;
