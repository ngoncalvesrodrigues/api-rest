import jwt from 'jsonwebtoken';
import userData from '../data/user';

function createToken(user, secretKey, expiresIn) {
  const { username } = user;
  const payload = {
    username,
  };
  return jwt.sign(payload, secretKey, { expiresIn });
}

export function login(body) {
  const TOKEN_EXPIRE_IN = '15m';
  const { username, password } = body;

  if (!username || !password) return { httpCode: 400 };
  if (username == userData.username && password == userData.password) {
    return {
      token: createToken({ username }, process.env.SECRET_KEY, TOKEN_EXPIRE_IN),
      type: 'Bearer',
      expires_in: 0,
    };
  } else {
    return { httpCode: 401 };
  }
}

export function verifyToken(req, res, next) {
  if (req.url === '/api/v1/login') return next();

  const sendUnathorized = () =>
    res.status(401).json({ code: 401, message: 'Unathorized Error' });

  const bearerHeader = req.headers['authorization'];
  if (bearerHeader) {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, process.env.SECRET_KEY, function (err, decoded) {
      if (err || !decoded) {
        return sendUnathorized();
      }
      next();
    });
  } else {
    return sendUnathorized();
  }
}
