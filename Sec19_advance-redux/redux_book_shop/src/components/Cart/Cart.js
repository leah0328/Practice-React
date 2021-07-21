import { useSelector } from "react-redux";

import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartItems = useSelector((state) => state.cart.items);
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <CartItem
            key={item.id} // make sure React will create different entry when a new item is added to the cart
            item={{
              id: item.id,
              title: item.name,
              quantity: item.quantity,
              total: item.totalPrice,
              price: item.price,
            }} // map them to addItemToCart()'s item properties from cart-slice
          />
        ))}
      </ul>
    </Card>
  );
};

export default Cart;
