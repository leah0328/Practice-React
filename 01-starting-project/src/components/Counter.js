import { useSelector, useDispatch } from "react-redux";
import { counterActions } from "../store/counter-slice";
import classes from "./Counter.module.css";
//see below for class based component equivalant

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter.counter);
  // 1st counter = 'counter' the identifier from store/index.js (line 8)
  // 2nd counter = {counter:0} from store/counter-slice.js initialCounterState's counter (line 3)
  const show = useSelector((state) => state.counter.showCounter);

  const incrementHandler = () => {
    dispatch(counterActions.increment());
  };
  // execute '.increment' as a method

  // as when 'increment()' executed,
  // it creates a full action object
  // with the type set to the automatically created unique action identifier(increment, decrement ... )

  const increaseHandler = () => {
    dispatch(counterActions.increase(10));
  };
  // pass the payload data (action.amount) to the increase()method
  // can pass payload like counterActions.increase({action.payload: 10})

  //these {ie. increment, increase .. } are called 'unique identifier'
  // the extra data associated with it, is called payload (have to use this name)
  // hence the {action.PAYLOAD:10}, not {action.amount: 10} on line 24
  // see store/index.js (line 19)

  const decrementHandler = () => {
    dispatch(counterActions.decrement());
  };

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increment by 10</button>
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
