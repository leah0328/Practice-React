import { useSelector, useDispatch } from "react-redux";
import classes from "./Counter.module.css";
//see below for class based component equivalant

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);

  const incrementHandler = () => {
    dispatch({ type: "increment" });
  };

  const decrementHandler = () => {
    dispatch({ type: "decrement" });
  };

  const toggleCounterHandler = () => {};

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
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

// connect function:
// helps connect class-based component to Redux
// takes 2 argument (that are functions)

// 1st fn: map REDUX state to props
//  receive redux & return an object where keys are available as props in the receiving component
// (like useSelector)

// 2nd fn: map DISPATCH to props
// store dispatch function in props, so we can execute them as function
// (like useDispatch)

//------------------------------------------//
// class Counter extends Component {
//   incrementHandler() {
//     this.props.increment();
//   }

//   decrementHandler() {
//     this.props.decrement();
//   }

//   toggleCounterHandler() {}

//   render() {
//     return (
//       <main className={classes.counter}>
//         <h1>Redux Counter</h1>
//         <div className={classes.value}>{this.props.counter}</div>
//         <div>
//           <button onClick={this.incrementHandler.bind(this)}>Increment</button>
//           <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
//         </div>
//         <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
//       </main>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     counter: state.counter
//   };
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     increment: () => dispatch({ type: 'increment' }),
//     decrement: () => dispatch({ type: 'decrement' }),
//   }
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Counter);
