const express = require("express");
const Router = express.Router();
const Product = require("../../models/product");

Router.get("/:id", async (req, res) => {
    let product = await Product.findById(req.params.id);
    res.send(product);
  });

  Router.delete("/:id", async (req, res) => {
    let product = await Product.findById(req.params.id);
    await product.delete();
    res.send(product);
  });

  Router.put("/:id", async (req, res) => {
    let product = await Product.findById(req.params.id);
    product.title = req.body.title;
    product.description = req.body.description;
    product.price = req.body.price;
    product.image = req.body.image;
    await product.save();
    res.send(product);
  });

  Router.get("/", async (req, res) => {
    let products = await Product.find();
    res.send(products);
  });

  Router.post("/", async (req, res) => {
    let product = new Product(req.body);
    await product.save();
    res.send(product);
  });

  module.exports = Router;
