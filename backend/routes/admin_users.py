from flask import Blueprint, request, jsonify
from middleware.admin_auth import admin_required
from models import User, Order, db
from sqlalchemy import func
from datetime import datetime, timedelta

admin_users_bp = Blueprint('admin_users', __name__)

@admin_users_bp.route('/api/admin/users', methods=['GET'])
@admin_required
def get_all_users():
    """Get all users with pagination and search"""
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 20, type=int)
    search = request.args.get('search', '')
    
    query = User.query
    
    if search:
        query = query.filter(
            (User.username.ilike(f'%{search}%')) |
            (User.email.ilike(f'%{search}%')) |
            (User.first_name.ilike(f'%{search}%')) |
            (User.last_name.ilike(f'%{search}%'))
        )
    
    pagination = query.order_by(User.created_at.desc()).paginate(
        page=page, per_page=per_page, error_out=False
    )
    
    users = []
    for user in pagination.items:
        user_dict = user.to_dict()
        # Add order count
        user_dict['order_count'] = Order.query.filter_by(user_id=user.id).count()
        users.append(user_dict)
    
    return jsonify({
        'users': users,
        'total': pagination.total,
        'pages': pagination.pages,
        'current_page': page
    }), 200

@admin_users_bp.route('/api/admin/users/<int:user_id>', methods=['GET'])
@admin_required
def get_user_details(user_id):
    """Get detailed information about a specific user"""
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    user_dict = user.to_dict()
    
    # Add order history
    orders = Order.query.filter_by(user_id=user_id).order_by(Order.created_at.desc()).all()
    user_dict['orders'] = [order.to_dict() for order in orders]
    user_dict['order_count'] = len(orders)
    
    # Calculate total spent
    total_spent = db.session.query(func.sum(Order.total_amount)).filter(
        Order.user_id == user_id
    ).scalar() or 0
    user_dict['total_spent'] = float(total_spent)
    
    return jsonify(user_dict), 200

@admin_users_bp.route('/api/admin/users/<int:user_id>', methods=['PATCH'])
@admin_required
def update_user(user_id):
    """Update user information (e.g., make admin, disable account)"""
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    data = request.get_json()
    
    try:
        if 'is_admin' in data:
            user.is_admin = data['is_admin']
        if 'first_name' in data:
            user.first_name = data['first_name']
        if 'last_name' in data:
            user.last_name = data['last_name']
        if 'phone' in data:
            user.phone = data['phone']
        if 'address' in data:
            user.address = data['address']
        
        db.session.commit()
        
        return jsonify({
            'message': 'User updated successfully',
            'user': user.to_dict()
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@admin_users_bp.route('/api/admin/users/stats', methods=['GET'])
@admin_required
def get_user_stats():
    """Get user statistics"""
    # Total users
    total_users = User.query.count()
    
    # New users (last 30 days)
    thirty_days_ago = datetime.utcnow() - timedelta(days=30)
    new_users = User.query.filter(User.created_at >= thirty_days_ago).count()
    
    # Admin users
    admin_users = User.query.filter_by(is_admin=True).count()
    
    # Users with orders
    users_with_orders = db.session.query(func.count(func.distinct(Order.user_id))).scalar() or 0
    
    return jsonify({
        'total_users': total_users,
        'new_users_30_days': new_users,
        'admin_users': admin_users,
        'users_with_orders': users_with_orders
    }), 200
