import errorHandler from '../utils/handleError';
import pool from '../utils/pool';
import query from '../queries/queries';


class ProductHelper {
    static async createProduct(req) {
        try {
            let { price, inStock } = req.body;
            price = parseFloat(price, 10).toFixed(2);

            inStock = inStock === undefined ? true : inStock;

            const allProducts = await pool.query(query.getAllProducts());
            const isExists = allProducts.rows.some(product => product.name === req.body.name);

            if (isExists) {
                errorHandler(409, 'The provided product name already exists.');
            }

            let product = { ...req.body, price, inStock };
            let createdProduct = await pool.query(query.createProduct(product));
            return createdProduct.rows[0];
        } catch (error) {
            return error;
        }

    }

    static async updateProduct(req) {
        try {
            let id = req.params.id;
            let price = req.body;

            if (price) {
                price = parseFloat(price, 10).toFixed(2);
            }

            let productData = { ...req.body, price }

            id = parseInt(id, 10);
            const product = await pool.query(query.getUserById(id));
            if (product.rowCount < 1) {
                errorHandler(404, 'Product not found');
            }
            let updatedProduct = pool.query(query.updateProduct(id, productData));
            return updatedProduct.rows[0];
        } catch (error) {
            return error;
        }

    }

    static async getAllProducts() {
        try {
            const allProducts = await pool.query(query.getAllProducts());
            if (allProducts.rowCount < 1) errorHandler(404, 'No product found');
            return allProducts.rows;
        } catch (error) {
            return error;
        }

    }

    static async getProduct(req) {
        try {
            let id = req.params.id;
            id = parseInt(id, 10);
            const product = await pool.query(query.getProduct(id));
            if (product.rowCount < 1) errorHandler(404, 'Product not found');
            return product.rows[0];
        } catch (error) {
            return error;
        }
    }

    static async deleteProduct(req) {
        try {
            let id = req.params.id;
            id = parseInt(id, 10);
            const product = await pool.query(query.getProduct(id));
            if (product.rowCount < 1) errorHandler(404, 'Product not found');
            let deletedProduct = await pool.query(query.deleteProduct(id));
            if (deletedProduct.rowCount < 1) throw new Error('There was a problem deleting product');
            return [];
        } catch (error) {
            return error;
        }

    }
}

export default ProductHelper;