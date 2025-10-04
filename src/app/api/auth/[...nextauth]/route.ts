import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        try {
          // Demo user with full profile data
          if (credentials.email === 'alumni@dnyanasadhana.edu.in' && credentials.password === 'password123') {
            return {
              id: '1',
              email: 'alumni@dnyanasadhana.edu.in',
              name: 'Demo Alumni',
              role: 'alumni',
              graduationYear: '2020',
              course: 'Computer Science',
              phone: '+91-9876543210',
              currentCompany: 'Tech Corp',
              currentPosition: 'Senior Developer',
              location: 'Mumbai, India',
              bio: 'Passionate software developer with 4+ years experience',
              linkedinUrl: 'https://linkedin.com/in/demo-alumni',
              isVerified: true,
              profileComplete: true,
              lastLogin: new Date().toISOString(),
              preferences: {
                notifications: true,
                publicProfile: true,
                jobAlerts: true
              }
            }
          }

          // In production, query database here
          // const user = await db.user.findUnique({ where: { email: credentials.email }, include: { profile: true } })
          
          return null
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
    signUp: '/register'
  },
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Store all user data in token on sign in
      if (user) {
        token.id = user.id
        token.role = user.role
        token.graduationYear = user.graduationYear
        token.course = user.course
        token.phone = user.phone
        token.currentCompany = user.currentCompany
        token.currentPosition = user.currentPosition
        token.location = user.location
        token.bio = user.bio
        token.linkedinUrl = user.linkedinUrl
        token.isVerified = user.isVerified
        token.profileComplete = user.profileComplete
        token.lastLogin = user.lastLogin
        token.preferences = user.preferences
      }
      
      // Handle session updates
      if (trigger === 'update' && session) {
        token = { ...token, ...session }
      }
      
      return token
    },
    async session({ session, token }) {
      // Pass all token data to session
      if (token) {
        session.user.id = token.id
        session.user.role = token.role
        session.user.graduationYear = token.graduationYear
        session.user.course = token.course
        session.user.phone = token.phone
        session.user.currentCompany = token.currentCompany
        session.user.currentPosition = token.currentPosition
        session.user.location = token.location
        session.user.bio = token.bio
        session.user.linkedinUrl = token.linkedinUrl
        session.user.isVerified = token.isVerified
        session.user.profileComplete = token.profileComplete
        session.user.lastLogin = token.lastLogin
        session.user.preferences = token.preferences
      }
      return session
    }
  }
})

export { handler as GET, handler as POST }