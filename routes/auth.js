// Import express
const express = require('express');
const router = express.Router();

// Import bcrypt
const bcrypt = require('bcryptjs');

// Import JSON Web Token
const jwt = require('jsonwebtoken');

// Import config in order to access values in default.json
const config = require('config');

// Import authorization middleware
const auth = require('../middleware/auth');

// Import express validator
const { check, validationResult } = require('express-validator');

// Import models
const User = require('../models/User');

// @route    GET api/auth
// @desc     Get logged in user
// @access   Private
// Use auth middleware because protected route
router.get('/', auth, async (req, res) => {
	try {
		// Find user in the database but exclude password from the response
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route    POST api/auth
// @desc     Auth user & get token
// @access   Public
router.post(
	'/',
	[
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Password is required').exists()
	],
	async (req, res) => {
		// Check if there are any errors from validation and set errors array if there are
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;

		try {
			let user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({ msg: 'Invalid Credentials' });
			}
			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				return res.status(400).json({ msg: 'Invalid Credentials' });
			}
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
