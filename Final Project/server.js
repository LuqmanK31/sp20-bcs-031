const mongoose = require("mongoose");
const express = require("express");
var expressLayouts = require("express-ejs-layouts");
const Product = require("./models/product");
//if you dont have node_modules folder then run below command
// npm install

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(expressLayouts);

const productsApiRouter = require("./routes/api/products");
const productsSiteRouter = require("./routes/site/products");
app.use("/api/products", productsApiRouter);
app.use("/products", productsSiteRouter);


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