const db = require("../config/database");

class Product {
  // Get all products with pagination and category details
  static async getAll(page = 1, pageSize = 10) {
    const offset = (page - 1) * pageSize;

    // Get total count
    const [countResult] = await db.query(
      "SELECT COUNT(*) as total FROM products",
    );
    const total = countResult[0].total;

    // Get paginated products with category information
    const [rows] = await db.query(
      `SELECT 
        p.id as ProductId, 
        p.name as ProductName, 
        p.description, 
        p.price,
        p.category_id as CategoryId,
        c.name as CategoryName,
        p.created_at,
        p.updated_at
      FROM products p
      INNER JOIN categories c ON p.category_id = c.id
      ORDER BY p.id ASC
      LIMIT ? OFFSET ?`,
      [parseInt(pageSize), parseInt(offset)],
    );

    return {
      data: rows,
      pagination: {
        page: parseInt(page),
        pageSize: parseInt(pageSize),
        total: total,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  }

  // Get product by ID
  static async getById(id) {
    const [rows] = await db.query(
      `SELECT 
        p.id as ProductId, 
        p.name as ProductName, 
        p.description, 
        p.price,
        p.category_id as CategoryId,
        c.name as CategoryName,
        p.created_at,
        p.updated_at
      FROM products p
      INNER JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?`,
      [id],
    );
    return rows[0];
  }

  // Create new product
  static async create(product) {
    const [result] = await db.query(
      "INSERT INTO products (name, description, price, category_id) VALUES (?, ?, ?, ?)",
      [product.name, product.description, product.price, product.category_id],
    );
    return await this.getById(result.insertId);
  }

  // Update product
  static async update(id, product) {
    await db.query(
      "UPDATE products SET name = ?, description = ?, price = ?, category_id = ? WHERE id = ?",
      [
        product.name,
        product.description,
        product.price,
        product.category_id,
        id,
      ],
    );
    return await this.getById(id);
  }

  // Delete product
  static async delete(id) {
    await db.query("DELETE FROM products WHERE id = ?", [id]);
    return { id };
  }
}

module.exports = Product;
