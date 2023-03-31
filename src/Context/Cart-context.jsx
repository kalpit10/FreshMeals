import React from "react";
// Context provides a way to pass data through the component tree without having to pass props down manually at every level.
const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  //it will receive the item that should be added
  addItem: (item) => {},
  //it receives an id of the item which should be removed from the cart
  removeItem: (id) => {},
  clearCart: () => {},
});
export default CartContext;
