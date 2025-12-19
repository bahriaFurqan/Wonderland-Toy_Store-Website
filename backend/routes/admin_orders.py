from flask import Blueprint, request, jsonify
from middleware.admin_auth import admin_required
from models import Order, User, OrderItem, db
from datetime import datetime, timedelta
from sqlalchemy import func

admin_orders_bp = Blueprint('admin_orders', __name__)

@admin_orders_bp.route('/api/admin/orders', methods=['GET'])
@admin_required
def get_all_orders():
    """Get all orders with pagination and filters"""
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 20, type=int)
    status = request.args.get('status', '')
    
    query = Order.query
    
    if status:
        query = query.filter(Order.status == status)
    
    pagination = query.order_by(Order.created_at.desc()).paginate(
        page=page, per_page=per_page, error_out=False
    )
    
    orders = []
    for order in pagination.items:
        order_dict = order.to_dict()
        # Add user information
        user = User.query.get(order.user_id)
        if user:
            order_dict['user'] = {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name
            }
        orders.append(order_dict)
    
    return jsonify({
        'orders': orders,
        'total': pagination.total,
        'pages': pagination.pages,
        'current_page': page
    }), 200

@admin_orders_bp.route('/api/admin/orders/<int:order_id>', methods=['GET'])
@admin_required
def get_order_details(order_id):
    """Get detailed information about a specific order"""
    order = Order.query.get(order_id)
    if not order:
        return jsonify({'error': 'Order not found'}), 404
    
    order_dict = order.to_dict()
    
    # Add user information
    user = User.query.get(order.user_id)
    if user:
        order_dict['user'] = user.to_dict()
    
    return jsonify(order_dict), 200

@admin_orders_bp.route('/api/admin/orders/<int:order_id>/status', methods=['PATCH'])
@admin_required
def update_order_status(order_id):
    """Update order status"""
    order = Order.query.get(order_id)
    if not order:
        return jsonify({'error': 'Order not found'}), 404
    
    data = request.get_json()
    if 'status' not in data:
        return jsonify({'error': 'status is required'}), 400
    
    valid_statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
    if data['status'] not in valid_statuses:
        return jsonify({'error': f'Invalid status. Must be one of: {", ".join(valid_statuses)}'}), 400
    
    try:
        order.status = data['status']
        order.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'message': 'Order status updated successfully',
            'order': order.to_dict()
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@admin_orders_bp.route('/api/admin/orders/stats', methods=['GET'])
@admin_required
def get_order_stats():
    """Get order statistics"""
    # Total orders
    total_orders = Order.query.count()
    
    # Orders by status
    orders_by_status = db.session.query(
        Order.status, func.count(Order.id)
    ).group_by(Order.status).all()
    
    status_counts = {status: count for status, count in orders_by_status}
    
    # Recent orders (last 7 days)
    seven_days_ago = datetime.utcnow() - timedelta(days=7)
    recent_orders = Order.query.filter(Order.created_at >= seven_days_ago).count()
    
    # Total revenue
    total_revenue = db.session.query(func.sum(Order.total_amount)).scalar() or 0
    
    # Revenue last 30 days
    thirty_days_ago = datetime.utcnow() - timedelta(days=30)
    recent_revenue = db.session.query(func.sum(Order.total_amount)).filter(
        Order.created_at >= thirty_days_ago
    ).scalar() or 0
    
    return jsonify({
        'total_orders': total_orders,
        'orders_by_status': status_counts,
        'recent_orders_7_days': recent_orders,
        'total_revenue': float(total_revenue),
        'revenue_last_30_days': float(recent_revenue)
    }), 200
