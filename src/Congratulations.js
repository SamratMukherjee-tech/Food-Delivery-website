import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "./images/congratulations.gif";
import "./CSS/congrats.css";
import { useSelector } from "react-redux";
export default function Congratulations({ setShowCartItems }) {
  const navigate = useNavigate();
  const name = useSelector((state) => state.name);
  console.log("Hello World", name);
  return (
    <div className="container">
      <div className="box">
        <p style={{ marginLeft: "0px" }}>
          Hello {name} your order Has been placed
        </p>
        <img src={img1} alt="congrats" width={500} height={300} />
        <button
          className="back-button"
          onClick={() => {
            setShowCartItems(false);
            navigate("/home");
          }}
        >
          Back to Orders
        </button>
      </div>
    </div>
  );
}
