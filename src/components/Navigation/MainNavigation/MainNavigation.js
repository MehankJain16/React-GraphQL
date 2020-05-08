import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import SideMenuButton from "../SideNavigation/SideMenuButton";
import "./MainNavigation.css";
import { AuthContext } from "../../../contexts/AuthContext";

const MainNavigation = (props) => {
  const context = useContext(AuthContext);
  return (
    <header className="main__nav">
      <div className="nav__logo">
        <h2>EasyEvents</h2>
      </div>
      <nav className="nav__item">
        <ul>
          {!context.token && (
            <li>
              <NavLink to="/auth">Auth Page</NavLink>
            </li>
          )}
          <li>
            <NavLink to="/events">Events Page</NavLink>
          </li>
          {context.token && (
            <React.Fragment>
              <li>
                <NavLink to="/bookings">Bookings Page</NavLink>
              </li>
              <li>
                <button onClick={context.logout}>Logout</button>
              </li>
            </React.Fragment>
          )}
        </ul>
      </nav>
      <div className="nav__toggler">
        <SideMenuButton
          click={props.menuClickHandler}
          toggleAnimation={props.toggleAnimation}
        />
      </div>
    </header>
  );
};

export default MainNavigation;
