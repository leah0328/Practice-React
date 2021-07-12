import Card from "./Card";
import useCounter from "./hooks/use-counter";

const BackwardCounter = () => {
  const counter = useCounter(false);
  // since the default value is 'true' (for +1),
  // modified the value as 'false' (for -1)

  return <Card>{counter}</Card>;
};

export default BackwardCounter;
