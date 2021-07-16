import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import store from "./store/index.js";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// if the majority of the app components need access to the store
// it is best to wrap the highest level (App.js) with <Provider>

// have to import 'store' too
// line 11: assigned a value of '{store}'(2nd) to 'store'(1st),
// to help provide the redux Store to the react app
// hence, now all of the child component of app can get data out of the store
