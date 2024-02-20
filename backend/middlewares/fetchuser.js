const jwt = require('jsonwebtoken');

function fetchUser(req, res, next) {
  const authorizationHeader = req.headers.authorization;
  console.log("hell1 fetch",authorizationHeader);

  if (!authorizationHeader) {
    return res.status(401).json({ message: 'Unauthorized - Missing Authorization header' });
  }

  const [scheme, token] = authorizationHeader.split(' ');

  if (scheme.toLowerCase() !== 'bearer' || !token) {
    return res.status(401).json({ message: 'Unauthorized - Invalid Authorization header format' });
  }

  jwt.verify(token, '1234', (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized - Invalid Token' });
    }

    req.userId = decodedToken;
    console.log("decoded", req.userId);
    next();
  });
}

module.exports = fetchUser;
