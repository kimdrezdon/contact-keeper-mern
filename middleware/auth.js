// Import JSON Web Token
const jwt = require('jsonwebtoken');

// Import config in order to access values in default.json
const config = require('config');

// Middleware function for protected routes
module.exports = function (req, res, next) {
	// Get token from header
	const token = req.header('x-auth-token');

	// Check if token is missing
	if (!token) {
		return res.status(401).json({ msg: 'No token, authorization denied' });
	}

	// If there is a token, need to verify it
	try {
		// Returns payload including user, iat and exp
		const decoded = jwt.verify(token, config.get('jwtSecret'));
		// Save user object from payload to the req object
		req.user = decoded.user;
		next();
	} catch (err) {
		res.status(401).json({ msg: 'Token is not valid' });
	}
};
