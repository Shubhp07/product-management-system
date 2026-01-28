-- Create database
CREATE DATABASE IF NOT EXISTS product_management;
USE product_management;

-- Create Category table
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Product table
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2),
  category_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Insert sample categories
INSERT INTO categories (name, description) VALUES
('Electronics', 'Electronic devices and gadgets'),
('Clothing', 'Fashion and apparel'),
('Books', 'Books and publications'),
('Home & Garden', 'Home improvement and gardening'),
('Sports', 'Sports equipment and accessories');

-- Insert sample products
INSERT INTO products (name, description, price, category_id) VALUES
('Laptop', 'High performance laptop', 999.99, 1),
('Smartphone', 'Latest smartphone model', 699.99, 1),
('T-Shirt', 'Cotton t-shirt', 19.99, 2),
('Jeans', 'Denim jeans', 49.99, 2),
('Novel', 'Fiction novel', 14.99, 3),
('Textbook', 'Educational textbook', 89.99, 3),
('Garden Tools Set', 'Complete gardening set', 129.99, 4),
('Basketball', 'Professional basketball', 29.99, 5),
('Tennis Racket', 'Carbon fiber tennis racket', 149.99, 5),
('Headphones', 'Wireless headphones', 79.99, 1),
('Dress Shirt', 'Formal dress shirt', 39.99, 2),
('Cookbook', 'Recipe collection', 24.99, 3),
('Lamp', 'LED desk lamp', 34.99, 4),
('Yoga Mat', 'Non-slip yoga mat', 29.99, 5),
('Tablet', '10-inch tablet', 399.99, 1),
('Jacket', 'Winter jacket', 89.99, 2),
('Magazine', 'Monthly magazine', 4.99, 3),
('Flower Pot', 'Ceramic flower pot', 12.99, 4),
('Soccer Ball', 'FIFA approved soccer ball', 39.99, 5),
('Smartwatch', 'Fitness tracking smartwatch', 249.99, 1);