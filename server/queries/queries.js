const queries = {

  regUser(firstName, lastName, email, hashedpassword, isAdmin) {
    return ({
      text: `INSERT INTO users (first_name, last_name, 
                email, password, is_admin)
                VALUES($1, $2, $3, $4, $5) RETURNING *`,

      values: [
        firstName,
        lastName,
        email,
        hashedpassword,
        isAdmin
      ]
    });
  },

  getUserByEmail(email) {
    return ({
      text: `SELECT * FROM users WHERE email = $1`,
      values: [email]
    });
  },

  getUserById(id) {
    return ({
      text: `SELECT * FROM users WHERE id = $1`,
      values: [id]
    });
  },

  updateUserPassword(hashNewPassword, userId) {
    return ({
      text: `UPDATE users SET
            password = COALESCE($1, password) WHERE id = $2 RETURNING *`,
      values: [hashNewPassword, userId]
    });
  },

  deleteUser(userId) {
    return ({
      text: `DELETE FROM users WHERE id = $1 RETURNING *`,
      values: [userId]
    })
  },

  createProduct(product) {
    return ({
      text: `INSERT INTO products 
              (name, description, category, price, image_url, in_stock) 
              VALUES 
              ($1, $2, $3, $4, $5, $6) RETURNING *`,
      values: [
        product.name,
        product.description,
        product.category,
        product.price,
        product.imageUrl,
        product.inStock
      ]
    });
  },

  updateProduct(id, product) {
    return ({
      text: `UPDATE products SET
            name = COALESCE($1, name),
            description = COALESCE($2, description),
            category = COALESCE($3, category),
            price = COALESCE($4, price),
            image_url = COALESCE($5, image_url)
            WHERE product_id = $6
            RETURNING *`,
      values: [
        product.name,
        product.description,
        product.category,
        product.price,
        product.imageUrl,
        id
      ]
    });
  },

  getProduct(id) {
    return ({
      text: `SELECT * FROM products WHERE product_id = $1`,
      values: [id]
    });
  },

  getAllProducts() {
    return ({
      text: `SELECT * FROM products`,
      values: []
    });
  },

  deleteProduct(id) {
    return ({
      text: `DELETE FROM products WHERE product_id = $1 RETURNING *`,
      values: [id]
    });
  },

  addCart(productId, userId) {
    return ({
      text: `INSERT INTO carts (product_id, user_id)
            VALUES($1, $2) RETURNING *`,
      values: [productId, userId]
    });
  },

  getAllUserCarts(userId) {
    return ({
      text: 'SELECT * FROM carts WHERE user_id = $1',
      values: [userId]
    });
  },

  getAllProductsInCarts(userId) {
    return ({
      text: 'SELECT product_id FROM carts WHERE user_id = $1',
      values: [userId]
    });
  },

  getCart(cartId, userId) {
    return ({
      text: 'SELECT * FROM carts WHERE id = $1 and user_id = $2',
      values: [cartId, userId]
    });
  },

  deleteCart(cartId, userId) {
    return ({
      text: 'DELETE FROM carts WHERE id = $1 AND user_id = $2',
      values: [
        cartId, userId
      ]
    });
  }
};

export default queries;
