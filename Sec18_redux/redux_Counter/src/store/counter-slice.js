import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
  name: "counter",
  initialState: initialCounterState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter = state.counter + action.payload;
    }, // the extra data associated with the unique identifier,
    // is called payload (have to use this name)
    // hence action.payload, not action.amount (line 16)

    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

export const counterActions = counterSlice.actions;
//counterActions consists of all the logics we detailed  (line 10-20)

export default counterSlice.reducer;
//since we only need the reducer function in index.js
