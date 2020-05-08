import React, { Fragment, useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import Bookings from "./pages/Booking/Bookings";
import Events from "./pages/Event/Events";
import MainNavigation from "./components/Navigation/MainNavigation/MainNavigation";
import SideMenu from "./components/Navigation/SideNavigation/SideMenu";
import Backdrop from "./components/Backdrop/Backdrop";
import { AuthContext } from "./contexts/AuthContext";

const App = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const localAuthData = JSON.parse(
    localStorage.getItem("authData")
      ? localStorage.getItem("authData")
      : JSON.stringify({ token: null, userId: null, tokenExp: null })
  );

  const [authData, setAuthData] = useState({
    token: localAuthData.token,
    userId: localAuthData.userId,
    tokenExp: localAuthData.tokenExp,
  });

  const sideMenuButtonClickHandler = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const backdropClickHandler = () => {
    setIsSideMenuOpen(false);
  };

  const login = (token, userId, tokenExp) => {
    setAuthData({ token, userId, tokenExp });
    localStorage.setItem(
      "authData",
      JSON.stringify({ token, userId, tokenExp })
    );
  };

  const logout = () => {
    setAuthData({ token: null, userId: null, tokenExp: null });
    setIsSideMenuOpen(false);
    localStorage.setItem(
      "authData",
      JSON.stringify({ token: null, userId: null, tokenExp: null })
    );
  };

  const toggleSideMenu = () => {
    setIsSideMenuOpen(false);
  };

  // const saveAuth = () => {};

  useEffect(() => {
    localStorage.setItem("authData", JSON.stringify(authData));
  }, [authData]);

  return (
    <BrowserRouter>
      <Fragment>
        <AuthContext.Provider
          value={{
            token: authData.token,
            userId: authData.userId,
            tokenExp: authData.tokenExp,
            toggleSideMenu: toggleSideMenu,
            login: login,
            logout: logout,
          }}
        >
          <MainNavigation
            menuClickHandler={sideMenuButtonClickHandler}
            toggleAnimation={isSideMenuOpen}
          />
          <SideMenu show={isSideMenuOpen} />
          <Backdrop click={backdropClickHandler} show={isSideMenuOpen} />
          <main className="main__content">
            <Switch>
              {authData.token && <Redirect from="/" exact to="/events" />}
              {authData.token && <Redirect from="/auth" exact to="/events" />}
              {!authData.token && <Route path="/auth" exact component={Auth} />}
              <Route path="/events" exact component={Events} />
              {authData.token && (
                <Route path="/bookings" exact component={Bookings} />
              )}
              {!authData.token && <Redirect exact to="/auth" />}
            </Switch>
          </main>
        </AuthContext.Provider>
      </Fragment>
    </BrowserRouter>
  );
};

export default App;
