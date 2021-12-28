const { body } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.registerValidators = [
  body("email")
    .isEmail()
    .withMessage("Enter correct email")
    .custom(async (value, { req }) => {
      try {
        const user = User.findOne({ email: value });
        if (user) {
          return Promise.reject("This email is alredy exist");
        }
      } catch (e) {
        console.log(e);
      }
    })
    .normalizeEmail(),
  body("password", "password must contain at least 8 characters")
    .isLength({ min: 8, max: 56 })
    .isAlphanumeric()
    .trim(),
  body("confirm")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords must be similar");
      }
      return true;
    })
    .trim(),
  body("name")
    .isLength({ min: 3 })
    .withMessage("Name must contain at least 3 characters ")
    .trim(),
];

exports.loginValidators = [
  body("password")
    .custom(async (value, { req }) => {
      try {
        const candidate = await User.findOne({ email: req.body.email });
        if (candidate) {
          const areSame = await bcrypt.compare(value, candidate.password);

          if (areSame) {
            req.session.user = candidate;
            req.session.isAuthenticated = true;
            req.session.save((err) => {
              if (err) {
                throw err;
              }
            });
          } else {
            return Promise.reject("Wrong password");
          }
        } else {
          return Promise.reject("This user does not exist");
        }
      } catch (e) {
        console.log(e);
      }
    })
    .normalizeEmail(),
];

exports.courseValidators = [
  body("title")
    .isLength({ min: 3 })
    .withMessage("Course name must contain at least 3 characters")
    .trim(),
  body("price").isNumeric().withMessage("Enter correct price"),
  body("img", "Enter correct image URL").isURL(),
];
