import React, { useState } from "react";
import Card from "../UI/Card.js";
import Button from "../UI/Button.js";
import styles from "./AddUser.module.css";
import ErrorModal from "../UI/ErrorModal.js";

const AddUser = (props) => {
  const [enteredUsername, setEnteredUsername] = useState(""); // to collect the entered values using useState
  const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault(); //to prevent the page reload (as the default will submit the form if we don't prevent it)
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Invalid Input",
        message: "Please enter a valid username and age (non-empty values).",
      });
      return;
    }
    if (+enteredAge < 1) {
      // '+' to force enteredAge to be a integer, since enteredAge was initialised as a string
      setError({
        title: "Invalid Age",
        message: "Please enter a valid age (>0).",
      });
      return;
    }
    props.onAddUser(enteredUsername, enteredAge);
    // point to the onAddUser from APP.js, which will then call the AddUserHandler function (then setUsersList) inside App.js
    // By pass enteredUser & enteredAge as argument,
    // we are forwarding the entered data to the APP.js on every click (addUser button) inside AddUser.js component

    setEnteredUsername(""); // set to empty string after submit, after inserting 'value={}' to the input
    setEnteredAge("");
  };

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}
      {/*ErrorModal will only pop up when there is an error*/}
      <Card className={styles.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={enteredUsername}
            onChange={usernameChangeHandler}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            value={enteredAge}
            onChange={ageChangeHandler}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div> // without the div, will get Adjacent Error(React doesnt allow 2 side by side components being rendered)
  );
};

export default AddUser;
