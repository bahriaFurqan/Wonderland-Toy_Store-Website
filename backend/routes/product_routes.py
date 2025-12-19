from flask import Blueprint, request, jsonify
from models import Product
from database import db

bp = Blueprint('products', __name__, url_prefix='/api/products')

@bp.route('/', methods=['GET'])
def get_products():
    """Get all products with optional filtering"""
    category = request.args.get('category')
    age_range = request.args.get('age_range')
    search = request.args.get('search')
    
    query = Product.query
    
    if category:
        query = query.filter_by(category=category)
    if age_range:
        query = query.filter_by(age_range=age_range)
    if search:
        query = query.filter(Product.name.contains(search))
    
    products = query.all()
    return jsonify([product.to_dict() for product in products])

@bp.route('/<int:id>', methods=['GET'])
def get_product(id):
    """Get a single product by ID"""
    product = Product.query.get_or_404(id)
    return jsonify(product.to_dict())

@bp.route('/featured', methods=['GET'])
def get_featured_products():
    """Get featured products"""
    products = Product.query.filter_by(is_featured=True).all()
    return jsonify([product.to_dict() for product in products])

@bp.route('/', methods=['POST'])
def create_product():
    """Create a new product (Admin only)"""
    data = request.get_json()
    
    product = Product(
        name=data['name'],
        description=data.get('description'),
        price=data['price'],
        category=data.get('category'),
        age_range=data.get('age_range'),
        stock_quantity=data.get('stock_quantity', 0),
        image_url=data.get('image_url'),
        brand=data.get('brand'),
        is_featured=data.get('is_featured', False)
    )
    
    db.session.add(product)
    db.session.commit()
    
    return jsonify(product.to_dict()), 201

@bp.route('/<int:id>', methods=['PUT'])
def update_product(id):
    """Update a product (Admin only)"""
    product = Product.query.get_or_404(id)
    data = request.get_json()
    
    for key, value in data.items():
        if hasattr(product, key):
            setattr(product, key, value)
    
    db.session.commit()
    return jsonify(product.to_dict())

@bp.route('/<int:id>', methods=['DELETE'])
def delete_product(id):
    """Delete a product (Admin only)"""
    product = Product.query.get_or_404(id)
    db.session.delete(product)
    db.session.commit()
    return '', 204
