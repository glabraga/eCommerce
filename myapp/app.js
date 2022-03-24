const http = require("http");
const express = require("express");
const app = express();
const categories = require("../json/categories.json");
const category_info = require("../json/category-info.json");
const products = require("../json/products.json");
const product_info = require("../json/product-info.json");
const cart_products = require("../json/cart-products.json");
const comments = require("../json/comments.json");

app.get("/categories", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.set("Content-Type", "application/json");
  res.send(categories);
});

app.get("/category_info", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.set("Content-Type", "application/json");
  res.send(category_info);
});

app.get("/products", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.set("Content-Type", "application/json");
  res.send(products);
});

app.get("/cart_products", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.set("Content-Type", "application/json");
  res.send(cart_products);
});

app.get("/comments", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.set("Content-Type", "application/json");
  res.send(comments);
});

app.get("/product_info", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.set("Content-Type", "application/json");
  res.send(product_info);
});

app.listen(3000, function () {
  console.log("Servidor levantado");
});
