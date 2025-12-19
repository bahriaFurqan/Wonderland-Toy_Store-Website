# 🚀 Toy Store E-Commerce - Setup Guide

This guide will help you set up the complete toy store e-commerce application on your PC.

## 📋 Prerequisites

Before starting, make sure you have:
- ✅ Node.js (v18 or higher) installed
- ✅ Python (v3.8 or higher) installed
- ✅ SQL Server (Express or higher) installed
- ✅ SQL Server Management Studio (SSMS) installed

---

## 🔧 Step 1: Configure Backend Environment Variables

The backend uses a `.env` file to store all your credentials and configuration. This file is **NOT** tracked by Git for security.

### Create the `.env` file

1. Navigate to the `backend` folder
2. Copy the `.env.example` file and rename it to `.env`
3. Open `.env` in a text editor

### Configure Your Credentials

Edit the `.env` file with your actual credentials:

```env
# ============================================
# DATABASE CONFIGURATION (SQL Server)
# ============================================

# Your SQL Server instance name
# Examples:
#   - localhost (for default instance)
#   - localhost\SQLEXPRESS (for SQL Server Express)
#   - YOUR-PC-NAME\SQLEXPRESS (if using your PC name)
DB_SERVER=localhost

# Database name (will be created automatically)
DB_NAME=ToyStoreDB

# SQL Server Authentication (leave empty for Windows Authentication)
# If using SQL Server Authentication, fill these in:
DB_USER=
DB_PASSWORD=

# ODBC Driver - check which driver you have installed
# Common options:
#   - ODBC Driver 17 for SQL Server
#   - ODBC Driver 18 for SQL Server
#   - SQL Server Native Client 11.0
DB_DRIVER=ODBC Driver 17 for SQL Server

# ============================================
# FLASK CONFIGURATION
# ============================================

FLASK_APP=app.py
FLASK_ENV=development

# Secret keys - CHANGE THESE to random strings in production!
# You can generate random keys using: python -c "import secrets; print(secrets.token_hex(32))"
SECRET_KEY=your-secret-key-change-this-to-random-string-12345
JWT_SECRET_KEY=your-jwt-secret-key-change-this-to-random-string-67890

# ============================================
# SERVER CONFIGURATION
# ============================================

# Port for Flask API
PORT=5000

# Host (0.0.0.0 allows access from other devices on network)
HOST=0.0.0.0
```

### 🔍 How to Find Your SQL Server Instance Name

**Option 1: Using SSMS**
1. Open SQL Server Management Studio (SSMS)
2. Look at the "Server name" dropdown when connecting
3. Your instance name will be shown (e.g., `localhost\SQLEXPRESS`)

**Option 2: Using Services**
1. Press `Win + R`, type `services.msc`
2. Look for "SQL Server (SQLEXPRESS)" or "SQL Server (MSSQLSERVER)"
3. If you see SQLEXPRESS, use `localhost\SQLEXPRESS`
4. If you see MSSQLSERVER, use `localhost`

**Option 3: Using Command Prompt**
```bash
sqlcmd -L
```
This will list all SQL Server instances on your network.

### 🔐 Authentication Options

**Windows Authentication (Recommended for local development):**
```env
DB_SERVER=localhost\SQLEXPRESS
DB_NAME=ToyStoreDB
DB_USER=
DB_PASSWORD=
```

**SQL Server Authentication:**
```env
DB_SERVER=localhost\SQLEXPRESS
DB_NAME=ToyStoreDB
DB_USER=sa
DB_PASSWORD=YourStrongPassword123!
```

---

## 🎨 Step 2: Configure Frontend Environment Variables

The frontend also uses a `.env` file for API configuration.

### Create the `.env` file

1. Navigate to the `frontend` folder
2. Create a new file named `.env`
3. Add the following content:

```env
# ============================================
# API CONFIGURATION
# ============================================

# Backend API URL
# For local development, use http://localhost:5000
# For production, use your deployed API URL
VITE_API_URL=http://localhost:5000
```

---

## 🗄️ Step 3: Set Up the Database

### Option A: Automatic Setup (Recommended)

The database and tables will be created automatically when you run the Flask app for the first time.

