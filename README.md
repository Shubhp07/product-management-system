# Node.js + Angular + MySQL CRUD Application

A complete Product Management System with Category and Product Master featuring full CRUD operations and server-side pagination.

## Features

✅ **Category Master**
- Create, Read, Update, Delete categories
- Simple and clean interface
- Input validation

✅ **Product Master**
- Create, Read, Update, Delete products
- Product list displays: ProductId, ProductName, CategoryId, CategoryName
- Server-side pagination (fetches only requested page data from database)
- Configurable page size (5, 10, 20, 50)
- Product belongs to a category (foreign key relationship)

✅ **Technology Stack**
- Backend: Node.js + Express
- Frontend: Angular 17 (Standalone Components)
- Database: MySQL (RDBMS)
- RESTful API architecture

## Prerequisites

Before running this application, make sure you have installed:
- Node.js (v16 or higher)
- npm (v7 or higher)
- MySQL Server (v8.0 or higher)
- Angular CLI (`npm install -g @angular/cli`)
  
## Project Screenshot

<img width="1352" height="681" alt="Screenshot 2026-01-28 212552" src="https://github.com/user-attachments/assets/921a6e2a-b504-49ec-b29b-b977c43b59ce" />
<img width="1353" height="625" alt="Screenshot 2026-01-28 212609" src="https://github.com/user-attachments/assets/644e5267-7202-4889-8b37-43f437611388" />
<img width="1350" height="677" alt="Screenshot 2026-01-28 212623" src="https://github.com/user-attachments/assets/52148d34-5da4-4936-aa76-359a92ac499e" />
<img width="1349" height="678" alt="Screenshot 2026-01-28 212635" src="https://github.com/user-attachments/assets/4443c046-57b7-41b7-9499-15ceca9f4c56" />

## Project Structure
```
nodejs-crud-app/
├── backend/
│   ├── config/
│   │   └── database.js           # Database connection
│   ├── controllers/
│   │   ├── category.controller.js
│   │   └── product.controller.js
│   ├── models/
│   │   ├── category.model.js
│   │   └── product.model.js      # Includes pagination logic
│   ├── routes/
│   │   ├── category.routes.js
│   │   └── product.routes.js
│   ├── database/
│   │   └── init.sql              # Database schema & sample data
│   ├── .env                      # Environment variables
│   ├── package.json
│   └── server.js                 # Main server file
│
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── components/
    │   │   │   ├── category-list/
    │   │   │   │   ├── category-list.component.ts
    │   │   │   │   ├── category-list.component.html
    │   │   │   │   └── category-list.component.css
    │   │   │   └── product-list/
    │   │   │       ├── product-list.component.ts
    │   │   │       ├── product-list.component.html
    │   │   │       └── product-list.component.css
    │   │   ├── models/
    │   │   │   ├── category.model.ts
    │   │   │   └── product.model.ts
    │   │   ├── services/
    │   │   │   ├── category.service.ts
    │   │   │   └── product.service.ts
    │   │   ├── app.component.ts
    │   │   ├── app.component.html
    │   │   ├── app.component.css
    │   │   └── app.config.ts
    │   ├── index.html
    │   ├── main.ts
    │   └── styles.css
    ├── angular.json
    ├── package.json
    └── tsconfig.json
```

## Installation & Setup

### Step 1: Database Setup

1. Open MySQL command line or MySQL Workbench
2. Run the database initialization script:

```bash
mysql -u root -p < backend/database/init.sql
```

Or manually execute the SQL commands in `backend/database/init.sql`

3. Verify database creation:
```sql
SHOW DATABASES;
USE product_management;
SHOW TABLES;
SELECT * FROM categories;
SELECT * FROM products;
```

### Step 2: Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=product_management
```

4. Start the backend server:
```bash
npm start
```

The backend API will run on `http://localhost:3000`

**API Endpoints:**
- Categories:
  - GET `/api/categories` - Get all categories
  - GET `/api/categories/:id` - Get category by ID
  - POST `/api/categories` - Create category
  - PUT `/api/categories/:id` - Update category
  - DELETE `/api/categories/:id` - Delete category

- Products:
  - GET `/api/products?page=1&pageSize=10` - Get products with pagination
  - GET `/api/products/:id` - Get product by ID
  - POST `/api/products` - Create product
  - PUT `/api/products/:id` - Update product
  - DELETE `/api/products/:id` - Delete product

### Step 3: Frontend Setup

1. Open a new terminal and navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the Angular development server:
```bash
npm start
# or
ng serve
```

