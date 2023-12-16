import React, { useContext, useState } from "react";
import "../CSS/Meals.css";
import { cartContext } from "../App";
import CartItems from "../CartItems";
export default function MealItems({ meal }) {
  // console.log(meal);
  const { numberOfselectedItems, setNumberOfSelectedItems, selectedFood } =
    useContext(cartContext);
  // console.log(numberOfselectedItems);
  const [isAddToCart, setIsAddToCart] = useState(false);
  const [isbuttonClikced, setIsbuttonClicked] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const handleAddToCart = () => {
    setIsAddToCart(!isAddToCart);
    setIsbuttonClicked(true);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };
  const handleAddToCartButton = () => {};

  return (
    <div>
      {/* {showAlert &&
        // <div
        //   className="alert alert-success"
        //   style={{ position: "fixed", top: "0", margin: "10px", right: "1" }}
        //   role="alert"
        // >
        //   Item Added
        // </div>
        alert("Your food has been added")} */}
      <div className="meal-items">
        {/* <div className="meal-items-img"> */}
        <img src={meal.img} alt={meal.name} height={200} width={250} />
        {/* </div> */}
        <p className="meal-items-name">{meal.name}</p>
        <p className="meal-items-price">{meal.price}</p>
        <p className="meal-items-description">{meal.description}</p>
        <button className="meal-items-cart" onClick={handleAddToCart}>
          Add to cart
        </button>

        {isbuttonClikced && (
          <CartItems
            isAddToCart={isAddToCart}
            numberOfselectedItems={numberOfselectedItems}
            setNumberOfSelectedItems={setNumberOfSelectedItems}
            mealName={meal.name}
            mealPrice={meal.price}
            selectedFood={selectedFood}
          />
        )}
      </div>
    </div>
  );
}
