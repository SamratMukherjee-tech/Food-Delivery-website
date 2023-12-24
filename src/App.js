import React, { createContext, useState } from "react";
import Header from "./Header";
import Meals from "./Meals/Meals";
import CartItemsDisplay from "./CartItemsDisplay";
import {
  Routes,
  BrowserRouter as Router,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import Congratulations from "./Congratulations";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

const selectedFood = new Map();
const cartContext = createContext();
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [numberOfselectedItems, setNumberOfSelectedItems] = useState(0);
  const [showCartItems, setShowCartItems] = useState(false);

  return (
    <Router>
      <cartContext.Provider
        value={{
          numberOfselectedItems,
          setNumberOfSelectedItems,
          selectedFood,
        }}
      >
        <Routes>
          <Route
            path="/*"
            element={
              isLoggedIn ? (
                <Navigate to="/home" />
              ) : (
                <LoginPage setIsLoggedIn={setIsLoggedIn} />
              )
            }
          />
          <Route
            path="/register"
            element={<RegisterPage setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/congrats"
            element={<Congratulations setShowCartItems={setShowCartItems} />}
          />
          <Route path="/" element={!isLoggedIn && <Navigate to="/login" />} />
          <Route
            path="/home"
            element={
              <div
                style={{
                  background: "linear-gradient(#29251c, #2c2306)",
                  minHeight: "100vh",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {showCartItems && (
                  <CartItemsDisplay
                    selectedFood={selectedFood}
                    setShowCartItems={setShowCartItems}
                  />
                )}
                <Header
                  setShowCartItems={setShowCartItems}
                  setIsLoggedIn={setIsLoggedIn}
                />
                {/* {!showCartItems && <Meals />} */}
                <Meals />
              </div>
            }
          />
        </Routes>
      </cartContext.Provider>
    </Router>
  );
}
export { cartContext };
export default App;
