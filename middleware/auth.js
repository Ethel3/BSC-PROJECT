import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  
  try {
    const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token missing from authorization header' });
  }

    const decoded = jwt.verify(token, process.env("SECRET"));
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'User not authorized to access this resource' });
  }
};
// check if the user is an admin
export const isAdmin = (req, res, next)=> {
  if (req.user && req.user.role === 'admin') {
    return next();
  } else {
    return res.status(403).json({ message: 'Only admins can perform this operation' });
  }
};
