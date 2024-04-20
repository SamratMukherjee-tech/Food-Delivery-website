import React, { useState } from "react";
import OpenEye from "./icons/OpenEye";
import HideEye from "./icons/HideEye";
import "./CSS/loginForm.css";
import img from "./images/loginPhoto.jpg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
export default function RegisterPage({ setIsLoggedIn }) {
  const cookie = new Cookies();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [showPassword, setShowPassward] = useState(false);
  const [mobile, setMobile] = useState("");
  const hidePassword = () => {
    setShowPassward(!showPassword);
  };
  const handleUserName = (e) => {
    setUserName(e.target.value);
  };
  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    const url = "http://localhost:4000/register";
    e.preventDefault();
    setIsLoggedIn(false);
    axios
      .post(url, {
        userName: userName,
        password: password,
        mobile: mobile,
      })
      .then((res) => {
        console.log("res", res);
        cookie.set("token", res.data.token);
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/login");
  };

  return (
    <div className="container">
      <form
        className="form_parent"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "-70px",
            width: "100%",
          }}
        >
          <Link to="/login">
            <button className="header">SIGN IN</button>
          </Link>
          <button
            className="header"
            style={{ borderBottom: "1px solid white" }}
          >
            SIGN UP
          </button>
        </div>
        <div style={{ marginTop: "50px" }}>
          <label htmlFor="userName" className="label_items">
            USERNAME
          </label>
          <br />
          <input
            id="userName"
            name="userName"
            className="input_field"
            value={userName}
            onChange={handleUserName}
          />
          <br />
          <label htmlFor="password" className="label_items">
            PASSWORD
          </label>
          <br />
          <div className="input">
            <input
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              className="input_field"
            />

            <button onClick={hidePassword} className="hide_button">
              {showPassword ? <OpenEye /> : <HideEye />}
            </button>
          </div>
          <label htmlFor="userName" className="label_items">
            Mobile Number
          </label>
          <br />
          <input
            id="userName"
            name="userName"
            className="input_field"
            value={mobile}
            onChange={(e) => {
              setMobile(e.target.value);
            }}
          />
          <br />
          <div style={{}}>
            <button
              type="submit"
              className="submit_button"
              onClick={handleSubmit}
            >
              Create Account
            </button>
            <button
              className="reset_button"
              onClick={() => {
                setPassword("");
                setUserName("");
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </form>
      <img src={img} alt="table-photo" height="720" width="1200" />
    </div>
  );
}
