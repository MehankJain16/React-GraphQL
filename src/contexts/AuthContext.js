import { createContext } from "react";

export const AuthContext = createContext({
  token: null,
  userId: null,
  tokenExp: null,
  toggleSideMenu: () => {},
  login: (token, userId, tokenExp) => {},
  logout: () => {},
});
