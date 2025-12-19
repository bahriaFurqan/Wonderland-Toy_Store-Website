import pyodbc
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

DB_SERVER = os.getenv('DB_SERVER', 'localhost\\SQLEXPRESS')
DB_NAME = os.getenv('DB_NAME', 'ToyStoreDB')
DB_USER = os.getenv('DB_USER', '')
DB_PASSWORD = os.getenv('DB_PASSWORD', '')
DB_DRIVER = os.getenv('DB_DRIVER', 'ODBC Driver 17 for SQL Server')

def create_database():
    """Create the database if it doesn't exist"""
    try:
        # Connect to master database to create our database
        if DB_USER and DB_PASSWORD:
            conn_str = f'DRIVER={{{DB_DRIVER}}};SERVER={DB_SERVER};DATABASE=master;UID={DB_USER};PWD={DB_PASSWORD}'
        else:
            # Windows Authentication
            conn_str = f'DRIVER={{{DB_DRIVER}}};SERVER={DB_SERVER};DATABASE=master;Trusted_Connection=yes'
        
        print(f"Connecting to SQL Server: {DB_SERVER}")
        conn = pyodbc.connect(conn_str, autocommit=True)
        cursor = conn.cursor()
        
        # Check if database exists
        cursor.execute(f"SELECT database_id FROM sys.databases WHERE name = '{DB_NAME}'")
        exists = cursor.fetchone()
        
        if exists:
            print(f"✓ Database '{DB_NAME}' already exists")
        else:
            # Create database
            print(f"Creating database '{DB_NAME}'...")
            cursor.execute(f"CREATE DATABASE [{DB_NAME}]")
            print(f"✓ Database '{DB_NAME}' created successfully!")
        
        cursor.close()
        conn.close()
        return True
        
    except Exception as e:
        print(f"❌ Error creating database: {e}")
        print("\nTroubleshooting:")
        print("1. Make sure SQL Server is running")
        print("2. Check your DB_SERVER in .env file")
        print("3. Verify you have permission to create databases")
        return False

if __name__ == "__main__":
    print("=" * 60)
    print("ToyStore Database Creation Script")
    print("=" * 60)
    print(f"\nServer: {DB_SERVER}")
    print(f"Database: {DB_NAME}")
    print(f"Driver: {DB_DRIVER}")
    print(f"Authentication: {'SQL Server' if DB_USER else 'Windows'}")
    print()
    
    if create_database():
        print("\n✅ Database setup complete!")
        print("\nNext step: Run 'python seed_data.py' to create tables and add sample data")
    else:
        print("\n❌ Database setup failed. Please check the error messages above.")