The frontend will run on `http://localhost:4200`

## Usage

1. Open your browser and navigate to `http://localhost:4200`
2. You'll see two tabs: **Category Master** and **Product Master**

### Category Master
- View all categories in a table
- Create new categories using the form
- Edit existing categories
- Delete categories (will cascade delete associated products)

### Product Master
- View products with ProductId, ProductName, CategoryId, CategoryName
- Server-side pagination controls at the bottom
- Change page size (5, 10, 20, 50 items per page)
- Navigate between pages using Previous/Next or page numbers
- Create new products (must select a category)
- Edit existing products
- Delete products

## Server-Side Pagination Implementation

The pagination is implemented at the database level using MySQL `LIMIT` and `OFFSET`:

**Backend (product.model.js):**
```javascript
static async getAll(page = 1, pageSize = 10) {
  const offset = (page - 1) * pageSize;
  
  // Get total count
  const [countResult] = await db.query('SELECT COUNT(*) as total FROM products');
  const total = countResult[0].total;
  
  // Get only the requested page of data
  const [rows] = await db.query(
    `SELECT ... FROM products p
     INNER JOIN categories c ON p.category_id = c.id
     ORDER BY p.id DESC
     LIMIT ? OFFSET ?`,
    [parseInt(pageSize), parseInt(offset)]
  );
  
  return { data: rows, pagination: { page, pageSize, total, totalPages } };
}
```

**Example:**
- Total records: 100
- Page size: 10
- User on page 9
- Query executes: `LIMIT 10 OFFSET 80` (fetches records 81-90 only)

## Database Schema

### Categories Table
```sql
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Products Table
```sql
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2),
  category_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);
```

## Testing the Application

### Test Category CRUD:
1. Click on "Category Master" tab
2. Create a new category (e.g., "Toys", "Description")
3. Edit the category
4. Try to delete it (will work if no products are associated)

### Test Product CRUD:
1. Click on "Product Master" tab
2. Create a new product:
   - Name: "Action Figure"
   - Category: Select "Toys"
   - Price: 29.99
   - Description: "Popular action figure"
3. Observe the product list showing ProductId, ProductName, CategoryId, CategoryName
4. Edit the product
5. Delete the product

### Test Pagination:
1. Ensure you have enough products (sample data includes 20 products)
2. Set page size to 5
3. Navigate through pages 1, 2, 3, 4
4. Change page size to 10 and observe the list updates
5. Verify that only the requested records are loaded from the database

## API Testing with cURL

### Create Category:
```bash
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Category","description":"Test Description"}'
```

### Get All Categories:
```bash
curl http://localhost:3000/api/categories
```

### Create Product:
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Product","description":"Test","price":99.99,"category_id":1}'
```

### Get Products with Pagination:
```bash
curl "http://localhost:3000/api/products?page=2&pageSize=5"
```

## Troubleshooting

### Backend Issues:

**Error: ER_NOT_SUPPORTED_AUTH_MODE**
- Solution: Run this MySQL command:
```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';
FLUSH PRIVILEGES;
```

**Error: ECONNREFUSED**
- Ensure MySQL is running: `sudo service mysql start` (Linux) or start from Services (Windows)
- Check database credentials in `.env` file

**Error: Cannot find module**
- Run `npm install` in the backend directory

### Frontend Issues:

**Error: Cannot GET /api/categories**
- Ensure backend server is running on port 3000
- Check CORS is enabled in backend

**Error: ng command not found**
- Install Angular CLI: `npm install -g @angular/cli`

**Blank page on load**
- Check browser console for errors
- Ensure backend API is accessible

## Dependencies

### Backend:
```json
{
  "express": "^4.18.2",
  "mysql2": "^3.6.5",
  "cors": "^2.8.5",
  "body-parser": "^1.20.2",
  "dotenv": "^16.3.1"
}
```

### Frontend:
```json
{
  "@angular/core": "^17.0.0",
  "@angular/common": "^17.0.0",
  "@angular/forms": "^17.0.0",
  "@angular/platform-browser": "^17.0.0"
}
```

## Production Deployment

### Backend:
1. Set environment variables on server
2. Use PM2 for process management:
```bash
npm install -g pm2
pm2 start server.js --name "product-api"
```

### Frontend:
1. Build for production:
```bash
ng build --configuration production
```
2. Deploy the `dist/` folder to your web server (Nginx, Apache)

## Contributing

This is a test project demonstrating CRUD operations with server-side pagination.

## License

MIT License
