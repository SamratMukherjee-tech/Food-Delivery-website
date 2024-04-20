const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;
const bodyParser = require("body-parser");
const { createPool } = require("mysql");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { getToken, checkOccurance, addQuantity } = require("./utils");

let loggedUserName = "";
const mongoURL =
  "mongodb+srv://samratmukherjee6994:samrat_123@cluster0.r0cun9q.mongodb.net/food_delivery?retryWrites=true&w=majority&appName=Cluster0";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
    unique: true,
  },
});

const User = mongoose.model("user", userSchema);

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  orders: {
    type: Array,
  },
});

const Food = mongoose.model("OrderedFoodbyName", foodSchema);

mongoose
  .connect(mongoURL)
  .then((res) => console.log("MOngo connected"))
  .catch((err) => {
    console.log("the error is:", err);
  });

const allowedOrigins = ["http://localhost:3000"];
app.use(bodyParser.json());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
let name = "";
app.get("/", (req, res) => {
  res.send("Hello, this is your Node.js backend!");
});
app.post("/congrats", (req, res) => {
  res.json(name);
});

app.post("/register", async (req, res) => {
  regName = req.body.userName;
  regPass = req.body.password;
  regMob = req.body.mobile;
  loggedUserName = regName;
  const newUser = await User.create({
    name: regName,
    password: regPass,
    mobile: regMob,
  });

  console.log("New user created:", newUser);

  const token = await getToken(newUser._id);

  return res.json({ msg: "success", token: token });
});

app.post("/login", async (req, res) => {
  const name = req.body.userName;
  let pass = req.body.password;

  const result = await User.findOne({ name });
  if (!result) return res.status(404).json({ msg: "USER not found " });
  else {
    loggedUserName = name;
    console.log("user name", loggedUserName);
    if (result.password == pass) {
      const token = await getToken(result._id);
      return res
        .status(200)
        .json({ msg: "found", result: result, token: token });
    }
    return res.status(401).json({ msg: "Invalid Password" });
  }
});

const availableMeals = require("./availableMeals");
app.get("/meals", (req, res) => {
  const auth = req.headers["authorization"];
  if (auth) res.json(availableMeals);
  else {
    res.status(401).json({ msg: "Unauthorized" });
  }
});

app.get("/home", (req, res) => {
  const auth = req.headers["authorization"];
  if (auth) res.status(200).json({ msg: "already logged in " });
  else {
    res.status(401).json({ msg: "Unauthorized" });
  }
});

app.post("/addMeal", async (req, res) => {
  const meal = req.body.meal;
  const newMeal = await addQuantity(meal);
  const result = await Food.findOne({ name: loggedUserName });

  if (!result) {
    const mealArr = [];
    mealArr.push(meal);
    const newUser = await Food.create({
      name: loggedUserName,
      orders: [newMeal],
    });
  } else {
    // If user exists, update the existing document to add the new meal
    const addToCart = await checkOccurance(meal.id, result["orders"]);
    if (addToCart) return res.status(200).json({ msg: "already added" });
    await Food.updateOne(
      { name: loggedUserName },
      { $push: { orders: newMeal } } // Push the new meal to the existing meal array
    );
  }
  return res.status(200).json({ msg: "food added" });
});

app.get("/getOrders", async (req, res) => {
  const result = await Food.findOne({ name: loggedUserName });
  if (!result)
    return res.status(200).json({ msg: "Not ordered earlier", numOrders: 0 });
  return res.status(200).json({
    msg: "having other orders ",
    numOrders: result["orders"].length,
  });
});

app.get("/getOrdersDetails", async (req, res) => {
  const result = await Food.findOne({ name: loggedUserName });
  if (!result)
    return res.status(200).json({ msg: "Not ordered earlier", orders: [] });
  return res.status(200).json({
    msg: "having other orders ",
    orders: result["orders"],
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
