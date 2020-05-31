const express = require("express");
const router = express.Router();
// const auth = require("../../middleware/auth");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const auth = require('../middleware/auth')

router.get('/', auth, async (req, res) => {
  try {
      const user = await User.findById(req.user.id).select('-password')
      res.json(user)
  } catch (error) {
      console.log(error.message)
      res.status(500).json('Server Error')
  }
})

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public

router.post(
  "/",
  [
    check("email", "Please enter a valid email"),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials Go Away!!" }] });
      }
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);
module.exports = router;
