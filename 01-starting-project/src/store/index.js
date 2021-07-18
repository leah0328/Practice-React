import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter-slice";
import authReducer from "./auth-slice";
// call it xxReducer since we only export xx.reducer from both xx-slice.js

const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
});
// '.reducer'  to get access to the reducer setup  (line 10-20)

//createStore(), pass 'xx.reducer', not reducer's'
// it is treated as 1 main reducer (for global state)

// configureStore (it takes object, not reducer function like createStore )
// for configrueStore, the value for reducer can be a single reducer

// if we have multiple reducer functions,
// we can do this instead:
//    const store = configureStore({
//      reducer: {
//        A: aSlice.reducer,
//        B: bSlice.reducer
//      }
//    });
// so configureStore() will automatically merge all of those single recucer functions,
// into a big, main reducer function

// however, there's only 1 reducer, so it is not applicable in this case

export default store;
