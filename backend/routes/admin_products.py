from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from middleware.admin_auth import admin_required
from models import Product, db
from datetime import datetime

admin_products_bp = Blueprint('admin_products', __name__)

@admin_products_bp.route('/api/admin/products', methods=['GET'])
@admin_required
def get_all_products():
    """Get all products with pagination and filters for admin"""
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 20, type=int)
    search = request.args.get('search', '')
    category = request.args.get('category', '')
    
    query = Product.query
    
    if search:
        query = query.filter(Product.name.ilike(f'%{search}%'))
    if category:
        query = query.filter(Product.category == category)
    
    pagination = query.order_by(Product.created_at.desc()).paginate(
        page=page, per_page=per_page, error_out=False
    )
    
    return jsonify({
        'products': [product.to_dict() for product in pagination.items],
        'total': pagination.total,
        'pages': pagination.pages,
        'current_page': page
    }), 200

@admin_products_bp.route('/api/admin/products', methods=['POST'])
@admin_required
def create_product():
    """Create a new product"""
    data = request.get_json()
    
    required_fields = ['name', 'price']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'{field} is required'}), 400
    
    try:
        product = Product(
            name=data['name'],
            description=data.get('description', ''),
            price=float(data['price']),
            category=data.get('category', ''),
            age_range=data.get('age_range', ''),
            stock_quantity=data.get('stock_quantity', 0),
            image_url=data.get('image_url', ''),
            brand=data.get('brand', ''),
            rating=data.get('rating', 0.0),
            is_featured=data.get('is_featured', False)
        )
        
        db.session.add(product)
        db.session.commit()
        
        return jsonify({
            'message': 'Product created successfully',
            'product': product.to_dict()
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@admin_products_bp.route('/api/admin/products/<int:product_id>', methods=['PUT'])
@admin_required
def update_product(product_id):
    """Update an existing product"""
    product = Product.query.get(product_id)
    if not product:
        return jsonify({'error': 'Product not found'}), 404
    
    data = request.get_json()
    
    try:
        if 'name' in data:
            product.name = data['name']
        if 'description' in data:
            product.description = data['description']
        if 'price' in data:
            product.price = float(data['price'])
        if 'category' in data:
            product.category = data['category']
        if 'age_range' in data:
            product.age_range = data['age_range']
        if 'stock_quantity' in data:
            product.stock_quantity = data['stock_quantity']
        if 'image_url' in data:
            product.image_url = data['image_url']
        if 'brand' in data:
            product.brand = data['brand']
        if 'rating' in data:
            product.rating = data['rating']
        if 'is_featured' in data:
            product.is_featured = data['is_featured']
        
        db.session.commit()
        
        return jsonify({
            'message': 'Product updated successfully',
            'product': product.to_dict()
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@admin_products_bp.route('/api/admin/products/<int:product_id>', methods=['DELETE'])
@admin_required
def delete_product(product_id):
    """Delete a product"""
    product = Product.query.get(product_id)
    if not product:
        return jsonify({'error': 'Product not found'}), 404
    
    try:
        db.session.delete(product)
        db.session.commit()
        
        return jsonify({'message': 'Product deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@admin_products_bp.route('/api/admin/products/<int:product_id>/stock', methods=['PATCH'])
@admin_required
def update_stock(product_id):
    """Update product stock quantity"""
    product = Product.query.get(product_id)
    if not product:
        return jsonify({'error': 'Product not found'}), 404
    
    data = request.get_json()
    if 'stock_quantity' not in data:
        return jsonify({'error': 'stock_quantity is required'}), 400
    
    try:
        product.stock_quantity = data['stock_quantity']
        db.session.commit()
        
        return jsonify({
            'message': 'Stock updated successfully',
            'product': product.to_dict()
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
