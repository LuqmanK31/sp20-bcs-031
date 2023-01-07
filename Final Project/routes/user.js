const express = require("express");
const Router = express.Router();
const User = require("../models/user");

Router.get("/register", async (req, res) => {
    res.render("./users/register");
});

Router.get("/login", async (req, res) => {
    res.render("./users/login");
});

Router.get("/logout", async (req, res) => {
    req.session.user = null;
    res.redirect("/login");
});
Router.post("/login", async (req, res) => {
   let user = await User.findOne({email:req.body.email,password:req.body.password,});
   if(!user) return res.redirect("/login");
   req.session.user = user;
   return res.redirect("/");
});

Router.post("/register", async (req, res) => {
    let user = new User(req.body);
    await user.save();
    res.redirect("/");
  });
 
module.exports = Router;