import { createSlice } from "@reduxjs/toolkit";

const initalCartState = {
  items: [],
  totalQuantity: 0,
  changed: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initalCartState,
  reducers: {
    // reducerSSSSS
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

//action creator (for handling side-effects: send HTTP request )
// must be located ourside of redux actions!! (CANT do side-effect stuff in reducer function)
// if we are storing the action creator under the same file as slice.
export const cartActions = cartSlice.actions;

export default cartSlice;
