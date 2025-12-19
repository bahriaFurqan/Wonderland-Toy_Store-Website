from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Configuration
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'jwt-secret-key')

# Database configuration for SQL Server
DB_SERVER = os.getenv('DB_SERVER', 'localhost')
DB_NAME = os.getenv('DB_NAME', 'ToyStoreDB')
DB_USER = os.getenv('DB_USER', '')
DB_PASSWORD = os.getenv('DB_PASSWORD', '')
DB_DRIVER = os.getenv('DB_DRIVER', 'ODBC Driver 17 for SQL Server')

# SQLAlchemy connection string for SQL Server
if DB_USER and DB_PASSWORD:
    app.config['SQLALCHEMY_DATABASE_URI'] = f'mssql+pyodbc://{DB_USER}:{DB_PASSWORD}@{DB_SERVER}/{DB_NAME}?driver={DB_DRIVER}'
else:
    # Windows Authentication
    app.config['SQLALCHEMY_DATABASE_URI'] = f'mssql+pyodbc://{DB_SERVER}/{DB_NAME}?driver={DB_DRIVER}&trusted_connection=yes'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
from database import db
db.init_app(app)
jwt = JWTManager(app)
CORS(app)

# Import routes
from routes import product_routes, user_routes, cart_routes, order_routes
from routes import admin_products, admin_orders, admin_users, admin_analytics

# Register blueprints
app.register_blueprint(product_routes.bp)
app.register_blueprint(user_routes.bp)
app.register_blueprint(cart_routes.bp)
app.register_blueprint(order_routes.bp)

# Register admin blueprints
app.register_blueprint(admin_products.admin_products_bp)
app.register_blueprint(admin_orders.admin_orders_bp)
app.register_blueprint(admin_users.admin_users_bp)
app.register_blueprint(admin_analytics.admin_analytics_bp)

@app.route('/')
def index():
    return {'message': 'Welcome to Toy Store API', 'status': 'running'}

@app.route('/health')
def health():
    return {'status': 'healthy'}

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    
    port = int(os.getenv('PORT', 5000))
    host = os.getenv('HOST', '0.0.0.0')
    app.run(host=host, port=port, debug=True)
