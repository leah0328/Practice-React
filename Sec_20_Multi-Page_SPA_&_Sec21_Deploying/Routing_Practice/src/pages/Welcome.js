import { Route } from "react-router-dom";

const Welcome = () => {
  return (
    <section>
      <h1>The Welcome Page</h1>
      <Route path="/welcome/new-user">
        <p>Welcome Stranger!</p>
      </Route>
    </section>
  );
};

export default Welcome;

// Nested Route (line 7-9) : another route inside of the pages
// conditinally render 'some content' (when we have a more specific path)
// the nested route will only be active if the page is active
