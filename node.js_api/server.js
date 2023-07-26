const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const path = require("path");
connectDB();
const server = express();
const { corsManager } = require("./middlewares/corsManager");
const port = process.env.PORT;
const buildPath = path.join(__dirname, "../build");

// MIDDLEWARES
server.use(corsManager);
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(express.static(buildPath));

// ATTRIBUER LES ROUTES
server.use("/api/users", require("./routes/users.routes"));

// LANCER LE SERVEUR
server.listen(port, () =>
  console.log("server ~> lancement sur le port " + port)
);
