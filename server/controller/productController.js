import responseHandler from '../utils/handleResponse';
import ProductHelper from './../helpers/productHelper';


class ProductController {
    static async createProduct(req, res, next) {
        const result = await ProductHelper.createProduct(req);
        responseHandler(res, result, next, 201, 'Product created successfully');
    }

    static async login(req, res, next) {
        const result = await ProductHelper.loginUser(req);
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



export default ProductController;