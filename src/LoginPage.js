import React, { useState } from "react";
import OpenEye from "./icons/OpenEye";
import HideEye from "./icons/HideEye";
import "./CSS/loginForm.css";
import img from "./images/loginPhoto.jpg";
export default function LoginPage({ setIsLoggedIn }) {
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [showPassword, setShowPassward] = useState(false);
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
    e.preventDefault();
    setIsLoggedIn(true);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form_parent">
        <div className="header">SIGN IN</div>
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
            <button type="submit" className="submit_button">
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
