import React, { useEffect, useState } from "react";
import "./CSS/cart.css";
import PlusIcon from "./icons/PlusIcon";
import Close from "./icons/close";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
export default function CartItemsDisplay({ selectedFood, setShowCartItems }) {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const dispatch = useDispatch();
  const sumQuantity = () => {
    let sum = 0;
    quantity.forEach((x) => {
      sum = sum + x;
    });
    return sum + 1;
  };
  const quantityPrice = (index) => {
    const updatedPrice = [...price];
    updatedPrice[index] = updatedPrice[index] * (quantity[index] + 1);
    setTotalCost(totalCost + price[index]);
    console.log(totalCost);
  };
  const [arr, setArr] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(sumQuantity);
  const [name, setName] = useState("");
  const [price, setPrice] = useState([]);

  useEffect(() => {
    const foodNames = Array.from(selectedFood.keys());
    const foodPrices = Array.from(selectedFood.values());
    console.log(selectedFood);
    for (let index = 0; index < foodNames.length; index++) {
      setQuantity((prevState) => {
        return [...prevState, 1];
      });
    }
    setArr(foodNames);

    for (let index = 0; index < foodPrices.length; index = index + 1) {
      setPrice((prevState) => {
        return [...prevState, foodPrices[index]];
      });
    }
    let sum = 0;
    foodPrices.forEach((x) => {
      sum += x;
    });
    setTotalCost(sum);
    console.log("Updated arr:", selectedFood);
    setTotalQuantity(foodNames.length);
  }, [selectedFood]);

  useEffect(() => {
    const url = "http://localhost:4000/congrats";
    axios
      .post(url, {})
      .then((res) => {
        setName(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container">
      <div className="cartDisplay">
        <button
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            cursor: "pointer",
            background: "none",
            border: "none",
          }}
          onClick={() => {
            setShowCartItems(false);
          }}
        >
          <Close />
        </button>
        <ul className="cartItems">
          <div className="itemHeader">
            <span>Name</span>
            <span>Quantity</span>
          </div>
          {arr.map((item, index) => (
            <li className="individualItems" key={index}>
              <span className="individualItems_hover"> {item}</span>
              <span>
                {" "}
                {quantity[index]}
                <button
                  style={{
                    border: "none",
                    margin: "0",
                    cursor: "pointer",
                    background: "none",
                  }}
                  onClick={() => {
                    setQuantity((prevQuantity) => {
                      const updatedQuantity = [...prevQuantity]; // Create a copy of the array
                      updatedQuantity[index] = updatedQuantity[index] + 1; // Increase the value at index i
                      return updatedQuantity; // Return the updated array
                    });
                    setTotalQuantity(sumQuantity);
                    quantityPrice(index);
                  }}
                >
                  <PlusIcon />
                </button>
              </span>
            </li>
          ))}
        </ul>
        <div className="footer">
          <span style={{ marginLeft: "15%" }}>Total</span>

          <span style={{ marginLeft: "15%" }}>{totalCost}</span>
          {}
        </div>

        <button
          className="order_button"
          onClick={() => {
            if (totalCost > 0 && name !== "") {
              dispatch({ type: "SET_NAME", name });
              navigate("/congrats");
            } else {
              if (name === "") {
                const userConfirm = window.confirm(
                  "Login before you place an order"
                );
                if (userConfirm) navigate("/login");
              } else alert("No items selected");
            }
          }}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
