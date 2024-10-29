const jwt = require('jsonwebtoken');

// Set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // Middleware function for authenticated routes in a GraphQL context
  authMiddleware: function ({ req }) {
    // Allows token to be sent via req.query or headers
    let token = req.query.token || req.headers.authorization;

    // If token is sent in the "Authorization" header in the form of "Bearer <token>"
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      // No token is not considered an error in the context of GraphQL
      // We return an empty object instead of sending a response.
      return {};
    }

    try {
      // Verify token and extract user data
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      return { user: data };
    } catch (err) {
      console.log('Invalid token');
      // Return an empty context if the token is invalid
      return {};
    }
  },

  // Function to sign a token when a user logs in or registers
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
