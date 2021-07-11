import React, { useState, Fragment } from "react";

import AddUser from "./components/Users/AddUser.js";
import UsersList from "./components/Users/UsersList.js";

function App() {
  const [usersList, setUsersList] = useState([]);

  const addUserHandler = (uName, uAge) => {
    setUsersList((prevUsersList) => {
      return [
        ...prevUsersList,
        { name: uName, age: uAge, id: Math.random().toString() },
      ];
      // to update state (that relies on previous state), pass an function as the arguement(prevUserList)
      // since we want to update the list,
      // by appending the list with NEW user data, along with all the PREVIOUS user data

      // also with the id:math.random()... we can assign an unique id for each user
    });
  };

  return (
    <Fragment>
      <AddUser onAddUser={addUserHandler} />
      <UsersList users={usersList} />
    </Fragment>
  );
}

export default App;
