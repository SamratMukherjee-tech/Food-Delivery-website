import React, { useContext, useState } from "react";
import "./CSS/Header.css";
import img1 from "./images/header-food-image.jpg";
import { cartContext } from "./App";
import CartItemsDisplay from "./CartItemsDisplay";
import { Link } from "react-router-dom";
export default function Header({ setShowCartItems, setIsLoggedIn }) {
  const { numberOfselectedItems, setNumberOfSelectedItems, selectedFood } =
    useContext(cartContext);
  // console.log(cartContext);
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div>
      {
        <img
          src={img1}
          height={30}
          width={30}
          style={{ marginTop: "20px", marginLeft: "50px" }}
        />
      }
      <span className="organisation">ZOMATO</span>
      <Link to={"/"}>
        <button
          className="cart"
          style={{ marginRight: "50px" }}
          onClick={() => {
            setIsLoggedIn(false);
          }}
        >
          Logout
        </button>
      </Link>
      <button
        className="cart"
        onClick={() => {
          setShowCartItems(true);
        }}
      >
        cart({numberOfselectedItems})
      </button>
    </div>
  );
}
