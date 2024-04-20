import React, { useState } from "react";
import OpenEye from "./icons/OpenEye";
import HideEye from "./icons/HideEye";
import "./CSS/loginForm.css";
import img from "./images/loginPhoto.jpg";
import axios from "axios";
import { Link } from "react-router-dom";
import { Cookies } from "react-cookie";
export default function LoginPage({ setIsLoggedIn }) {
  const cookie = new Cookies();
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [showPassword, setShowPassward] = useState(false);
  const token = cookie.get("token");
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
    console.log("token is:", token);

    const url = "http://localhost:4000/login";
    e.preventDefault();

    axios
      .post(
        url,
        {
          userName: userName,
          password: password,
        }
        // { headers: { Authorization: token } }
      )
      .then((res) => {
        if (res.status === 200) {
          setIsLoggedIn(true);
          console.log("res", res);
          cookie.set("token", res.data.token);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.msg);
      });
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
            // justifyContent: "space-between",
            marginLeft: "-70px",
          }}
        >
          <button
            className="header"
            style={{ borderBottom: "1px solid white" }}
          >
            SIGN IN
          </button>
          <Link to="register">
            <button className="header">SIGN UP</button>
          </Link>
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

          <div style={{}}>
            <button
              type="submit"
              className="submit_button"
              onClick={handleSubmit}
            >
              Submit
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
