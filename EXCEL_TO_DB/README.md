# Excel to SQL Converter

Minimal Python script that converts Excel files to SQLite databases.

## Features
- Command line and interactive modes
- Drag & drop support (paste file path)
- SQLite database output
- Custom table names
- File validation

## Installation

```bash
pip install -r requirements.txt
```

## Usage

### Command Line Mode
```bash
# Basic conversion
python excel_to_db.py file.xlsx

# Custom table name
python excel_to_db.py file.xlsx my_table
```

### Interactive Mode
```bash
python excel_to_db.py
```
Then paste your Excel file path (supports drag & drop) and specify table name.

## Output
- Creates SQLite database with same name as Excel file
- Default table name: `excel_data`
- Replaces existing tables with same name