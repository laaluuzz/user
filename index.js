const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoute = require("./routes/user");
const regionRoute = require("./routes/region");

const cors = require("cors"); // Importa el middleware CORS

// settings
const app = express();
const port = process.env.PORT || 9000;

// middlewares
app.use(express.json());
app.use(cors()); // Aplica el middleware CORS a todas las rutas

// routes
app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

// Rutas de usuarios utilizando el middleware de ruta
app.use("/api", userRoute);
app.use("/api", regionRoute); // Añade las rutas de región

// mongodb connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error(error));

// server listening
app.listen(port, () => console.log("Server listening to", port));
