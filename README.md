# Toy Store E-Commerce Website

A full-stack e-commerce toy store application built with React, Vite, Python Flask, and SQL Server.

## Tech Stack

### Frontend
- **React 18** with **Vite** - Fast, modern development experience
- **Tailwind CSS** - Utility-first CSS framework for beautiful, responsive design
- **Three.js** with **React Three Fiber** - 3D graphics and animations
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests

### Backend
- **Python Flask** - Lightweight web framework
- **SQLAlchemy** - ORM for database operations
- **Flask-JWT-Extended** - JWT authentication
- **Flask-CORS** - Cross-origin resource sharing
- **pyodbc** - SQL Server database connector

### Database
- **Microsoft SQL Server** - Relational database management system

## Project Structure

```
SC Project/
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── context/         # React context providers
│   │   ├── utils/           # Utility functions
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── public/              # Static assets
│   ├── package.json
│   └── vite.config.js
│
└── backend/                  # Python Flask backend
    ├── routes/              # API route blueprints
    │   ├── product_routes.py
    │   ├── user_routes.py
    │   ├── cart_routes.py
    │   └── order_routes.py
    ├── app.py               # Flask application
    ├── models.py            # Database models
    ├── requirements.txt     # Python dependencies
    └── .env                 # Environment variables
```

## Features

- 🛍️ Product catalog with filtering and search
- 🛒 Shopping cart management
- 👤 User authentication (register/login)
- 📦 Order management
- 🎨 Beautiful UI with Tailwind CSS
- 🎮 3D product visualization with Three.js
- 📱 Responsive design
- 🔐 JWT-based authentication
- 💳 Checkout process

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Python (v3.8 or higher)
- SQL Server (Express or higher)
- SQL Server Management Studio (SSMS)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   ```

3. **Activate virtual environment:**
   - Windows: `venv\Scripts\activate`
   - Mac/Linux: `source venv/bin/activate`

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Update database credentials in `.env`:
     ```
     DB_SERVER=localhost
     DB_NAME=ToyStoreDB
     DB_USER=your_username
     DB_PASSWORD=your_password
     DB_DRIVER=ODBC Driver 17 for SQL Server
     ```

6. **Run the Flask application:**
   ```bash
   python app.py
   ```
   The API will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

### Database Setup

1. **Open SQL Server Management Studio (SSMS)**

2. **Connect to your SQL Server instance**

3. **The database and tables will be created automatically** when you first run the Flask application

4. **(Optional) Add sample data:**
   ```bash
   cd backend
   python seed_data.py
   ```

## API Endpoints

### Products
- `GET /api/products/` - Get all products
- `GET /api/products/<id>` - Get single product
- `GET /api/products/featured` - Get featured products
- `POST /api/products/` - Create product (admin)
- `PUT /api/products/<id>` - Update product (admin)
- `DELETE /api/products/<id>` - Delete product (admin)

### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)

### Cart
- `GET /api/cart/` - Get cart items (protected)
- `POST /api/cart/add` - Add item to cart (protected)
- `PUT /api/cart/<id>` - Update cart item (protected)
- `DELETE /api/cart/<id>` - Remove cart item (protected)
- `DELETE /api/cart/clear` - Clear cart (protected)

### Orders
- `GET /api/orders/` - Get user orders (protected)
- `GET /api/orders/<id>` - Get specific order (protected)
- `POST /api/orders/create` - Create order (protected)
- `PUT /api/orders/<id>/status` - Update order status (admin)

## Development

### Running Both Servers Concurrently

**Terminal 1 - Backend:**
```bash
cd backend
venv\Scripts\activate  # Windows
python app.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
```

The production build will be in `frontend/dist/`

## Database Schema

### Users Table
- id (Primary Key)
- username
- email
- password_hash
- first_name, last_name
- phone, address
- created_at

### Products Table
- id (Primary Key)
- name, description
- price
- category, age_range
- stock_quantity
- image_url, brand
- rating, is_featured
- created_at

### Cart Items Table
- id (Primary Key)
- user_id (Foreign Key)
- product_id (Foreign Key)
- quantity
- added_at

### Orders Table
- id (Primary Key)
- user_id (Foreign Key)
- total_amount
- status
- shipping_address
- payment_method
- created_at, updated_at

### Order Items Table
- id (Primary Key)
- order_id (Foreign Key)
- product_id (Foreign Key)
- quantity, price

## License

This project is for educational purposes.
