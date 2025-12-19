from app import app
from database import db
from models import User, Product
from werkzeug.security import generate_password_hash

def seed_database():
    with app.app_context():
        # Create tables
        db.create_all()
        print("✓ Database tables created")

        # Check if data already exists
        if Product.query.first():
            print("⚠ Database already contains data. Skipping seed.")
            return

        # Create sample products
        products = [
            # Action Figures
            Product(
                name="Super Hero Action Figure",
                description="Poseable action figure with authentic details and accessories. Perfect for imaginative play!",
                price=24.99,
                category="Action Figures",
                age_range="6-8 years",
                stock_quantity=50,
                brand="HeroToys",
                rating=4.8,
                is_featured=True,
                image_url="https://via.placeholder.com/300/ff6b6b/ffffff?text=Action+Figure"
            ),
            Product(
                name="Space Warrior Figure Set",
                description="Complete set of 5 space warrior figures with weapons and accessories.",
                price=39.99,
                category="Action Figures",
                age_range="6-8 years",
                stock_quantity=30,
                brand="HeroToys",
                rating=4.6,
                is_featured=False,
                image_url="https://via.placeholder.com/300/ff6b6b/ffffff?text=Space+Warriors"
            ),

            # Dolls
            Product(
                name="Fashion Doll with Accessories",
                description="Beautiful fashion doll with multiple outfits and accessories for endless styling fun.",
                price=29.99,
                category="Dolls",
                age_range="3-5 years",
                stock_quantity=45,
                brand="DreamDolls",
                rating=4.9,
                is_featured=True,
                image_url="https://via.placeholder.com/300/ff69b4/ffffff?text=Fashion+Doll"
            ),
            Product(
                name="Baby Care Doll Set",
                description="Interactive baby doll with feeding bottle, pacifier, and care accessories.",
                price=34.99,
                category="Dolls",
                age_range="3-5 years",
                stock_quantity=25,
                brand="DreamDolls",
                rating=4.7,
                is_featured=False,
                image_url="https://via.placeholder.com/300/ff69b4/ffffff?text=Baby+Doll"
            ),

            # Building Blocks
            Product(
                name="Creative Building Blocks Set",
                description="500-piece building blocks set for creative construction and learning.",
                price=44.99,
                category="Building Blocks",
                age_range="6-8 years",
                stock_quantity=60,
                brand="BuildMaster",
                rating=5.0,
                is_featured=True,
                image_url="https://via.placeholder.com/300/4ecdc4/ffffff?text=Building+Blocks"
            ),
            Product(
                name="Mega Construction Set",
                description="1000-piece mega construction set with wheels, windows, and special pieces.",
                price=79.99,
                category="Building Blocks",
                age_range="9-12 years",
                stock_quantity=20,
                brand="BuildMaster",
                rating=4.9,
                is_featured=True,
                image_url="https://via.placeholder.com/300/4ecdc4/ffffff?text=Mega+Set"
            ),

            # Educational Toys
            Product(
                name="STEM Learning Kit",
                description="Complete STEM kit with science experiments, building projects, and learning activities.",
                price=54.99,
                category="Educational",
                age_range="9-12 years",
                stock_quantity=35,
                brand="SmartKids",
                rating=4.8,
                is_featured=True,
                image_url="https://via.placeholder.com/300/6bcf7f/ffffff?text=STEM+Kit"
            ),
            Product(
                name="Alphabet Learning Board",
                description="Interactive alphabet board with sounds, lights, and learning games.",
                price=32.99,
                category="Educational",
                age_range="3-5 years",
                stock_quantity=40,
                brand="SmartKids",
                rating=4.7,
                is_featured=False,
                image_url="https://via.placeholder.com/300/6bcf7f/ffffff?text=Alphabet+Board"
            ),

            # Vehicles
            Product(
                name="Remote Control Race Car",
                description="High-speed RC car with rechargeable battery and remote control.",
                price=49.99,
                category="Vehicles",
                age_range="9-12 years",
                stock_quantity=28,
                brand="SpeedRacers",
                rating=4.6,
                is_featured=True,
                image_url="https://via.placeholder.com/300/ffd93d/ffffff?text=RC+Car"
            ),
            Product(
                name="Die-Cast Car Collection",
                description="Set of 10 detailed die-cast cars with realistic features.",
                price=27.99,
                category="Vehicles",
                age_range="6-8 years",
                stock_quantity=55,
                brand="SpeedRacers",
                rating=4.5,
                is_featured=False,
                image_url="https://via.placeholder.com/300/ffd93d/ffffff?text=Car+Collection"
            ),

            # Puzzles
            Product(
                name="3D Puzzle Castle",
                description="Challenging 3D puzzle with 500 pieces. Build your own castle!",
                price=36.99,
                category="Puzzles",
                age_range="9-12 years",
                stock_quantity=22,
                brand="PuzzlePro",
                rating=4.8,
                is_featured=False,
                image_url="https://via.placeholder.com/300/9b59b6/ffffff?text=3D+Puzzle"
            ),
            Product(
                name="Animal World Jigsaw Puzzle",
                description="Beautiful 1000-piece jigsaw puzzle featuring animals from around the world.",
                price=24.99,
                category="Puzzles",
                age_range="9-12 years",
                stock_quantity=38,
                brand="PuzzlePro",
                rating=4.7,
                is_featured=False,
                image_url="https://via.placeholder.com/300/9b59b6/ffffff?text=Jigsaw+Puzzle"
            ),
        ]

        # Add products to database
        for product in products:
            db.session.add(product)
        
        db.session.commit()
        print(f"✓ Added {len(products)} products to database")

        # Create a test user
        test_user = User(
            username="testuser",
            email="test@toystore.com",
            first_name="Test",
            last_name="User",
            phone="+1 (555) 123-4567",
            address="123 Test Street, Test City, TC 12345"
        )
        test_user.set_password("password123")
        db.session.add(test_user)
        db.session.commit()
        print("✓ Created test user (username: testuser, password: password123)")

        print("\n✅ Database seeded successfully!")
        print("\nYou can now:")
        print("1. Start the backend: python app.py")
        print("2. Start the frontend: npm run dev")
        print("3. Login with: testuser / password123")

if __name__ == "__main__":
    seed_database()
