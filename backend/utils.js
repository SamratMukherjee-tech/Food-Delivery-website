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
module.exports = { getToken, checkOccurance, addQuantity };
