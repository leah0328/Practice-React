import { useSelector } from "react-redux";
import classes from "./Counter.module.css";

const Counter = () => {
  const toggleCounterHandler = () => {};

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>-- COUNTER VALUE --</div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

// useSelector :
// provide direct access to the store
// (by allowing us automatically select a part of the state managed by the store)

// useStore :
