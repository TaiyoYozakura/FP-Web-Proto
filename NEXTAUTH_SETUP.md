# NextAuth Setup Guide

## Quick Setup

1. **Install Dependencies** (Already done)
   ```bash
   npm install next-auth lucide-react
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env.local
   ```
   
   Add to `.env.local`:
   ```bash
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-super-secret-nextauth-key-here
   DATABASE_URI=your-database-connection-string
   ```

3. **Demo Credentials**
   - Email: `alumni@dnyanasadhana.edu.in`
   - Password: `password123`

## Features Implemented

### ✅ NextAuth Integration
- **Route Handler**: `/api/auth/[...nextauth]/route.ts`
- **Session Provider**: Wraps entire app
- **Credentials Provider**: Email/password authentication
- **JWT Strategy**: Stateless authentication

### ✅ Lucide React Icons
- **Bell Icon**: Replaced notification bell SVG
- **Menu Icons**: Hamburger and close icons
- **User Icons**: Profile, messages, heart, logout icons
- **Search Icon**: Clean search icon

### ✅ Updated Components
- **Login Page**: Uses `signIn()` from NextAuth
- **Navbar**: Uses `useSession()` and `signOut()`
- **NotificationBell**: Uses Lucide Bell icon
- **Layout**: Wrapped with SessionProvider

## Usage

### Authentication
```tsx
import { useSession, signIn, signOut } from 'next-auth/react'

function Component() {
  const { data: session, status } = useSession()
  
  if (status === 'loading') return <p>Loading...</p>
  
  if (session) {
    return (
      <>
        <p>Signed in as {session.user.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  
  return (
    <>
      <p>Not signed in</p>
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}
```

### Icons
```tsx
import { Bell, User, Search, Menu, X } from 'lucide-react'

function Component() {
  return (
    <div>
      <Bell className="w-6 h-6" />
      <User className="w-4 h-4" />
      <Search className="w-5 h-5" />
    </div>
  )
}
```

## Database Integration

The system is ready for database integration. Update the `authorize` function in `/src/app/api/auth/[...nextauth]/route.ts`:

```typescript
async authorize(credentials) {
  if (!credentials?.email || !credentials?.password) return null

  // Add your database query here
  const user = await db.user.findUnique({
    where: { email: credentials.email }
  })

  if (user && await bcrypt.compare(credentials.password, user.password)) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    }
  }

  return null
}
```

## Security Features

- **JWT Tokens**: Secure session management
- **CSRF Protection**: Built-in CSRF protection
- **Secure Cookies**: HTTPOnly and Secure flags
- **Session Strategy**: JWT for stateless authentication

## Testing

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Visit http://localhost:3000

3. Click "Alumni Login"

4. Use demo credentials:
   - Email: `alumni@dnyanasadhana.edu.in`
   - Password: `password123`

5. Verify session persistence and logout functionality

## Production Deployment

1. Set strong `NEXTAUTH_SECRET`:
   ```bash
   NEXTAUTH_SECRET=$(openssl rand -base64 32)
   ```

2. Update `NEXTAUTH_URL` to your domain:
   ```bash
   NEXTAUTH_URL=https://yourdomain.com
   ```

3. Configure your database connection string

The portal now uses NextAuth for authentication and Lucide React for clean, consistent icons!