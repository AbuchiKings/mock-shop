import 'core-js/stable';
import 'regenerator-runtime';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import errorHandler from '../utils/handleError';
import pool from '../utils/pool';
import query from '../queries/queries';


dotenv.config();
const SECRET_KEY = process.env.JWT_KEY;


class UserHelper {

    static async createUser(req) {
        try {
            let { firstName, lastName, email, password, isAdmin } = req.body;
            isAdmin = isAdmin ? isAdmin : false

            const foundUser = await pool.query(query.getUserByEmail(email));

            if (foundUser.rowCount > 0) return errorHandler(409, 'Email address is already in use');

            const hashedPassword = await bcrypt.hash(password, 10);

            const createdUser = await pool.query(query.regUser(firstName, lastName, email, hashedPassword, isAdmin));

            return createdUser.rows[0];
        } catch (error) {
            return error;
        }
    }

    static async loginUser(req) {
        try {
            const { email, password } = req.body;

            const foundUser = await pool.query(query.getUserByEmail(email));

            if (foundUser.rowCount < 1) errorHandler(404, 'Email address is incorrect');

            const isValidPassword = await bcrypt.compare(password, foundUser.rows[0].password);

            if (!isValidPassword) errorHandler(401, 'Password is incorrect');

            const { id, is_admin } = foundUser.rows[0];

            const token = jwt.sign({ id, email, is_admin }, SECRET_KEY, { expiresIn: '12h' });

            return { token, is_admin };
        } catch (error) {
            return error;
        }


    }

    static async updatePassword(req) {
        try {
            const userId = parseInt(req.params.id, 10);

            const { rows } = await pool.query(query.getUserById(userId));
            if (!rows[0]) errorHandler(404, 'Account not found');

            const { oldPassword, newPassword } = req.body;
            if (oldPassword === newPassword) return errorHandler(409, 'Old password and New password cannot be the same');
            const db = rows[0];
            const validPassword = await bcrypt.compare(oldPassword, db.password);

            if (!validPassword) return errorHandler(401, 'Password is incorrect');

            const hashNewPassword = await bcrypt.hash(newPassword, 10);

            const result = await pool.query(query.updateUserPassword(hashNewPassword, userId));

            const user = result.rows[0];
            const { id, email, is_admin } = user;

            const token = jwt.sign({ id, email, is_admin }, SECRET_KEY, { expiresIn: '12h' });

            return { token, user };

        } catch (error) {
            return error;
        }
    }

    static async deleteUser(req) {
        try {
            const userId = parseInt(req.params.id, 10);
            const id = parseInt(req.user.id, 10);
            if(id !== userId) return errorHandler(403, 'Unauthorised to delete user');
            const { rows, rowCount } = await pool.query(query.getUserById(userId));

            if (rowCount < 1) return errorHandler(404, 'Account not found');

            const user = rows[0];

            if (user.is_admin && user.id === 1) {
                return errorHandler(403, 'Forbidden');
            }

            const result = await pool.query(query.deleteUser(userId));
            return result.rows[0];

        } catch (error) {
            return error;
        }
    }

   

}
export default UserHelper;