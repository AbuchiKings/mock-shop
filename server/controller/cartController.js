import responseHandler from '../utils/handleResponse';
import CartHelper from './../helpers/cartHelper';


class CartController{
    static async addToCart(req, res, next){
        const result = await CartHelper.addToCart(req, res, next);
        responseHandler(res, result, next, 201, 'Product added to cart');
    }

    static async getCart(req, res, next){
        const result = await CartHelper.getCart(req);
        responseHandler(res, result, next, 200, 'Success')
    }
}

export default CartController;