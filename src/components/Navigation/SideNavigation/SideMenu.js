import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./SideMenu.css";
import { AuthContext } from "../../../contexts/AuthContext";

const SideMenu = (props) => {
  const context = useContext(AuthContext);
  return (
    <nav className={`side-menu ${props.show ? "open" : ""}`}>
      <ul>
        {!context.token && (
          <li>
            <NavLink
              onClick={() => {
                context.toggleSideMenu(false);
              }}
              to="/auth"
            >
              Auth Page
            </NavLink>
          </li>
        )}
        <li>
          <NavLink
            onClick={() => {
              context.toggleSideMenu(false);
            }}
            to="/events"
          >
            Events Page
          </NavLink>
        </li>
        {context.token && (
          <React.Fragment>
            <li>
              <NavLink
                onClick={() => {
                  context.toggleSideMenu(false);
                }}
                to="/bookings"
              >
                Bookings Page
              </NavLink>
            </li>
            <li>
              <button onClick={context.logout}>Logout</button>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};

export default SideMenu;
