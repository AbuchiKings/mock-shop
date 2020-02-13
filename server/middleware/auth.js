import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import errorHandler from '../utils/handleError';

dotenv.config();
const SECRET = process.env.JWT_KEY;



function verifyToken(req, res, next) {

    const access = req.headers.authorization
    if (!access) {
        errorHandler(401, 'Headers not set');
    }

    let bearerToken = access.split(' ');
    const token = bearerToken[1];
    jwt.verify(token, SECRET, (err, decodedToken) => {
        if (err) {
            errorHandler(401, err.name);
        }
        req.user = decodedToken;
        next();
    });

}

const verifyAdmin = (req, res, next) => {
    const { is_admin } = req.user;
    if (!is_admin) {
      errorHandler(403, 'Unauthorized Access. For admins/owner accounts only');
    }
    next();
  };

export default {verifyToken, verifyAdmin};
