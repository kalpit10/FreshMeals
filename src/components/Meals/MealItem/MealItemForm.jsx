import { useRef, useState } from "react";

import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

function MealItemForm(props) {
  const [amountIsValid, setAmountIsValid] = useState(true);
  // The useRef Hook allows you to persist values between renders.
  // useRef() only returns one item. It returns an Object called current.

  // When we initialize useRef we set the initial value: useRef(0).
  const amountInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();
    //current is used with ref so amountInputRef.current will point at the <Input /> element and will look at
    //the ref={} stored
    //now, this value is always a string
    const enteredAmount = amountInputRef.current.value;
    //this will convert it to a number
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      //stop there dont continue if these conditions are met
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          // use that to create a unique id per <Input />:
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ ADD</button>
      {/* Error Message if the if() condition above is not met and setAmountIsValid(false) */}
      {!amountIsValid && <p>Oops! Please enter a valid amount(1-5)</p>}
    </form>
  );
}
export default MealItemForm;
