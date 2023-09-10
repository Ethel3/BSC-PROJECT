import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token missing from authorization header' });
  }

  try {
    const decoded = jwt.verify(token, process.env("SECRET"));
    req.id = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: 'User not authorized to access this resource' });
  }
};
