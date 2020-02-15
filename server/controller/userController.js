import 'core-js/stable';
import 'regenerator-runtime';
import UserHelper from '../helpers/userHelper';
import responseHandler from '../utils/handleResponse';

class UserController {
    static async createUser(req, res, next) {
        const result = await UserHelper.createUser(req);
        responseHandler(res, result, next, 201, 'User created successfully');
    }

    static async login(req, res, next) {
        const result = await UserHelper.loginUser(req);
        responseHandler(res, result, next, 200, 'Login successful');
    }

    static async updatePassword(req, res, next) {
        const result = await UserHelper.updatePassword(req)
        responseHandler(res, result, next, 200, 'User updated successfully');
    }

    static async deleteUser(req, res, next) {
        const result = await UserHelper.deleteUser(req);
        responseHandler(res, result, next, 200, 'User deleted successfully');
    }
}



export default UserController;