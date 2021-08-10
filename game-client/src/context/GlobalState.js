import React, { createContext, useReducer } from "react";

import appReducer from "./AppReducer";

const initialState = {
  user: {},
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  function setUser(user) {
    dispatch({ type: "SET_USER", user });
  }
  function setUserScore(score) {
    dispatch({ type: "SET_USER_SCORE", score });
  }

  return (
    <GlobalContext.Provider
      value={{
        user: state.user,
        setUser,
        setUserScore
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
