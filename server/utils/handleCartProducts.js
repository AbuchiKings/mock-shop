import 'core-js/stable';
import 'regenerator-runtime';
import pool from './pool';
import query from '../queries/queries';


export async function updateCart(products, userId) {
    try {
        let newCartProducts = [], product;

        const result = products.map(async product_id => {
            let id = parseInt(product_id, 10);
            product = await pool.query(query.getProduct(id));

            if (product.rowCount > 0 && product.rows[0].in_stock === true) {
                newCartProducts.push(product_id);
                return product.rows[0];
            }

        });

        let allProductsInCart = await Promise.all(result);
        await pool.query(query.updateCart(newCartProducts, userId));

        return allProductsInCart;
    } catch (error) {
        return error;
    }
}

