const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: {
    type : String
  },
});

productSchema.path('image').validate((val) => {
  urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  return urlRegex.test(val);
}, 'Invalid URL.');

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
