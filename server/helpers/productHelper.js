import 'core-js/stable';
import 'regenerator-runtime';
import errorHandler from '../utils/handleError';
import pool from '../utils/pool';
import query from '../queries/queries';
import { request } from 'express';


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
            const allProducts = await pool.query(query.getAllProducts());
            const isExists = req.body.name ? allProducts.rows.some(product => product.name === req.body.name) : false;

            if (isExists) {
                errorHandler(409, 'The provided product name already exists.');
            }
            let id = req.params.id;
            let product = request.body;
            let price;
            if (req.body.price !== undefined) {
                price = parseFloat(req.body.price, 10).toFixed(2);
                product =  { ...req.body, price };
            } 

            id = parseInt(id, 10);
            const productData = await pool.query(query.getProduct(id));
            if (productData.rowCount < 1) {
                errorHandler(404, 'Product not found');
            }
            let updatedProduct = await pool.query(query.updateProduct(id, product));
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
            if (deletedProduct.rowCount < 1) errorHandler(500, 'There was a problem deleting product');
            return deletedProduct.rows[0];
        } catch (error) {
            return error;
        }

    }
}

export default ProductHelper;