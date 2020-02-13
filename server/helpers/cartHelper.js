import errorHandler from '../utils/handleError';
import pool from '../utils/pool';
import query from '../queries/queries';

class CartHelper {
    static async createCart(req) {
        try {
            let { productId, userId } = req.body;
            productId = parseFloat(productId, 10);
            userId = parseInt(userId, 10);
            const allUserCarts = await pool.query(query.getAllUserCarts(userId));
            const isExists = allUserCarts.rows.some(cart => cart.product_id === productId);
    
            if (isExists) {
                errorHandler(409, 'Product already  in cart.');
            }
            const createdCart = await pool.query(query.addCart(productId, userId));
            return createdCart.rows[0];
        } catch (error) {
            return error;
        }
   
    }

    static async getAllUserCarts(req){
        try {
            const allCarts = await pool.query(query.getAllProducts());
            if (allCarts.rowCount < 1) errorHandler(404, 'No product found');
            return allProducts.rows;
        } catch (error) {
            
        }
    }

    static async deleteCart(req){
        try {
            let {cartId, userId} = req.body;
            cartId = parseInt(cartId, 10);
            userId = parseInt(userId, 10);
            const cart = await pool.query(query.getCart(cartId, userId));
            if (cart.rowCount < 1) errorHandler(404, 'Product not found');
            let deletedCart = await pool.query(query.deleteCart(id));
            if (deletedProduct.rowCount < 1) throw new Error('There was a problem deleting product');
            return [];
        } catch (error) {
            return error;
        }
    }
}
export default CartHelper;