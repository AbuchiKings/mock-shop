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
      const userId = parseInt(req.user.id, 10);
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
            return errorHandler(400, 'Maximum cart capacity reached. Please check out.');
          }

          const isExists = userCart.rows[0].products_id.some((id) => (
          productId === parseInt(id, 10)));

          if (isExists) return errorHandler(409, 'Product already in cart');

          userCart.rows[0].products_id.push(productId);
          const result = await updateCart(userCart.rows[0].products_id, userId);

          if (result instanceof Error) return errorHandler(500, result.message);

          if (result.length < 1) return errorHandler(404, 'No product in cart');

          return formatCart(result, userCart.rows[0].id, userId);
        }).catch((error) => error);
    } catch (error) {
      return error;
    }
  }

  static async getCart(req) {
    try {
      let userId = req.user.id;
      userId = parseInt(userId, 10);
      const userCart = await pool.query(query.getUserCart(userId));

      if (userCart.rowCount < 1) {
        return errorHandler(404, 'No product in cart');
      }

      const products = await updateCart(userCart.rows[0].products_id, userId);

      if (products instanceof Error) return errorHandler(500, products.message);

      if (products.length < 1) return errorHandler(404, 'No product in cart');

      return formatCart(products, userCart.rows[0].id, userId);
    } catch (error) {
      return (error);
    }
  }

  static async deleteCartItem(req) {
    try {
      let productId = req.params.id;
      let userId = req.user.id;
      userId = parseInt(userId, 10);
      productId = parseInt(productId, 10);

      const product = await pool.query(query.getProduct(productId));
      if (product.rowCount < 1) return errorHandler(404, 'Product not found.');

      const cart = await pool.query(query.getUserCart(userId));
      if (cart.rowCount < 1) return errorHandler(404, 'Cart is empty');
      if (cart.rows[0].products_id.length < 1) return errorHandler(404, 'No product in cart');
      if (!cart.rows[0].products_id.includes(String(productId))) {
        return errorHandler(404, 'Product not in cart');
      }

      const products = cart.rows[0].products_id.filter((product_id) => parseInt(product_id, 10) !== productId);
      const result = await updateCart(products, userId);

      if (result instanceof Error) return errorHandler(500, result.message);

      if (result.length < 1) return errorHandler(404, 'No product in cart');

      return formatCart(result, cart.rows[0].id, userId);
    } catch (error) {
      return error;
    }
  }
}

// Formats response and calculates total price
function formatCart(products, cartId, userId) {
  let totalPrice = 0;
  let totalItems = 0;
  products.forEach((product) => {
    totalPrice += product.price;
    totalItems += 1;
    return totalPrice;
  });

  return {
    cartId,
    userId,
    totalItems,
    totalPrice: totalPrice.toFixed(2),
    products
  };
}
export default CartHelper;
