from flask import Blueprint, jsonify, request
from middleware.admin_auth import admin_required
from models import Product, Order, User, OrderItem, db
from sqlalchemy import func
from datetime import datetime, timedelta

admin_analytics_bp = Blueprint('admin_analytics', __name__)

@admin_analytics_bp.route('/api/admin/analytics/dashboard', methods=['GET'])
@admin_required
def get_dashboard_stats():
    """Get overview statistics for admin dashboard"""
    # Total products
    total_products = Product.query.count()
    
    # Total orders
    total_orders = Order.query.count()
    
    # Total users
    total_users = User.query.count()
    
    # Total revenue
    total_revenue = db.session.query(func.sum(Order.total_amount)).scalar() or 0
    
    # Low stock products (less than 10)
    low_stock_products = Product.query.filter(Product.stock_quantity < 10).all()
    
    # Recent orders (last 10)
    recent_orders = Order.query.order_by(Order.created_at.desc()).limit(10).all()
    recent_orders_data = []
    for order in recent_orders:
        order_dict = order.to_dict()
        user = User.query.get(order.user_id)
        if user:
            order_dict['user'] = {
                'username': user.username,
                'email': user.email
            }
        recent_orders_data.append(order_dict)
    
    # Top selling products
    top_products = db.session.query(
        Product.id,
        Product.name,
        Product.image_url,
        Product.price,
        func.sum(OrderItem.quantity).label('total_sold')
    ).join(OrderItem).group_by(Product.id).order_by(func.sum(OrderItem.quantity).desc()).limit(5).all()
    
    top_products_data = [
        {
            'id': p.id,
            'name': p.name,
            'image_url': p.image_url,
            'price': p.price,
            'total_sold': p.total_sold
        }
        for p in top_products
    ]
    
    return jsonify({
        'total_products': total_products,
        'total_orders': total_orders,
        'total_users': total_users,
        'total_revenue': float(total_revenue),
        'low_stock_products': [p.to_dict() for p in low_stock_products],
        'recent_orders': recent_orders_data,
        'top_products': top_products_data
    }), 200

@admin_analytics_bp.route('/api/admin/analytics/sales', methods=['GET'])
@admin_required
def get_sales_data():
    """Get sales data for charts (last 7 days, 30 days, or custom range)"""
    period = request.args.get('period', '7')  # days
    
    try:
        days = int(period)
    except:
        days = 7
    
    start_date = datetime.utcnow() - timedelta(days=days)
    
    # Sales by day
    sales_by_day = db.session.query(
        func.date(Order.created_at).label('date'),
        func.count(Order.id).label('order_count'),
        func.sum(Order.total_amount).label('revenue')
    ).filter(Order.created_at >= start_date).group_by(func.date(Order.created_at)).all()
    
    sales_data = [
        {
            'date': str(s.date),
            'order_count': s.order_count,
            'revenue': float(s.revenue or 0)
        }
        for s in sales_by_day
    ]
    
    return jsonify({
        'period_days': days,
        'sales_data': sales_data
    }), 200

@admin_analytics_bp.route('/api/admin/analytics/revenue', methods=['GET'])
@admin_required
def get_revenue_trends():
    """Get revenue trends and breakdown"""
    # Revenue by status
    revenue_by_status = db.session.query(
        Order.status,
        func.count(Order.id).label('count'),
        func.sum(Order.total_amount).label('revenue')
    ).group_by(Order.status).all()
    
    status_data = [
        {
            'status': r.status,
            'count': r.count,
            'revenue': float(r.revenue or 0)
        }
        for r in revenue_by_status
    ]
    
    # Monthly revenue (last 12 months)
    twelve_months_ago = datetime.utcnow() - timedelta(days=365)
    monthly_revenue = db.session.query(
        func.strftime('%Y-%m', Order.created_at).label('month'),
        func.sum(Order.total_amount).label('revenue')
    ).filter(Order.created_at >= twelve_months_ago).group_by(func.strftime('%Y-%m', Order.created_at)).all()
    
    monthly_data = [
        {
            'month': m.month,
            'revenue': float(m.revenue or 0)
        }
        for m in monthly_revenue
    ]
    
    return jsonify({
        'revenue_by_status': status_data,
        'monthly_revenue': monthly_data
    }), 200

@admin_analytics_bp.route('/api/admin/analytics/products', methods=['GET'])
@admin_required
def get_product_analytics():
    """Get product performance metrics"""
    # Products by category
    products_by_category = db.session.query(
        Product.category,
        func.count(Product.id).label('count')
    ).group_by(Product.category).all()
    
    category_data = [
        {
            'category': c.category or 'Uncategorized',
            'count': c.count
        }
        for c in products_by_category
    ]
    
    # Best selling products
    best_sellers = db.session.query(
        Product.id,
        Product.name,
        Product.category,
        Product.price,
        func.sum(OrderItem.quantity).label('total_sold'),
        func.sum(OrderItem.quantity * OrderItem.price).label('total_revenue')
    ).join(OrderItem).group_by(Product.id).order_by(func.sum(OrderItem.quantity).desc()).limit(10).all()
    
    best_sellers_data = [
        {
            'id': p.id,
            'name': p.name,
            'category': p.category,
            'price': p.price,
            'total_sold': p.total_sold,
            'total_revenue': float(p.total_revenue or 0)
        }
        for p in best_sellers
    ]
    
    return jsonify({
        'products_by_category': category_data,
        'best_sellers': best_sellers_data
    }), 200
