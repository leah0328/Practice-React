import { useHistory } from "react-router-dom";
import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";

const NewQuote = () => {
  const { sendRequest, status } = useHttp(addQuote); // object desturcturing: extract frunction from useHttp
  const history = useHistory();
  // allows us to change the history of pages visited

  useHttp(() => {
    if (status === "completed") {
      history.push("/quotes");
    }
  }, [status, history]); // history object wont change, but added as dependencies as good practice
  // to navigate away after adding a new quote (as soon as the request completed)

  const addQuoteHandler = (quoteData) => {
    sendRequest(quoteData); // send add quote request
  };

  return (
    <QuoteForm isLoading={status === "pending"} onAddQuote={addQuoteHandler} />
  );
};
// added 'isLoading' so the spinner will take place when redirecting

export default NewQuote;

//programmatic navigation:
// trigger a navigation action & navigate the user away
// ** not a link, but an action-trigger navigation

//history.xx:
//'push'
// push a new page on a stack of pages (added a new pages on the history of pages)
// user can go 'back'

//'replace'
// replaces the current pages, user cant go back
