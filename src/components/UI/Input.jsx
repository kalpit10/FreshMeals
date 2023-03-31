import React from "react";

import classes from "./Input.module.css";

/* This ref is the forwarded ref which we set in the input.jsx component
      we cannot add ref directly in the custom component so we need to pass it like this */

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      {/* this spread operator part ensures that all the key value pairs in this input object which we receive on this
      props input are added as props to input
      so for eg:- if input object has {type: "text"} then this code will make sure that type:"text" is added */}

      {/* This ref is the forwarded ref which we set in the input.jsx component
      we cannot add ref directly in the custom component so we need to pass it like this */}
      <input ref={ref} {...props.input} />
    </div>
  );
});
export default Input;
