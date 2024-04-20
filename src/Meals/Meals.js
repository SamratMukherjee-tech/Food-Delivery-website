import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/Meals.css";
import MealItems from "./MealItems";
import { Cookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Meals({ setMealsStored }) {
  const navigate = useNavigate();
  const [loadedMeals, setLoadedMeals] = useState([]);
  const cookie = new Cookies();
  useEffect(() => {
    console.log("useEffect in Meals");
    const url = "http://localhost:4000/meals";
    const token = cookie.get("token");
    axios
      .get(url, { headers: { Authorization: token } })
      .then((response) => {
        setLoadedMeals(response.data);
        setLoadedMeals(response.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          navigate("/login");
        }
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
