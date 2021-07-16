import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    // updatedTotalAmount = current totalAmount + new item's price * new item's amount(quantity)

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    // (item) means 'every item in the array' (go through evey item in the array)
    // if the new item already existed in the array, it will return the index of the item in the array
    // item.id (each existing cart item's id)
    // action.item.id (the newly added item's id)

    const existingCartItem = state.items[existingCartItemIndex];
    //access the existing cart item index (if any)
    // this wouldnt run if there's no match on the item.id

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      // if the newly added item's already in the array,
      // the updatedItem will consist of the existingCartItem (line 29)
      // and the amount will be the existing item(sushi in cart) (quantity) + new item (new sushi)(quantity)
      // ie. in cart: (sushi x 2), new added item (sushi x1)
      // the cart will show sushi x 3, (instead of sushi, sushi, sushi)

      updatedItems = [...state.items];
      // assign a new array (with copies item from the old array) NOT updating old array)
      // then become the most recent state snapshot

      updatedItems[existingCartItemIndex] = updatedItem;
      //overwrite the old existingCartItemIndex with the updatedItem
      // overwrite the sushi x 2 to sushi x 3
    } else {
      updatedItems = state.items.concat(action.item);
      // concat() built-in JS
      // will return a NEW ARRAY after adding an new item
      // (instead of just append a new item to the previous array)
      // since we depend on the old state snapshot for the future state
      // we dont wanna append new item to the old array,
      // but instead return a NEW array

      // case: burger added for the first time
      // return a NEW array consist of the newly added item

      // In cart (3 sushi), newly added item (1 burger)
      // the cart will show sushi x 3, burger x 1
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    //action.id (not action.item.id) because for removing item,
    // we are dispatching the object that has the id, not the entire item
    // ie. there are Chicken x 3 in the cart, we only want to remove 1 chicken (NOT the entire 'chickenx 3')

    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
      //filter() : returns a new array by applying specific condition
      // (boolean test: the TRUEs will stay in the new array)

      // (item => item.id !== action.id)
      // meaning: (go through evey item in the array),
      // if the item's id IS NOT EQUAL TO action.id (for the item to stay: theanswer to the test should be TRUE)
      // the item WILL BE KEPT in the new array

      // ie. Cart: chicken x 1 , sushi x 1, burger x 1 (item.id), we want to remove sushi(action.id)
      // Is chicken's id NOT the same as sushi? - YES (TRUE)
      // Is burger's id NOT the same as sushi? - YES (TRUE)
      // Is sushi's id NOT the same as sushi? - NO (false)

      // so the new array will only keep chicken and burger
    } else {
      // case: item quantity greater than 0 (not the last one in the cart)
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
      //override the old item quantity (existingCartItemIndex) with the new item quantity(updatedItem)
      // Cart: sushi x 3, (after removing 1 unit), overwirte sushi with sushi x 2
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "CLEAR") {
    return defaultCartState;
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  // the 2nd 'item' on line 122, points at the addItemToCartHandler's (item) argument(line 121)
  // added the 'item': item to forward the item to the reducer function

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "ClEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };
  //to list out the logic for managing the CartContext data
  // so it can be act as the initial'value' for CartContext

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
