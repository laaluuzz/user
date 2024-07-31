const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoute = require("./routes/user");
const regionRoute = require("./routes/region");
const cityRoute = require("./routes/city");
const consultationRoute = require("./routes/consultation"); // Importa las rutas de consultas

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

// Rutas de usuarios, regiones, ciudades y consultas
app.use("/api/users", userRoute);
app.use("/api/regions", regionRoute);
app.use("/api/cities", cityRoute);
app.use("/api/consultations", consultationRoute); // Usa las rutas de consultas

// mongodb connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error(error));

// server listening
app.listen(port, () => console.log("Server listening to", port));
