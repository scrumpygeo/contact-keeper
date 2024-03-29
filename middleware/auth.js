require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  // get token from header
  const token = req.header('x-auth-token')

  // check if not token (check if token doesnt exist)
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied.' })
  }

  // if there is a token, verify it. (Put it in try catch)
  try {
    const decoded = jwt.verify(token, jwtSecret)
    // once verified, payload will be put in decoded. We want to extract user from it:
    req.user = decoded.user
    next()
  } catch (err) {
    res.status(401).json({ msg: 'Authorization Denied.' })
  }
}

// 401: unauthorized
