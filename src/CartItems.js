import React, { createContext, useContext, useEffect, useState } from "react";
import { cartContext } from "./App";
import CartItemsDisplay from "./CartItemsDisplay";
import "./CSS/Header.css";

// const cartItemContext = createContext();
export default function CartItems({
  isAddToCart,
  numberOfselectedItems,
  setNumberOfSelectedItems,
  mealName,
  mealPrice,
  selectedFood,
}) {
  const [isClicked, setIsClicked] = useState(false);
  const handleAddToCart = () => {
    console.log(numberOfselectedItems, mealName);
    if (selectedFood.has(mealName)) {
      const numberofItems = selectedFood.get(mealName) + 1;
      selectedFood.set(mealName, numberofItems);
    } else {
      setNumberOfSelectedItems(numberOfselectedItems + 1);
      selectedFood.set(mealName, mealPrice);
    }
  };

  useEffect(() => {
    console.log("isAddtoCart", isAddToCart);
    handleAddToCart();
  }, [isAddToCart]);
  // return (
  //     <cartItemContext.Provider value={selectedFood}>
  // <button
  //   className="cart"
  //   onClick={() => {
  //     setIsClicked(true);
  //   }}
  // >
  //   cart({numberOfselectedItems})
  // </button>
  //       {isClicked && <CartItemsDisplay />}
  //     </cartItemContext.Provider>
  // );
}
// export { cartItemContext };
