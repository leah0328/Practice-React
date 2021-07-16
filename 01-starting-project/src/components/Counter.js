import { useSelector } from "react-redux";
import classes from "./Counter.module.css";

const Counter = () => {
  const counter = useSelector((state) => state.counter);

  const toggleCounterHandler = () => {};

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

// useSelector :
// provide direct access to the store
// (by allowing us automatically select a part of the state managed by the store)

// useSelector ()
// accepts a function (which will received the state managed by redux )
// return the part of the state we want to extract

// react will automatically set up a subcription to redux store,
// so the component will be updated & received the latest counter automatically
//  whenever that data changes in the Store

// when the component was remove,
