import jwt, { decode } from 'jsonwebtoken';

//TODO: Implement refresh token when we have a proper client.
export const authMiddleware = (req, res, next) => {
    const accessToken = returnTokenFromBearerToken(req.headers.authorization);
    if (!accessToken) {
      return res.status(401).json({"message": "Access token might have not been provided"});
    }
    
    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      req.id = decoded.id;
      next();
    } catch (error) {
        console.error(error)
        return res.status(400).json({"message": 'Invalid access token'});
      }
}

function returnTokenFromBearerToken(bearerToken){
  return bearerToken.split(" ")[1];
}