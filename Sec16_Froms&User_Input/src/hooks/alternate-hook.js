import { useReducer } from "react";

const initialState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }
  // under 'INPUT', there's a value property (that carries the entered value), hence action.value
  // 'isTouched: state.isTouched' = apply whatever the current state is

  if (action.type === "BLUR") {
    return { isTouched: true, value: state.value };
  }
  //'value: state.value' = existing value

  if (action.type === "RESET") {
    return { isTouched: false, value: "" };
  }
  return inputStateReducer;
};

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, initialState);

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };

  const inputBlurHandler = (event) => {
    dispatch({ type: "BLUR" }); // no 'event.target.value' sinceit doesnt matter much
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError, // hasError: hasError
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
