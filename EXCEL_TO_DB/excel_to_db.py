#!/usr/bin/env python3
import pandas as pd
import sqlite3
import sys
import os
from pathlib import Path

class ExcelToSQL:
    def __init__(self):
        self.supported_formats = ['.xlsx', '.xls']
        
    def convert_file(self, excel_path, db_path=None, table_name="excel_data"):
        """Convert Excel file to SQLite database"""
        if not self.validate_file(excel_path):
            return False
            
        try:
            # Read Excel file
            print(f"Reading Excel file: {excel_path}")
            df = pd.read_excel(excel_path)
            print(f"Found {len(df)} rows and {len(df.columns)} columns")
            print(f"Columns: {list(df.columns)}")
            
            # Set default database path
            if not db_path:
                db_path = f"{Path(excel_path).stem}.db"
                
            # Save to SQLite
            print(f"Saving to database: {db_path}")
            conn = sqlite3.connect(db_path)
            df.to_sql(table_name, conn, if_exists='replace', index=False)
            conn.close()
            
            print(f"✓ Successfully converted to {db_path} (table: {table_name})")
            return True
            
        except Exception as e:
            print(f"✗ Error: {str(e)}")
            return False
            
    def validate_file(self, file_path):
        """Validate Excel file"""
        if not os.path.exists(file_path):
            print(f"✗ File not found: {file_path}")
            return False
            
        if not any(file_path.lower().endswith(fmt) for fmt in self.supported_formats):
            print(f"✗ Unsupported format. Use: {', '.join(self.supported_formats)}")
            return False
            
        return True
        
    def interactive_mode(self):
        """Interactive file selection"""
        print("Excel to SQL Converter")
        print("=" * 30)
        
        while True:
            file_path = input("\nEnter Excel file path (or 'quit'): ").strip()
            
            if file_path.lower() == 'quit':
                break
                
            # Handle drag & drop (remove quotes)
            file_path = file_path.strip('"\'')
            
            if self.validate_file(file_path):
                table_name = input(f"Table name (default: excel_data): ").strip() or "excel_data"
                self.convert_file(file_path, table_name=table_name)
            else:
                print("Please try again with a valid Excel file.")

def main():
    converter = ExcelToSQL()
    
    if len(sys.argv) > 1:
        # Command line mode
        excel_file = sys.argv[1]
        table_name = sys.argv[2] if len(sys.argv) > 2 else "excel_data"
        converter.convert_file(excel_file, table_name=table_name)
    else:
        # Interactive mode
        converter.interactive_mode()

if __name__ == "__main__":
    main()