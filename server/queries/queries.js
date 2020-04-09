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
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email]
    });
  },

  getUserById(id) {
    return ({
      text: 'SELECT * FROM users WHERE id = $1',
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
      text: 'DELETE FROM users WHERE id = $1 RETURNING *',
      values: [userId]
    });
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
    console.log(product)
    return ({
      text: `UPDATE products SET
            name = COALESCE($1, name),
            description = COALESCE($2, description),
            category = COALESCE($3, category),
            price = COALESCE($4, price),
            image_url = COALESCE($5, image_url),
            in_stock = COALESCE($6, in_stock)
            WHERE product_id = $7
            RETURNING *`,
      values: [
        product.name,
        product.description,
        product.category,
        product.price,
        product.imageUrl,
        product.inStock,
        id
      ]
    });
  },

  getProduct(id) {
    return ({
      text: 'SELECT * FROM products WHERE product_id = $1',
      values: [id]
    });
  },

  getProductByName(name) {
    return ({
      text: 'SELECT * FROM products WHERE name = $1',
      values: [name]
    });
  },

  getAllProducts() {
    return ({
      text: 'SELECT * FROM products',
      values: []
    });
  },

  deleteProduct(id) {
    return ({
      text: 'DELETE FROM products WHERE product_id = $1 RETURNING *',
      values: [id]
    });
  },

  createCart(userId) {
    return ({
      text: `INSERT INTO carts(user_id)
            VALUES($1) RETURNING *`,
      values: [userId]
    });
  },

  updateCart(newCartproducts, userId) {
    return ({
      text: `UPDATE carts SET products_id = $1
             WHERE user_id = $2`,
      values: [newCartproducts, userId]
    });
  },

  getUserCart(userId) {
    return ({
      text: 'SELECT * FROM carts WHERE user_id = $1',
      values: [userId]
    });
  },

  getAllProductsInCarts(userId) {
    return ({
      text: 'SELECT products_id FROM carts WHERE user_id = $1',
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
