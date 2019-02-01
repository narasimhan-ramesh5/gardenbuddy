const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const db = require("../../models");
const passport = require("../../config/passport");

// this route is just used to get the user basic info
// eslint-disable-next-line no-unused-vars
router.get("/user", (req, res, next) => {
  console.log("===== user!!======");
  console.log(req.user);
  if (req.user) {
    return res.json({ user: req.user });
  } else {
    return res.json({ user: null });
  }
});

router.post(
  "/login",
  function(req, res, next) {
    console.log(req.body);
    console.log("================");
    next();
  },
  passport.authenticate("local"),
  (req, res) => {
    console.log("POST to /login");
    const user = JSON.parse(JSON.stringify(req.user)); // hack
    const cleanUser = Object.assign({}, user);
    if (cleanUser.local) {
      console.log(`Deleting ${cleanUser.local.password}`);
      delete cleanUser.local.password;
    }
    res.json({ user: cleanUser });
  }
);

router.post("/logout", (req, res) => {
  if (req.user) {
    req.session.destroy();
    res.clearCookie("connect.sid"); // clean up!
    return res.json({ msg: "logging you out" });
  } else {
    return res.json({ msg: "no user to log out!" });
  }
});

router.post("/signup", (req, res) => {
  //   const { username, password } = req.body;
  console.log(req.body);
  let {
    email,
    password,
    phone,
    firstName,
    lastName,
    zipcode,
    city,
    st,
    aboutme
  } = req.body;
  // ADD VALIDATION
  User.find({ email: email }, (err, userMatch) => {
    if (!userMatch) {
      return res.json({
        error: `Sorry, already a user with the email: ${email}`
      });
    }
    const newUser = new User({
      email: email,
      password: password,
      phone: phone,
      firstName: firstName,
      lastName: lastName,
      zipcode: zipcode,
      city: city,
      st: st,
      aboutme: aboutme
    });
    db.User.insert(newUser, function(err, data) {
      if (err) {
        return res.json(err);
      }
      return res.json(savedUser);
    });
  });
});

module.exports = router;
