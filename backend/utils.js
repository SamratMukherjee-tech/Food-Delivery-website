const jwt = require("jsonwebtoken");

const JWT_SERCRET_KEY = "MYNAMEISSAMRAT";

const getToken = async function (id) {
  try {
    return jwt.sign(
      {
        userID: id.toString(),
      },
      JWT_SERCRET_KEY
    );
  } catch (error) {
    console.log(error);
  }
};

const checkOccurance = async function (id, meals) {
  for (let i in meals) {
    if (meals[i].id === id) return true;
  }
  console.log("in the funtion");
  return false;
};

const addQuantity = async function (meal) {
  meal["quantity"] = 1;
  return meal;
};
const updateQuantity = async function (id, orders) {
  console.log("orders", orders);
  for (let i in orders) {
    if (orders[i].id === id) {
      console.log(orders[i]);
      return orders[i].quantity + 1;
    }
  }
  return -1;
};
module.exports = { getToken, checkOccurance, addQuantity, updateQuantity };
