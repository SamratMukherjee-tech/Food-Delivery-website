import React, { useContext, useEffect, useState } from "react";
import "./CSS/Header.css";
import img1 from "./images/header-food-image.jpg";
import { cartContext } from "./App";
import CartItemsDisplay from "./CartItemsDisplay";
import { Link, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Header({ setShowCartItems, setIsLoggedIn }) {
  const cookie = new Cookies();
  const { numberOfselectedItems, setNumberOfSelectedItems, selectedFood } =
    useContext(cartContext);
  const [numberofOrders, setNumberOfOrders] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const url = "http://localhost:4000/getOrders";
    axios
      .get(url)
      .then((res) => {
        console.log("the number of orders are:", res);
        setNumberOfOrders(res.data.numOrders);
      })
      .catch((err) => {
        console.log(err);
      });
  });

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
            dispatch({ type: "SET_NAME", name: "" });
            setIsLoggedIn(false);
            setNumberOfSelectedItems(0);
            selectedFood.clear();
            cookie.remove("token");
          }}
        >
          Logout
        </button>
      </Link>
      <button
        className="cart"
        onClick={() => {
          navigate("/Cart");
          setShowCartItems(true);
        }}
      >
        cart({numberofOrders})
      </button>
    </div>
  );
}
