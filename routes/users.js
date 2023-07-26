const express = require("express");
const router = express.Router();
const session=require('express-session');
const User = require("../models/user");
const users=require('../controllers/users');
const passport=require('passport');
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn } = require("../middleware");

router.get("/register",catchAsync(users.renderRegister));

router.post(
  "/register",
  catchAsync(users.register)
);

router.get("/login", users.renderlogin);

router.post(
  '/login',
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  users.login
)

router.get('/logout', isLoggedIn, users.logout);

// router.post('/logout',isLoggedIn,function(req, res, next) {
//     req.logout(function(err) {
//       if (err) { return next(err); }
//       console.log("logged out");
//       res.redirect('/campgrounds');
//     });
//   });
module.exports = router;
