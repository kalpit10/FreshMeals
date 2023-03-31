import { useContext, useEffect, useState } from "react";

import CartIcon from "../Cart/CartIcon";
import CartContext from "../../Context/Cart-context";
import classes from "./HeaderCartButton.module.css";

//using the useContext here the HeaderCartButton Component will be re-evaluated by React whenever the context changes.
//and it will be updated in the CartProvider component
function HeaderCartButton(props) {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);

  //we used object destructuring here because if down there we used cartCtx.items.length === 0 and used cartCtx as a
  //dependency then everytime cartCtx changes useEffect is invoked but we only want that if the items changed so we used
  //Object Destructuring..
  const { items } = cartCtx;

  //reduce method transforms the array of data into a single value(number)
  //takes 2 parameters, first is the function and second is a starting value
  //items is the value in the context object(an array)
  //HERE ALSO OBJECT DESTRUCTURING USED INSTEAD OF cartCtx.items WE JUST USED items
  const numberOfCartItems = items.reduce((currNumber, item) => {
    //at first the value will be 0 but after that it will run this expression
    return currNumber + item.amount;
  }, 0);

  //for the header cart button bumping animation
  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : " "
  }`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 200);
    //CLEANUP FUNCTION FOR CLEARING THE TIMER, USE THIS EVERYTIME YOU USE A TIMER
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>My Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
}
export default HeaderCartButton;
