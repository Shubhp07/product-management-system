const db = require('../config/database');

class Category {
  // Get all categories
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM categories ORDER BY name');
    return rows;
  }

  // Get category by ID
  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM categories WHERE id = ?', [id]);
    return rows[0];
  }

  // Create new category
  static async create(category) {
    const [result] = await db.query(
      'INSERT INTO categories (name, description) VALUES (?, ?)',
      [category.name, category.description]
    );
    return { id: result.insertId, ...category };
  }

  // Update category
  static async update(id, category) {
    await db.query(
      'UPDATE categories SET name = ?, description = ? WHERE id = ?',
      [category.name, category.description, id]
    );
    return { id, ...category };
  }

  // Delete category
  static async delete(id) {
    await db.query('DELETE FROM categories WHERE id = ?', [id]);
    return { id };
  }
}

module.exports = Category;