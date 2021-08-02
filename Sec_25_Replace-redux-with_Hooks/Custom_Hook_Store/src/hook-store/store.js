import React, { useEffect, useState } from "react";

let globalState = {};
let listeners = []; //an array full of functions
let actions = {};
// these variables are declared outside of the useStore hook,
// so their values will be shared globally (where imported), instead of each .js having dfferent values

export const useStore = (shouldListen = true) => {
  const setState = useState(globalState)[1];

  const dispatch = (actionIdentifier, payload) => {
    const newState = actions[actionIdentifier](globalState, payload); //trigger the action (that is targeted (with actionItdentifier) on the globalState objects)
    globalState = { ...globalState, ...newState }; // update global state whenevr we dispatch the action

    for (const listener of listeners) {
      listener(globalState); // listen to the global state (a hack from using useState), so any compoennet that use the useStore will rerender whenevr gloval state is updated
    }
  };

  useEffect(() => {
    if (shouldListen) {
      listeners.push(setState); // register 1 listerner per component
    }
    return () => {
      if (shouldListen) {
        listeners = listeners.filter((li) => li !== setState);
      }
    };
  }, [setState, shouldListen]);
  // line 24-27: cleanup function
  // unregister the listerner from the component when it is destroyed

  return [globalState, dispatch];
};

export const initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }
  actions = { ...actions, ...userActions };
};
// not replacing the glbal state nor actions,
// but merge them with the new global state & actions
// so that we can create concrete store slices

// line 11 : push(): return a new array after adding a new item to the array
// line 14: filter(): creates a new array with all elements that pass the test implemented by the provided function.
