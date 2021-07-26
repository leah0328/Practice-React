import { Fragment } from "react";
import { useHistory, useLocation } from "react-router-dom";

import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const history = useHistory();
  //allow us to changed / manage url

  const location = useLocation();
  // provide information about the current loaded page & url

  const queryParams = new URLSearchParams(location.search);
  // 'URLSearchParams' (built-in js constructor function)
  // '.search' holds a value of "?sort=asc" as per console
  // and now the 'sort' key also has a value of "acs",
  // since we extract queryParameter (sort) by key
  // so now queryParams, now has a 'sort' key, with a value of 'acs'

  const isSortingAscending = queryParams.get("sort") === "asc";

  const sortedQuotes = sortQuotes(props.quotes, isSortingAscending);

  const changeSortingHandler = () => {
    history.push({
      pathname: location.pathname,
      search: `?sort=${isSortingAscending ? "desc" : "asc"}`,
    });
  };
  // stuctured it into an object for better readability
  // otherwise it look like:
  // history.push(`${location.pathname}?sort=${(isSortingAscending ? "desc" : "asc")}`;

  // so user can go back to the last sorting before they change it
  // 'sort' is the key word, can be named whatever
  // dynamic values : (isSortingAscending ? "desc" : "asc")

  // push() the page will rerender the component

  // 'location' has a property called 'pathname' which has the value of the old path & concrete value

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {isSortingAscending ? "Descending" : "Ascending"}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
