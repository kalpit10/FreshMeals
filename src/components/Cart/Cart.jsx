import { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../Context/Cart-context";
import Checkout from "./Checkout";
import React from "react";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  //submission state
  const [isSubmit, setIsSubmit] = useState(false);
  //After submit check state
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);
  //this will prevent the hard coding down there and we can use this constant now
  const totalAmount = `₹${cartCtx.totalAmount.toFixed(2)}`;

  //to show order button only when we have some items in cart
  const hasItems = cartCtx.items.length > 0;

  function cartItemRemoveHandler(id) {
    cartCtx.removeItem(id);
  }

  function cartItemAddHandler(item) {
    cartCtx.addItem({ ...item, amount: 1 });
  }

  function orderHandler() {
    setIsCheckout(true);
  }

  const submitOrderHandler = async (userData) => {
    setIsSubmit(true);
    await fetch(
      "https://freshmeals-project-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmit(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        //key is provided to list everytime since its a list component
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          //bind ensures that the id of the removed item is passed here to cartItemRemoveHandler
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const orderCloseAction = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    //Sibling JSX code is not allowed
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {/* when isCheckout is true then only we need to show the form */}
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {/* When there is no Checkout we have the order close buttons */}
      {!isCheckout && orderCloseAction}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data..</p>;

  const didSubmitModalContent = (
    <React.Fragment>
      <p>SUCCESS! Order Placed..</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {/* if we didnt submit show modal content */}
      {!isSubmit && !didSubmit && cartModalContent}
      {/* if we have submitted show the submitting message */}
      {isSubmit && isSubmittingModalContent}
      {/* and we have submitted the data, then show other message */}
      {!isSubmit && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
