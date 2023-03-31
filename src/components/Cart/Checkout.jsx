import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isSixDigPin = (value) => value.trim().length !== 6;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    address: true,
    city: true,
    pin: true,
  });
  //For checking the validation of the form at the end all at once
  const nameInputRef = useRef();
  const addressInputRef = useRef();
  const pinInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    //current gives us the access to the actual value stored in the ref
    const enteredName = nameInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredPin = pinInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    //its valid if the isEmpty is not empty
    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredAddIsValid = !isEmpty(enteredAddress);
    const enteredPinIsValid = !isSixDigPin(enteredPin);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputsValidity({
      name: enteredNameIsValid,
      address: enteredAddIsValid,
      city: enteredCityIsValid,
      pin: enteredPinIsValid,
    });
    const formIsValid =
      enteredNameIsValid &&
      enteredAddIsValid &&
      enteredCityIsValid &&
      enteredPinIsValid;

    //STOP IF THE FORM IS INVALID
    if (!formIsValid) {
      return;
    }

    //WE WILL CHECK THE DATA IN FIREBASE AS WELL BECAUSE WE CANNOT TRUST USER DATA
    //THIS IS HOW WE SEND THE DATA FROM CHECKOUT COMPONENT TO CART COMPONENT
    props.onConfirm({
      name: enteredName,
      address: enteredAddress,
      pin: enteredPin,
      city: enteredCity,
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          formInputsValidity.name ? " " : classes.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Enter a valid Name!</p>}
      </div>

      <div
        className={`${classes.control} ${
          formInputsValidity.address ? " " : classes.invalid
        }`}
      >
        <label htmlFor="address">Address</label>
        <input type="text" id="address" ref={addressInputRef} />
        {!formInputsValidity.address && <p>Enter a valid Address!</p>}
      </div>

      <div
        className={`${classes.control} ${
          formInputsValidity.pin ? " " : classes.invalid
        }`}
      >
        <label htmlFor="pincode">Pincode</label>
        <input type="text" id="pincode" ref={pinInputRef} />
        {!formInputsValidity.pin && <p>Enter a valid Pincode(6 digits!)</p>}
      </div>

      <div
        className={`${classes.control} ${
          formInputsValidity.name ? " " : classes.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Enter a valid city!</p>}
      </div>

      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
