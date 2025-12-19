from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import CartItem, Product
from database import db

bp = Blueprint('cart', __name__, url_prefix='/api/cart')

@bp.route('/', methods=['GET'])
@jwt_required()
def get_cart():
    """Get user's cart items"""
    user_id = get_jwt_identity()
    cart_items = CartItem.query.filter_by(user_id=user_id).all()
    return jsonify([item.to_dict() for item in cart_items])

@bp.route('/add', methods=['POST'])
@jwt_required()
def add_to_cart():
    """Add item to cart"""
    user_id = get_jwt_identity()
    data = request.get_json()
    
    product_id = data['product_id']
    quantity = data.get('quantity', 1)
    
    # Check if product exists
    product = Product.query.get_or_404(product_id)
    
    # Check if item already in cart
    cart_item = CartItem.query.filter_by(
        user_id=user_id,
        product_id=product_id
    ).first()
    
    if cart_item:
        cart_item.quantity += quantity
    else:
        cart_item = CartItem(
            user_id=user_id,
            product_id=product_id,
            quantity=quantity
        )
        db.session.add(cart_item)
    
    db.session.commit()
    return jsonify(cart_item.to_dict()), 201

@bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_cart_item(id):
    """Update cart item quantity"""
    user_id = get_jwt_identity()
    cart_item = CartItem.query.filter_by(id=id, user_id=user_id).first_or_404()
    
    data = request.get_json()
    cart_item.quantity = data['quantity']
    
    db.session.commit()
    return jsonify(cart_item.to_dict())

@bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def remove_from_cart(id):
    """Remove item from cart"""
    user_id = get_jwt_identity()
    cart_item = CartItem.query.filter_by(id=id, user_id=user_id).first_or_404()
    
    db.session.delete(cart_item)
    db.session.commit()
    return '', 204

@bp.route('/clear', methods=['DELETE'])
@jwt_required()
def clear_cart():
    """Clear all items from cart"""
    user_id = get_jwt_identity()
    CartItem.query.filter_by(user_id=user_id).delete()
    db.session.commit()
    return '', 204
