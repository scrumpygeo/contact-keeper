const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
  '/',
  [
    check('name', 'Please enter a name.')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email.').isEmail(),
    check(
      'password',
      'Please enter password with 6 or more characters.'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // res.send('passed'); // = test validation eg w and w/o password
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'User already exists.' });
      }

      // if user doesn't exist,
      user = new User({
        name,
        email,
        password
      });
      // at this stage user object created but not saved in db
      // We need to encrypt pwd first
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      // now save in db
      await user.save();
      // next, send back a json web token
      // first check if data put in db:
      res.send('User saved.');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
