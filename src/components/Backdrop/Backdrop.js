import React from "react";
import "./Backdrop.css";

const Backdrop = (props) => {
  return (
    <div
      className={`backdrop ${props.show ? "open" : ""}`}
      onClick={props.click}
    ></div>
  );
};

export default Backdrop;
