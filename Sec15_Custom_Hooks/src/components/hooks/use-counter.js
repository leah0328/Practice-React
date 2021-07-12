import { useEffect, useState } from "react";

const useCounter = (forwards = true) => {
  // setting a default value 'forwards = true'
  // so it is modifiable
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (forwards) {
        setCounter((prevCounter) => prevCounter + 1);
      } else {
        setCounter((prevCounter) => prevCounter - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [forwards]);
  // so when 'forwards' changes, the whole block of code runs gain

  return counter;
};
// the counter 'state', from line 4

// custom hooks rules:
// name: starts with 'useXxxx'
// reutrn: anything, ie. int, str,array
export default useCounter;
