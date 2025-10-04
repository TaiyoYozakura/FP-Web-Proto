# 🎓 Dnyanasadhana College Alumni Portal

A comprehensive alumni management system built with modern web technologies, featuring networking, donations, events, and administrative capabilities.

## 🚀 Tech Stack

### **Frontend**
- **Framework**: Next.js 15.5.3 with App Router
- **UI Library**: React 19.1.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Components**: HeroUI (NextUI)
- **Icons**: Lucide React
- **Animations**: CSS transitions and transforms

### **Backend & Database**
- **Database**: Flexible URI-based connection (PostgreSQL/MySQL/SQLite)
- **ORM**: Custom database utilities
- **Authentication**: NextAuth.js
- **File Upload**: Built-in image handling
- **API Routes**: Next.js API routes

### **Payment Integration**
- **Gateway**: Razorpay
- **Security**: SSL encryption
- **Methods**: Cards, UPI, Net Banking, Wallets
- **Features**: Order creation, payment verification, webhooks

## 🎯 Key Features

### **1. Alumni Directory & Networking** 👥
- AI-powered search with advanced filters
- Real-time alumni discovery
- Connection suggestions
- Privacy-controlled contact sharing
- Batch/location/company filtering
- Interactive world map visualization

### **2. Smart Donation System** 💰
- Razorpay payment gateway integration
- Real-time goal tracking
- Impact visualization charts
- Tax certificate generation
- Multiple payment methods
- SSL security indicators
- Donation history tracking

### **3. Profile Management** ⚙️
- 4-tab organization (Basic, Professional, Privacy, Security)
- Photo upload with preview
- Skills and experience management
- Granular privacy controls
- Password change functionality
- Account deletion option

### **4. Admin Control Panel** 🔧
- User management system
- Content management
- Analytics dashboard
- Financial tracking
- Communication tools
- System administration

### **5. Events & Communication** 📅
- Event creation and management
- RSVP system
- Messaging platform
- News and announcements
- Job board integration

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin control panel
│   ├── directory/         # Alumni directory & map
│   ├── donation/          # Donation system
│   ├── events/            # Events management
│   ├── jobs/              # Job board
│   ├── login/             # Authentication
│   ├── profile/           # User profile management
│   ├── register/          # User registration
│   └── api/               # API routes
│       ├── auth/          # Authentication endpoints
│       ├── alumni/        # Alumni data endpoints
│       └── database/      # Database operations
├── components/            # React components
│   ├── AlumniSuccessMap.tsx
│   ├── DynamicAlumniDirectory.tsx
│   ├── SmartDonationTracker.tsx
│   ├── ProfileManager.tsx
│   └── Navbar.tsx
├── contexts/              # React contexts
│   └── AppContext.tsx     # Global state management
├── lib/                   # Utilities
│   ├── database.ts        # Database connection
│   └── razorpay.ts        # Payment integration
└── styles/                # Global styles
    └── globals.css
```

## 🔧 Installation & Setup

### **Prerequisites**
- Node.js 18+ 
- npm/yarn/pnpm
- Database (PostgreSQL/MySQL/SQLite)
- Razorpay account (for payments)

### **1. Clone Repository**
```bash
git clone <repository-url>
cd FP-Web-Proto
```

### **2. Install Dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

### **3. Environment Setup**
Create `.env.local` file:
```env
# Database Configuration
DATABASE_URL="postgresql://user:password@localhost:5432/alumni_db"
# or
DATABASE_URL="mysql://user:password@localhost:3306/alumni_db"
# or
DATABASE_URL="sqlite:./alumni.db"

# Razorpay Configuration
RAZORPAY_KEY_ID="your_razorpay_key_id"
RAZORPAY_KEY_SECRET="your_razorpay_key_secret"
NEXT_PUBLIC_RAZORPAY_KEY_ID="your_razorpay_key_id"

# NextAuth Configuration
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"
```

### **4. Database Setup**
The application supports multiple databases:
- **PostgreSQL**: Production recommended
- **MySQL**: Alternative production option
- **SQLite**: Development/testing

### **5. Run Development Server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🚀 Deployment

### **Vercel (Recommended)**
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### **Other Platforms**
- **Netlify**: Full-stack deployment
- **Railway**: Database + hosting
- **AWS**: EC2 + RDS
- **DigitalOcean**: Droplets + managed databases

## 🔐 Security Features

- **Authentication**: Secure login/registration
- **Privacy Controls**: Granular data sharing settings
- **Payment Security**: Razorpay SSL encryption
- **Data Protection**: Input validation and sanitization
- **Session Management**: Secure token handling
- **CORS Protection**: API endpoint security

## 📊 Database Schema

### **Alumni Table**
```sql
CREATE TABLE alumni (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  batch INTEGER,
  degree VARCHAR(100),
  location VARCHAR(255),
  company VARCHAR(255),
  position VARCHAR(255),
  skills TEXT[],
  privacy_settings JSONB,
  profile_photo TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### **Donations Table**
```sql
CREATE TABLE donations (
  id SERIAL PRIMARY KEY,
  donor_id INTEGER REFERENCES alumni(id),
  amount DECIMAL(10,2) NOT NULL,
  category VARCHAR(100),
  payment_id VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending',
  tax_certificate TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach
- **Dark/Light Mode**: Theme switching
- **Animations**: Smooth micro-interactions
- **Accessibility**: WCAG 2.1 compliant
- **Performance**: Optimized loading
- **PWA Ready**: Service worker support

## 📱 Pages Overview

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with college branding |
| Login | `/login` | User authentication |
| Register | `/register` | New user registration |
| Dashboard | `/dashboard` | User dashboard with overview |
| Directory | `/directory` | Alumni search and networking |
| Profile | `/profile` | User profile management |
| Donation | `/donation` | Donation system with payments |
| Events | `/events` | Event management |
| Jobs | `/jobs` | Job board |
| Admin | `/admin` | Administrative control panel |

## 🔧 Admin Features

- **User Management**: Add, edit, suspend users
- **Content Management**: Events, news, announcements
- **Analytics**: User engagement, donation tracking
- **Communication**: Bulk messaging, notifications
- **Financial**: Donation reports, tax certificates
- **System**: Backups, maintenance, logs

## 🎯 Demo Credentials

### **Admin Access**
- Password: `admin123` or `dnyanasadhana2024`

### **Test Payment**
- Use Razorpay test mode credentials
- Test cards available in Razorpay documentation

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and queries:
- Create an issue on GitHub
- Contact: admin@dnyanasadhanacollege.org
- Documentation: Check project wiki

## 🎉 Acknowledgments

- Dnyanasadhana College for project requirements
- Next.js team for the amazing framework
- Razorpay for payment integration
- Open source community for various packages

---

**Built with ❤️ for Dnyanasadhana College Alumni Community**
