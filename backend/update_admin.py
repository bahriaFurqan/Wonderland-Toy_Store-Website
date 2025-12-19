"""
Script to add is_admin column to existing users table
"""
from app import app, db
from models import User
from sqlalchemy import text

def add_admin_column():
    with app.app_context():
        try:
            # Add is_admin column to users table
            with db.engine.connect() as conn:
                conn.execute(text("ALTER TABLE users ADD is_admin BIT DEFAULT 0"))
                conn.commit()
            
            print("✅ is_admin column added successfully!")
            
            # Now create admin user
            admin = User.query.filter_by(username='admin').first()
            
            if not admin:
                admin = User(
                    username='admin',
                    email='admin@toystore.com',
                    first_name='Admin',
                    last_name='User',
                    is_admin=True
                )
                admin.set_password('admin123')
                
                db.session.add(admin)
                db.session.commit()
                
                print("✅ Admin user created successfully!")
                print("Username: admin")
                print("Password: admin123")
                print("⚠️  Please change the password after first login!")
            else:
                admin.is_admin = True
                db.session.commit()
                print("✅ Existing admin user updated with admin rights!")
                
        except Exception as e:
            if "already exists" in str(e) or "Duplicate column" in str(e):
                print("ℹ️  is_admin column already exists")
                # Try to create admin user anyway
                admin = User.query.filter_by(username='admin').first()
                if not admin:
                    admin = User(
                        username='admin',
                        email='admin@toystore.com',
                        first_name='Admin',
                        last_name='User',
                        is_admin=True
                    )
                    admin.set_password('admin123')
                    db.session.add(admin)
                    db.session.commit()
                    print("✅ Admin user created!")
                else:
                    admin.is_admin = True
                    db.session.commit()
                    print("✅ Admin user updated!")
            else:
                print(f"❌ Error: {e}")

if __name__ == '__main__':
    add_admin_column()
