const express = require("express");
const controller = require("./Controller.js");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const port = 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/products", controller.getProducts);
app.get("/products/:product_id", controller.getProductsbyID);
app.get("/products/:product_id/styles", controller.getStylesbyID);
app.get("/products/:product_id/related", controller.getRelatedbyID);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
