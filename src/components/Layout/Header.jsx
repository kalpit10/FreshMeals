import { Fragment } from "react";

import HeaderCartButton from "./HeaderCartButton";
import mealsImage from "../assets/Indian.png";
import classes from "./Header.module.css";

function Header(props) {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>FreshMeals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>

      {/* The css class has - with it so cant use the dot notation */}
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="Table of delicious food" />
      </div>
    </Fragment>
  );
}
export default Header;
