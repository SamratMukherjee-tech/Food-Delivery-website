import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/Meals.css";
import MealItems from "./MealItems";

export default function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]);

  useEffect(() => {
    console.log("useEffect in Meals");
    const url = "http://localhost:4000/meals";

    axios
      .get(url)
      .then((response) => {
        setLoadedMeals(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="mealsContainer">
      <ul className="listContainer">
        {loadedMeals.map((meal) => (
          <li>
            <MealItems meal={meal} />
          </li>
        ))}
      </ul>
    </div>
  );
}
