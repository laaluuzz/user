const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoute = require("./routes/user");
const regionRoute = require("./routes/region");
const cityRoute = require("./routes/city");

const cors = require("cors");

// settings
const app = express();
const port = process.env.PORT || 9000;

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

// Rutas de usuarios, regiones y ciudades
app.use("/api", userRoute);
app.use("/api", regionRoute);
app.use("/api", cityRoute);

// mongodb connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error(error));

// server listening
app.listen(port, () => console.log("Server listening to", port));
