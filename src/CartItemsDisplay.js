import React, { useEffect, useState } from "react";
import "./CSS/cart.css";
import PlusIcon from "./icons/PlusIcon";
import Close from "./icons/close";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Cookies } from "react-cookie";
import img1 from "./images/cart_image.jpg";
export default function CartItemsDisplay({
  selectedFood,
  setShowCartItems,
  mealsStrored,
}) {
  const cookie = new Cookies();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
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
    axios
      .get("http://localhost:4000/getOrdersDetails")
      .then((res) => {
        setOrders(res.data.orders);
        console.log(res);
      })
      .catch((err) => console.log(err));
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
    const token = cookie.get("token");
    axios
      .post(
        url,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        setName(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container">
      <div className="cartImage">
        <img src={img1} />
      </div>

      <div className="cartDisplay">
        <ul className="cartItems">
          <div className="itemHeader"></div>
          {orders.map((item) => (
            <li className="individualItems" key={item.id}>
              <div>
                <img src={item.img} alt={item.name} height={100} width={100} />
              </div>
              <div className="individualItems_hover"> {item.name}</div>
              <div className="quantity_and_price">
                <span
                  style={{
                    marginLeft: "10px",
                    fontSize: "20px",
                  }}
                >
                  {item.quantity}
                  {/* {quantity[index]} */}
                </span>

                <button
                  style={{
                    border: "none",
                    cursor: "pointer",
                    background: "none",
                    marginLeft: "100px",
                  }}
                  // onClick={() => {
                  //   setQuantity((prevQuantity) => {
                  //     const updatedQuantity = [...prevQuantity]; // Create a copy of the array
                  //     updatedQuantity[index] = updatedQuantity[index] + 1; // Increase the value at index i
                  //     return updatedQuantity; // Return the updated array
                  //   });
                  //   setTotalQuantity(sumQuantity);
                  //   quantityPrice(index);
                  // }}
                >
                  <PlusIcon />
                </button>
              </div>
              <div style={{ marginLeft: "150px", marginTop: "60px" }}>
                {`Rs.${item.price}`}
              </div>
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
