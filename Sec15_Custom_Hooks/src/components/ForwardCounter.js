import useCounter from "./hooks/use-counter";
import Card from "./Card";

const ForwardCounter = () => {
  const counter = useCounter();
  // refered to the 'counter' from use-counter.js
  // the same value applied to the 'counter' from line 20

  return <Card>{counter}</Card>;
};

export default ForwardCounter;
