#!/usr/bin/env python3
import sys
import os

def main():
    if len(sys.argv) < 2:
        print("Usage: python excel_to_db_simple.py <excel_file> [table_name]")
        return
    
    excel_file = sys.argv[1]
    table_name = sys.argv[2] if len(sys.argv) > 2 else "excel_data"
    
    # Check if file exists
    if not os.path.exists(excel_file):
        print(f"✗ File not found: {excel_file}")
        return
    
    try:
        import pandas as pd
        import sqlite3
        
        # Read Excel file
        print(f"Reading Excel file: {excel_file}")
        df = pd.read_excel(excel_file)
        print(f"Found {len(df)} rows and {len(df.columns)} columns")
        print(f"Columns: {list(df.columns)}")
        
        # Create database
        db_path = f"{table_name}.db"
        conn = sqlite3.connect(db_path)
        df.to_sql(table_name, conn, if_exists='replace', index=False)
        conn.close()
        
        print(f"✓ Successfully converted to {db_path} (table: {table_name})")
        
    except ImportError as e:
        print(f"✗ Missing dependency: {e}")
        print("Please install: pip install pandas openpyxl")
    except Exception as e:
        print(f"✗ Error: {str(e)}")

if __name__ == "__main__":
    main()