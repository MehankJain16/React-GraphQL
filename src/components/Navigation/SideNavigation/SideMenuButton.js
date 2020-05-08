import React from "react";
import "./SideMenuButton.css";

const SideMenuButton = (props) => {
  return (
    <button
      className={`toggle-button ${props.toggleAnimation ? "active" : ""}`}
      onClick={props.click}
    >
      <div className="toggle-button__line bar-1"></div>
      <div className="toggle-button__line bar-2"></div>
      <div className="toggle-button__line bar-3"></div>
    </button>
  );
};

export default SideMenuButton;
