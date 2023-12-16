const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;

// Use the cors middleware
const allowedOrigins = ["http://localhost:3000"];

// Use the cors middleware with specific origin configuration
app.use(
  cors({
    origin: function (origin, callback) {
      // Check if the origin is in the allowedOrigins array or if it's undefined (e.g., a same-origin request)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

// Define a basic route
app.get("/", (req, res) => {
  res.send("Hello, this is your Node.js backend!");
});

// Import the availableMeals array
const availableMeals = require("./availableMeals");

// Define a route to get available meals
app.get("/meals", (req, res) => {
  res.json(availableMeals);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
