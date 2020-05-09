// Import express
const express = require('express');
const router = express.Router();

// Import bcrypt
const bcrypt = require('bcryptjs');

// Import JSON Web Token
const jwt = require('jsonwebtoken');

// Import config in order to access values in default.json
const config = require('config');

// Import express validator
const { check, validationResult } = require('express-validator');

// Import models
const User = require('../models/User');

// @route    POST api/users
// @desc     Register a user
// @access   Public
router.post(
	'/',
	// Validate fields using express validator
	[
		check('name', 'Please add a name').not().isEmpty(),
		check('email', 'Please include a valid email').isEmail(),
		check(
			'password',
			'Please enter a password with 6 or more characters'
		).isLength({ min: 6 })
	],
	async (req, res) => {
		// Check if there are any errors from validation and set errors array if there are
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		// Extract user input from request body
		const { name, email, password } = req.body;

		try {
			// Check if user already exists by searching database for user with that email
			let user = await User.findOne({ email });
			if (user) {
				return res.status(400).json({ msg: 'User already exists' });
			}

			// Create new instance of a User
			user = new User({
				name,
				email,
				password
			});

			// Generate a salt
			const salt = await bcrypt.genSalt(10);
			// Set user instance password to hashed bcrypt password
			user.password = await bcrypt.hash(password, salt);

			// Save user to the database
			await user.save();

			// Grab the user's id automatically generated by mongodb
			const payload = {
				user: {
					id: user.id
				}
			};

			// Generate json web token
			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{
					// expires in 3600 ms which is an hour
					expiresIn: 3600
				},
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

module.exports = router;
