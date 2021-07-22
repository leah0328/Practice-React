import { useParams, Route } from "react-router";
import { Fragment, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import Comments from "../components/comments/Comments";
import useHttp from "../hooks/use-http";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { getSingleQuote } from "../lib/api";

const QuoteDetail = () => {
  const match = useRouteMatch();
  const params = useParams();

  const { quoteId } = params; //extract quoteID from params
  // so we can pass it as an argument on line 26, 27
  // instad of the whole param object, which holds many proporty
  // and might affect the useEffct as dependencies

  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);
  //sending request to get SINGLE quote

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return <p>No quote found.</p>;
  }

  if (!loadedQuote.text) {
    return <h1>No quote found.</h1>;
  }

  return (
    <Fragment>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`/quotes/${params.quoteId}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
//line 25
//nested routing: so 'Load comments' wouldnt show after clicking it

// line14
// 'match' object: holds several value items, one of them is 'path'
// 'path' currently holds a value of 'quotes/:quoteId' (what we defined in root component)
// useRouteMatch(); provides flexibility in case we change the root path of any (in app.js)
