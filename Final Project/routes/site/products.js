const express = require("express");
const Router = express.Router();
const Product = require("../../models/product");

Router.get("/add", async (req, res) => {
    res.render("products/add");
  });

  Router.post("/add", async (req, res) => {
    let product = new Product(req.body);
    await product.save();
    res.redirect("/products");
  });

  Router.get("/delete/:id", async (req, res) => {
    let product = await Product.findById(req.params.id);
    await product.delete();
    res.redirect("/products");
  });

  Router.get("/edit/:id", async (req, res) => {
    let product = await Product.findById(req.params.id);
  
    res.render("products/edit", { product });
  });

  Router.post("/edit/:id", async (req, res) => {
    let product = await Product.findById(req.params.id);
    product.title = req.body.title;
    product.description = req.body.description;
    product.price = req.body.price;
    product.image = req.body.image;
    await product.save();
    res.redirect("/products");
  });

  Router.get("/", async (req, res) => {
    let products = await Product.find();
    res.render("products/list", { products, pageTitle: "Products Page Title" });
  });

  module.exports = Router;