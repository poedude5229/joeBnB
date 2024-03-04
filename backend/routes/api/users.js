const express = require("express");
const bcrypt = require("bcryptjs");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateSignup = [
  check("firstName")
    .exists({ checkFalsy: true })
    .isAlpha()
    .isLength({ min: 3, max: 30 })
    .withMessage("Gotta provide a valid first name with at least 3 letters"),
  check("lastName")
    .exists({ checkFalsy: true })
    .isAlpha()
    .isLength({ min: 3, max: 30 })
    .withMessage("Gotta provide a valid last name with at least 3 letters"),
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

const checkEmail = async (req, res, next) => {
  const { email } = req.body;
  const existing = await User.findOne({
    where: { email: email },
  });
  if (existing) {
    res.status(500).json({
      message: "User already exists",
      errors: {
        email: "User with that email already exists",
      },
    });
    return;
  }
  next();
};

const checkUN = async (req, res, next) => {
  const { username } = req.body;
  const existingUN = await User.findOne({
    where: { username: username },
  });

  if (existingUN) {
    res.status(500).json({
      message: "User already exists",
      errors: {
        username: "User with that username already exists",
      },
    });
    return;
  }
  next();
};

router.post("/", validateSignup,checkEmail,checkUN, async (req, res) => {
  try {
    const { firstName, lastName, email, password, username } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      firstName,
      lastName,
      email,
      username,
      hashedPassword,
    });

    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    };

    await setTokenCookie(res, safeUser);

    return res.json({
      user: safeUser,
    });
  } catch (error) {
    // if (error.name === "SequelizeUniqueConstraintError") {
    //   if (error.errors[0].path === "email") {
    //     // Handle the case where the email is already taken
    //     return res.status(500).json({
    //       message: "User already exists",
    //       errors: {
    //         email: "User with that email already exists",
    //       },
    //     });
    //   } else if (error.errors[0].path === "username") {
    //     // Handle the case where the username is already taken
    //     return res.status(500).json({
    //       message: "User already exists",
    //       errors: {
    //         username: "User with that username already exists",
    //       },
    //     });
    //   }
    // }
  }
});

module.exports = router;