1. Open a terminal in the `backend` folder
2. Create a Python virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   ```bash
   venv\Scripts\activate
   ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Run the seed script to create database and add sample data:
   ```bash
   python seed_data.py
   ```

This will:
- ✅ Create the `ToyStoreDB` database
- ✅ Create all required tables
- ✅ Add 12 sample products
- ✅ Create a test user (username: `testuser`, password: `password123`)

### Option B: Manual Setup

If you prefer to create the database manually:

1. Open SQL Server Management Studio (SSMS)
2. Connect to your SQL Server instance
3. Run this SQL command:
   ```sql
   CREATE DATABASE ToyStoreDB;
   ```

4. Then run the Flask app, and it will create the tables automatically:
   ```bash
   python app.py
   ```

---

## 🚀 Step 4: Start the Application

### Start the Backend (Terminal 1)

```bash
cd backend
venv\Scripts\activate
python app.py
```

You should see:
```
 * Running on http://0.0.0.0:5000
```

Test the API by opening: `http://localhost:5000/health`

### Start the Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

Open your browser to: `http://localhost:5173`

---

## 🧪 Step 5: Test the Application

### Test User Login

1. Go to `http://localhost:5173/login`
2. Login with:
   - **Username:** `testuser`
   - **Password:** `password123`

### Test Features

- ✅ Browse products on the homepage
- ✅ View product details with 3D viewer
- ✅ Add products to cart
- ✅ View and manage cart
- ✅ Search and filter products

---

## 🔧 Troubleshooting

### Database Connection Issues

**Error: "Login failed for user"**
- Solution: Use Windows Authentication (leave `DB_USER` and `DB_PASSWORD` empty)

**Error: "Cannot open database"**
- Solution: Run `python seed_data.py` to create the database

**Error: "Driver not found"**
- Solution: Install ODBC Driver 17 from Microsoft's website
- Or change `DB_DRIVER` to match your installed driver

### Backend Issues

**Error: "Module not found"**
- Solution: Make sure you activated the virtual environment and installed requirements:
  ```bash
  venv\Scripts\activate
  pip install -r requirements.txt
  ```

**Error: "Port 5000 already in use"**
- Solution: Change the `PORT` in `.env` to a different port (e.g., 5001)

### Frontend Issues

**Error: "Cannot connect to API"**
- Solution: Make sure the backend is running on `http://localhost:5000`
- Check that `VITE_API_URL` in frontend `.env` matches the backend URL

**Blank page or errors**
- Solution: Clear browser cache and reload
- Check browser console for errors (F12)

---

## 📝 Environment Variables Reference

### Backend `.env` Variables

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `DB_SERVER` | SQL Server instance | `localhost\SQLEXPRESS` | ✅ Yes |
| `DB_NAME` | Database name | `ToyStoreDB` | ✅ Yes |
| `DB_USER` | SQL Server username | `sa` or empty | ⚠️ Optional |
| `DB_PASSWORD` | SQL Server password | `YourPassword` or empty | ⚠️ Optional |
| `DB_DRIVER` | ODBC Driver name | `ODBC Driver 17 for SQL Server` | ✅ Yes |
| `SECRET_KEY` | Flask secret key | Random string | ✅ Yes |
| `JWT_SECRET_KEY` | JWT secret key | Random string | ✅ Yes |
| `PORT` | Backend port | `5000` | ✅ Yes |
| `HOST` | Backend host | `0.0.0.0` | ✅ Yes |

### Frontend `.env` Variables

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000` | ✅ Yes |

---

## 🎉 You're All Set!

Your toy store e-commerce application is now running! 

**Next Steps:**
- Create your own user account via the Register page
- Add more products through the API
- Customize the design and colors
- Deploy to production when ready

**Need Help?**
- Check the README.md for more information
- Review the implementation_plan.md for technical details
- Check the API documentation in the backend routes

---

## 🔒 Security Notes

**Important for Production:**

1. **Never commit `.env` files to Git** - They contain sensitive credentials
2. **Change the secret keys** - Generate random strings for `SECRET_KEY` and `JWT_SECRET_KEY`
3. **Use strong passwords** - If using SQL Server Authentication
4. **Enable HTTPS** - In production, always use HTTPS
5. **Update CORS settings** - Configure allowed origins in `app.py`

---

Happy coding! 🧸🎮🎨
