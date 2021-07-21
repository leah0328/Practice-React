import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

// action creator: a function that creates and returns an action object
// we then use it by passing the action object to dispatch() in the target file
// see app.js

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        " https://react-http-9aa41-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("couldnt not fetch cart data!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData(); // fetch cart data from firebase, so the cart wouldnt be cleared everytime we reload
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        }) // make sure the 'items' wouldnt ended up being 'undefined', instead it would be an empty array
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Failed to fetch cart data.",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  //argument name should match with line 69
  return async (dispatch) => {
    //can convert the dispatch() into a async
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Pending...",
        message: "Sending cart data...",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-http-9aa41-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
            // if we write 'body: JSON.stringify(cart)
            // the firebase will also received the 'changed:true'
            // since it is considered as part of the cart object
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send cart data.");
      }
    };
    //-----------------------------------------
    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Successfully sent cart data",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Failed to send cart data.",
        })
      );
    }
  };
};
