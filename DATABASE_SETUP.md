# Database Setup Guide for Dnyanasadhana College Alumni Portal

## Quick Setup

1. **Copy Environment File**
   ```bash
   cp .env.example .env.local
   ```

2. **Set Your Database URI**
   Edit `.env.local` and replace `DATABASE_URI` with your actual database connection string.

## Supported Databases

### MongoDB
```bash
DATABASE_URI=mongodb://localhost:27017/dnyanasadhana_alumni
# Or MongoDB Atlas
DATABASE_URI=mongodb+srv://username:password@cluster.mongodb.net/dnyanasadhana_alumni
```

### PostgreSQL
```bash
DATABASE_URI=postgresql://username:password@localhost:5432/dnyanasadhana_alumni
# Or cloud PostgreSQL
DATABASE_URI=postgresql://username:password@your-host:5432/dnyanasadhana_alumni
```

### MySQL
```bash
DATABASE_URI=mysql://username:password@localhost:3306/dnyanasadhana_alumni
# Or cloud MySQL
DATABASE_URI=mysql://username:password@your-host:3306/dnyanasadhana_alumni
```

## Database Schema

The system expects the following collections/tables:

### Users Table
```sql
CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  graduation_year VARCHAR(4),
  course VARCHAR(255),
  phone VARCHAR(20),
  is_verified BOOLEAN DEFAULT FALSE,
  role VARCHAR(50) DEFAULT 'alumni',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Alumni Profiles Table
```sql
CREATE TABLE alumni_profiles (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) REFERENCES users(id),
  current_company VARCHAR(255),
  current_position VARCHAR(255),
  location VARCHAR(255),
  bio TEXT,
  linkedin_url VARCHAR(255),
  website_url VARCHAR(255),
  achievements TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Demo Credentials

For testing purposes, the system includes demo credentials:
- **Email**: alumni@dnyanasadhana.edu.in
- **Password**: password123

## Production Setup

1. **Install Dependencies**
   ```bash
   npm install bcryptjs jsonwebtoken
   ```

2. **Set Strong JWT Secret**
   ```bash
   JWT_SECRET=your-super-secure-random-string-here
   ```

3. **Configure Database Connection**
   - Ensure your database server is running
   - Create the database if it doesn't exist
   - Update the DATABASE_URI in your .env.local file

4. **Test Connection**
   ```bash
   npm run dev
   ```
   Visit http://localhost:3000 and try logging in with demo credentials.

## Cloud Database Options

### MongoDB Atlas (Recommended)
1. Create account at https://cloud.mongodb.com
2. Create a new cluster
3. Get connection string and add to DATABASE_URI

### Supabase (PostgreSQL)
1. Create account at https://supabase.com
2. Create new project
3. Get connection string from Settings > Database

### PlanetScale (MySQL)
1. Create account at https://planetscale.com
2. Create new database
3. Get connection string from Connect tab

## Troubleshooting

### Connection Issues
- Verify DATABASE_URI format
- Check firewall settings
- Ensure database server is running
- Verify credentials

### Authentication Issues
- Check JWT_SECRET is set
- Verify password hashing
- Check user exists in database

### Need Help?
Contact the development team or check the logs for detailed error messages.