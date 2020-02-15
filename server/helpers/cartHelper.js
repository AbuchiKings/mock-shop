import 'core-js/stable';
import 'regenerator-runtime';
import errorHandler from '../utils/handleError';
import pool from '../utils/pool';
import query from '../queries/queries';
import { updateCart } from '../utils/handleCartProducts';

class CartHelper {
    static async addToCart(req) {
        try {
            let { productId } = req.body;
            let userId = req.user.id;
            userId = parseInt(userId, 10);
            productId = parseInt(productId, 10);

            const product = await pool.query(query.getProduct(productId));

            if (product.rowCount < 1) return errorHandler(404, 'Product not found.');
            if (!product.rows[0].in_stock) return errorHandler(404, 'Product is currently not in stock.');

            return pool.query(query.getUserCart(userId))
                .then(async (userCart) => {
                    if (userCart.rowCount < 1) {
                        userCart = await pool.query(query.createCart(userId));
                    }

                    if ((userCart).rows[0].products_id.length >= 12) {
                        return errorHandler(400, 'Maximum cart capacity reached');
                    }

                    const isExists = userCart.rows[0].products_id.some(id => {

                        return productId === parseInt(id, 10);
                    });

                    if (isExists) return errorHandler(409, 'Product already in cart')

                    userCart.rows[0].products_id.push(productId);
                    let result = await updateCart(userCart.rows[0].products_id, userId);

                    if (result instanceof Error) return errorHandler(500, result.message);

                    if (result.length < 1) return errorHandler(404, 'No product in cart');

                    return formatCart(result, userCart.rows[0].id, userId);
                }).catch(error => error);


        } catch (error) {
            return error;
        }

    }

    static async getCart(req) {
        try {
           
            let userId  = req.user.id;
            userId = parseInt(userId, 10);
            let userCart = await pool.query(query.getUserCart(userId));

            if (userCart.rowCount < 1) {
                return errorHandler(404, 'No product in cart');
            }

            let products = await updateCart(userCart.rows[0].products_id, userId);

            if (products instanceof Error) return errorHandler(500, result.message);

            if (products.length < 1) return errorHandler(404, 'No product in cart');

            return formatCart(products, userCart.rows[0].id, userId);

        } catch (error) {
            return(error);
        }
    }

    static async deleteCartItem(req) {
        try {
            let { cartId, userId } = req.body;
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

//Formats response and calculates price
function formatCart(products, cartId, userId) {
    let totalPrice = 0;
    products.forEach(product => {
        totalPrice += product.price;
        return totalPrice;
    });

    return { cartId, userId, totalPrice: totalPrice.toFixed(2), products };
}
export default CartHelper;