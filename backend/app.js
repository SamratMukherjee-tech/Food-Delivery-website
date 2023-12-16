const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;
const bodyParser = require("body-parser");
const { createPool } = require("mysql");

const pool = createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "node_test",
  connectionLimit: 10,
});

pool.query(`select * from registers`, function (err, result, fields) {
  if (err) {
    return console.log(err);
  }
  return console.log(result);
});
// Use the cors middleware
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
let regName = "";
let regMob = "";
let regPass = "";
app.post("/register", (req, res) => {
  regName = req.body.userName;
  regPass = req.body.password;
  regMob = req.body.mobile;

  pool.query(
    "INSERT INTO registers (name, password, mobile_number) VALUES (?, ?, ?)",
    [regName, regPass, regMob],
    function (err, result) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to register user" });
      }

      console.log("User registered successfully");
      res.json("registered");
    }
  );
});
app.post("/login", (req, res) => {
  name = req.body.userName;
  let pass = req.body.password;
  pool.query(
    "SELECT * FROM registers WHERE name = ? AND password = ?",
    [name, pass],
    function (err, result) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (result.length > 0) {
        res.json({ status: "success", message: "Login successful" });
      } else {
        res.status(401).json({ error: "Invalid username or password" });
      }
    }
  );
});
const availableMeals = require("./availableMeals");
const { useState } = require("react");
app.get("/meals", (req, res) => {
  res.json(availableMeals);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
