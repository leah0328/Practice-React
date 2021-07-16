import React, { useState } from 'react';
import Meals from './components/Meals/Meals';
import Header from './components/Layout/Header';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCardHandler = () =>{
    setCartIsShown(true);
  };

  const hideCartHandler = ()=> {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler}/>}
      <Header onShowCart={showCardHandler}/>
        <main>
          <Meals />
        </main>
    </CartProvider>
  );
}

export default App;