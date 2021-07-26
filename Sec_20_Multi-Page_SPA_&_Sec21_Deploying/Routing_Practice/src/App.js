import { Route, Switch, Redirect } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Products from "./pages/Products";
import MainHeader from "./components/MainHeader";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <div>
      <MainHeader />
      <main>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/welcome" />
          </Route>
          <Route path="/welcome">
            <Welcome />
          </Route>
          <Route path="/products" exact>
            <Products />
          </Route>
          <Route path="/products/:productId">
            {" "}
            {/* the stuff after ':' will be a dynamic expression*/}
            <ProductDetail />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

// *without 'exact' every toute would be matched here lol (line 12)
// since every route starts with '/'
// and would be redirected all time, creating infinite loop

// if we didnt use <Switch>,
// the DOM will render <ProductDetail> after <Product> on the SAME PAGE

// wrapping <Switch> so that the Dom will only render one of those components
// however if you have multiple similar starting url ( like: "pets/dogs" & "pets/cats" ),
// it will render whichevr that comes first,
// to avoid this, add a 'exact' at the end of the props (line 16)
// 'exact' help render the component that will have the EXACT match of url

export default App;
