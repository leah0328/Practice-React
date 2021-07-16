const redux = require("redux");

const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === "increment") {
    return {
      counter: state.counter + 1,
    };
  }
  if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
    };
  }
};
// state (the old state)
// counter (the old/existing counter value)

const store = redux.createStore(counterReducer);
// need to pass counterReducer as to the creteStore(),
// since the store has to know which reducer function is passing state to store

const counterSubscriber = () => {
  const latestState = store.getState(); // will get the laetst state snapshot
  console.log(latestState);
};
// subcriber should not have any parameter, but hold a function
// subcribe() will be triggerred whenever the state changes

store.subscribe(counterSubscriber);
// subcribe() expect a function which Redux will then execute whenever the state changes
// so subribe() expect the subcriber(line 15) as parameter

store.dispatch({ type: "increment" });
store.dispatch({ type: "decrement" });
