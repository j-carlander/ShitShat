import React from "react";
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
    </div>
  );
}

export default PageHeader;
