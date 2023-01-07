const mongoose = require("mongoose");
const express = require("express");
var expressLayouts = require("express-ejs-layouts");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var sessionAuth = require("./middlewares/sessionAuth");
const Product = require("./models/product");
//if you dont have node_modules folder then run below command
// npm install

const app = express();
app.use(session({ 		//Usuage
  secret: 'keyboard cat',
  cookie: { maxAge: 60000 }
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(session({ 		//Usuage
  secret: 'keyboard cat',
  cookie: { maxAge: 60000 }
}));
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(sessionAuth);

const productsApiRouter = require("./routes/api/products");
const productsSiteRouter = require("./routes/site/products");
const UserRouter = require("./routes/user")

app.use("/api/products", productsApiRouter);
app.use("/products", productsSiteRouter);
app.use("/", UserRouter);

app.get("/cart", (req, res) => {
  let cart = req.cookies.cart;
  if(!cart) cart = [];
  res.render("cart", {cart});
});

app.get("/contact-us", (req, res) => {
  res.render("contact-us");
});


app.get("/", async(req, res, ) => {
  let products = await Product.find();
  console.log(products)
  res.render("index",{products});
});
mongoose.connect("mongodb://localhost/sp20-bcs-a")
.then(() => {
  console.log("connected to mongodb:localhost//sp20-bcs-a");
})
.catch(() => {
  console.log("unable to connect");
});

app.listen(2001);

//execute this file with following command
// node server

//for auto refresh of the code install nodemon globally
//npm install nodemon -g
// then run the file with nodemon
//nodemon server