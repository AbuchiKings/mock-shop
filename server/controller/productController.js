import 'core-js/stable';
import 'regenerator-runtime';
import responseHandler from '../utils/handleResponse';
import ProductHelper from '../helpers/productHelper';


class ProductController {
  static async createProduct(req, res, next) {
    const result = await ProductHelper.createProduct(req);
    responseHandler(res, result, next, 201, 'Product created successfully');
  }

  static async getAllProducts(req, res, next) {
    const result = await ProductHelper.getAllProducts(req);
    responseHandler(res, result, next, 200, 'Success!');
  }

  static async getProduct(req, res, next) {
    const result = await ProductHelper.getProduct(req);
    responseHandler(res, result, next, 200, 'Success!');
  }

  static async updateProduct(req, res, next) {
    const result = await ProductHelper.updateProduct(req);
    responseHandler(res, result, next, 200, 'Product updated successfully');
  }

  static async deleteProduct(req, res, next) {
    const result = await ProductHelper.deleteProduct(req);
    responseHandler(res, result, next, 200, 'Product deleted successfully');
  }
}


export default ProductController;
