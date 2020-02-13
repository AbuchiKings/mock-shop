import responseHandler from '../utils/handleResponse';
import ProductHelper from './../helpers/productHelper';


class ProductController {
    static async createProduct(req, res, next) {
        const result = await ProductHelper.createProduct(req);
        responseHandler(res, result, next, 201, 'Product created successfully');
    }

    static async getAllProducts(req, res, next) {
        const result = await ProductHelper.getAllProducts(req);
        responseHandler(res, result, next, 200, 'Login successful');
    }
    static async getProduct(req, res, next) {
        const result = await ProductHelper.getProduct(req);
        responseHandler(res, result, next, 200, 'Login successful');
    }

    static async updateProduct(req, res, next) {
        const result = await ProductHelper.updateProduct(req)
        responseHandler(res, result, next, 200, 'Product updated successfully');
    }

    static async deleteUser(req, res, next) {
        const result = await UserHelper.deleteUser(req);
        responseHandler(res, result, next, 200, 'User deleted successfully');
    }
}



export default ProductController;