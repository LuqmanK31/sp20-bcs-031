const express = require("express");
const Router = express.Router();
const Product = require("../../models/product");
const checkSessionAuth = require("../../middlewares/checkSessionAuth");

Router.get("/add", checkSessionAuth, async (req, res) => {
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

  Router.get("/cart/:id", async (req, res) => {
    let product = await Product.findById(req.params.id);
    let cart = [];
    if(req.cookies.cart) cart = req.cookies.cart;
    cart.push(product);
    res.cookie("cart",cart);
    res.redirect("/");
  });

  Router.get("/cart/remove/:id", async function (req, res, next) {
    let product = await Product.findById(req.params.id);
    // console.log("add to cart" + products);
    let cart = [];
    if (req.cookies.cart) cart = req.cookies.cart;
  
    // console.log(cart);
    index = cart.findIndex((item) => product._id.equals(item._id));
    // console.log(index);
    cart.splice(index, 1);
  
    // console.log(cart);
    res.cookie("cart", cart);
    res.redirect("/cart");
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
    console.log(req.session.user)
    res.render("products/list", { products, pageTitle: "Products Page Title" });
  });

  module.exports = Router;