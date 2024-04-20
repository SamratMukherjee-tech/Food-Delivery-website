import React, { useContext, useState } from "react";
import "../CSS/Meals.css";
import { cartContext } from "../App";
import CartItems from "../CartItems";
import axios from "axios";
export default function MealItems({ meal }) {
  // console.log(meal);
  const { numberOfselectedItems, setNumberOfSelectedItems, selectedFood } =
    useContext(cartContext);
  // console.log(numberOfselectedItems);
  const [isAddToCart, setIsAddToCart] = useState(false);
  const [isbuttonClikced, setIsbuttonClicked] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const handleAddToCart = () => {
    const url = "http://localhost:4000/addMeal";
    axios
      .post(url, { meal: meal })
      .then((res) => {
        console.log("added");
      })
      .catch((err) => {
        console.log("cannot add meals");
      });

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
      <div className="meal-items">
        {" "}
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
