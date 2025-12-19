from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Order, OrderItem, CartItem, Product
from database import db
from datetime import datetime

bp = Blueprint('orders', __name__, url_prefix='/api/orders')

@bp.route('/', methods=['GET'])
@jwt_required()
def get_orders():
    """Get user's orders"""
    user_id = get_jwt_identity()
    orders = Order.query.filter_by(user_id=user_id).order_by(Order.created_at.desc()).all()
    return jsonify([order.to_dict() for order in orders])

@bp.route('/<int:id>', methods=['GET'])
@jwt_required()
def get_order(id):
    """Get a specific order"""
    user_id = get_jwt_identity()
    order = Order.query.filter_by(id=id, user_id=user_id).first_or_404()
    return jsonify(order.to_dict())

@bp.route('/create', methods=['POST'])
@jwt_required()
def create_order():
    """Create a new order from cart"""
    user_id = get_jwt_identity()
    data = request.get_json()
    
    # Get cart items
    cart_items = CartItem.query.filter_by(user_id=user_id).all()
    
    if not cart_items:
        return jsonify({'error': 'Cart is empty'}), 400
    
    # Calculate total
    total_amount = 0
    for item in cart_items:
        total_amount += item.product.price * item.quantity
    
    # Create order
    order = Order(
        user_id=user_id,
        total_amount=total_amount,
        shipping_address=data['shipping_address'],
        payment_method=data.get('payment_method', 'cash_on_delivery')
    )
    
    db.session.add(order)
    db.session.flush()  # Get order ID
    
    # Create order items
    for cart_item in cart_items:
        order_item = OrderItem(
            order_id=order.id,
            product_id=cart_item.product_id,
            quantity=cart_item.quantity,
            price=cart_item.product.price
        )
        db.session.add(order_item)
        
        # Update product stock
        cart_item.product.stock_quantity -= cart_item.quantity
    
    # Clear cart
    CartItem.query.filter_by(user_id=user_id).delete()
    
    db.session.commit()
    return jsonify(order.to_dict()), 201

@bp.route('/<int:id>/status', methods=['PUT'])
@jwt_required()
def update_order_status(id):
    """Update order status (Admin only)"""
    order = Order.query.get_or_404(id)
    data = request.get_json()
    
    order.status = data['status']
    order.updated_at = datetime.utcnow()
    
    db.session.commit()
    return jsonify(order.to_dict())
