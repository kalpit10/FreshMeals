//Will manage CartContext data and provide that context to all the components that want access on it.
import { useReducer } from "react";
import CartContext from "./Cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

//outside the component function because we dont need any data from the component or the surroundings
function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    //checking if the item is already part of the cart
    //findIndex() finds the index of the item in an array
    const existingCartItemIndex = state.items.findIndex(
      //if the item we are adding has the same id with the item that we have added previously
      //will return index only
      (item) => item.id === action.item.id
    );
    //will get the item at that particular index
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        //it will recalculate the amount(existing item + added item)
        amount: existingCartItem.amount + action.item.amount,
      };

      updatedItems = [...state.items];
      //pick the old item and override it with this updated item
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      //here it is only action.id not action.item.id because we are returning id in this action
      //will return index only
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    //decreasing amount and price
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    //if there is ony one item left so remove the item completely from the array
    if (existingItem.amount === 1) {
      //filter() returns a new array which is filtered by applying some conditions and we pass a func to filter
      //that is executed in every item of array and that func receives the item and if we return true we keep the item
      //if we return false we get rid of it.
      //here all items whose id is not equal to that particular id selected are kept
      updatedItems = state.items.filter((item) => item.id !== action.id);
    }
    //or else if the item is more than 1 so decrease the amount of that item
    else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      //so here we are just overwriting the deleted item and updating it
      //that means if we have 2 chilly potatoes we delete one so it updates to 1 amount
      updatedItems[existingCartItemIndex] = updatedItem;
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
}

function CartProvider(props) {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  function addItemToCartHandler(item) {
    //this func can have anything like a number or a string but typically we use a object
    dispatchCartAction({ type: "ADD_ITEM", item: item });
  }

  function removeItemFromCartHandler(id) {
    dispatchCartAction({
      type: "REMOVE_ITEM",
      id: id,
    });
  }

  function clearCartHandler() {
    dispatchCartAction({ type: "CLEAR" });
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}
export default CartProvider;
