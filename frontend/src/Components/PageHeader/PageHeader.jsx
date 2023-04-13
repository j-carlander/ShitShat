import React from "react";
import HeaderLogo from "../../assets/image/ShitShatLogo.png";
import "./PageHeader.css";

function PageHeader(props) {
  function handleLoginBtn() {
    props.setShowLoginForm(true);
  }
  return (
    <header className="header-container">
      <h2 className="header-title">Kanal 16</h2>
      <img
        src={HeaderLogo}
        alt="Page logo, warning sign containing a radio"
        width="100"
      />
      <nav>
        {!props.authenticated ? (
          <>
            <button onClick={handleLoginBtn}>Login</button>
            <button>Sign-Up</button>
          </>
        ) : (
          <button>Logout</button>
        )}
      </nav>
    </header>
  );
}

export default PageHeader;
