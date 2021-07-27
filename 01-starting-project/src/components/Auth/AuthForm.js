import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";

import classes from "./AuthForm.module.css";
import AuthContext from "../../store/auth-context";

const AuthForm = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    //validation
    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBDeUCyvbr9KO6zf76BapqPWP0XbOEqado";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBDeUCyvbr9KO6zf76BapqPWP0XbOEqado";
    }
    fetch(url, {
      // after url, the 2nd argument - an object
      method: "POST",
      body: JSON.stringify({
        // stringify the data into Json
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true, // per 'Firebase Authentication API, it should alaways be 'true')
      }),
      headers: {
        // header for the outgoing request
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setIsLoading(false);
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            // look into the response data for more erorr info (response.json->get the data that's coming back, (data)->get access to the actualy resposne da ta)
            let errorMessage = "Authentication failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      }) //after the first .then() on line 45, proceed below
      .then((data) => {
        //console.log(data); // if successful, get access to the data, and catch any potential error (in case there's any)
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000 // transform to number, then milliseconds, see AuthContext line 12, 36 for more (auto logout in 1 hr)
        );
        authCtx.login(data.idToken, expirationTime.toISOString()); //the user will be loggedin if the email/password combo is valid //called 'login' -> 'loginHandler', passed 'token' as payload
        history.replace("/"); // direct user to the page, (user cant 'back' to the previous page)
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending Request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
