const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const validationMiddleware = require("../middleware/validationMiddleware");
const bcrypt = require("bcrypt");
const queries = require("../db/queries");
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("dotenv").config;

const validateSignup = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username can't be empty")
    .custom(async (value) => {
      if (await queries.userExistsByUsername(value)) {
        throw new Error("An user with that username already exists.");
      }
      return true;
    }),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email can't be empty")
    .isEmail()
    .withMessage("Must be like (example@example.com)")
    .custom(async (value) => {
      if (await queries.userExistsByEmail(value)) {
        throw new Error("An user with that email already exists.");
      }
      return true;
    }),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 letters long")
    .matches("(?=.*[0-9])")
    .withMessage("Password must contain at least one number")
    .matches("(?=.\\W)")
    .withMessage("Password must contain one special character"),
  body("passwordConf").custom((value, { req }) => {
    if (value != req.body.password) {
      throw new Error("Password and Confirm password must match");
    }
    return true;
  }),
];

module.exports.signupPost = [
  validateSignup,
  validationMiddleware,
  asyncHandler(async (req, res) => {
    const encrypted = await bcrypt.hash(req.body.password, 10);
    queries.createUser(req.body.username, req.body.email, encrypted);

    res.send({ redirect: "/login" });
  }),
];

module.exports.loginPost = [
  (req, res, next) => {
    passport.authenticate(
      "local",
      { session: false },
      function (err, user, info) {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(401).send({ messages: [info.message] });
        }
        req.user = user;
        next();
      }
    )(req, res, next);
  },
  (req, res) => {
    jwt.sign({ user: req.user }, process.env.SECRET, (err, token) => {
      res.send({ token: token });
    });
  },
];

module.exports.getIsLogged = [
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    res.send(req.user);
  },
];
