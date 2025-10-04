import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const dbUri = process.env.DATABASE_URI
        if (!dbUri) {
          console.warn('DATABASE_URI not configured, using demo credentials')
        }

        // Demo user
        if (credentials.email === 'alumni@dnyanasadhana.edu.in' && credentials.password === 'password123') {
          return {
            id: '1',
            email: 'alumni@dnyanasadhana.edu.in',
            name: 'Demo Alumni',
            role: 'alumni'
          }
        }

        return null
      }
    })
  ],
  pages: {
    signIn: '/login',
    signUp: '/register'
  },
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub
        session.user.role = token.role
      }
      return session
    }
  }
}