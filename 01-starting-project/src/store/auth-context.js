import { useEffect, useState, useCallback } from "react";
import React from "react";

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationTime = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationTime);
  if (remainingTime <= 6000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null; // if less then 1 minutes, dont log the user in (not retrive the token)
  }
  return {
    token: storedToken,
    duration: remainingTime, // if remaining Time is more then 1 minutes, log the user in (with the previously stored token/remainingTime)
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken(); // tokenData is the object (line 32/33), since it is the 'return' of retrieveStoredToken

  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }
  // initial token only be avaialable if the remainingTime ubder retriveStoredToken, didnt return 'null'
  // so if there's remainingTime, will use the token from previous session(line 42)

  const [token, setToken] = useState(initialToken); // set the initial State as 'initialToken' instead of null

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token"); // clear the token when we log out
    localStorage.removeItem("expirationTime");

    if (logoutTimer) {
      clearTimeout(logoutTimer); // if a timer was set, clear the time out
    }
  }, []);

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem("token", token);
    // store the assigned token recived from server in local storage,
    //assigned the name as 'token' , value as token (from line 16)
    localStorage.setItem("expirationTime", expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}; // pass the contextValue as a value property for <AuthContext.Provider>
// dont forget to wrap <AuthContext.Provider> over in the app.js

export default AuthContext;
