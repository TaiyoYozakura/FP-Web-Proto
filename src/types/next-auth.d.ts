import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: string
      graduationYear?: string
      course?: string
      phone?: string
      currentCompany?: string
      currentPosition?: string
      location?: string
      bio?: string
      linkedinUrl?: string
      isVerified?: boolean
      profileComplete?: boolean
      lastLogin?: string
      preferences?: {
        notifications: boolean
        publicProfile: boolean
        jobAlerts: boolean
      }
    }
  }

  interface User {
    id: string
    email: string
    name: string
    role: string
    graduationYear?: string
    course?: string
    phone?: string
    currentCompany?: string
    currentPosition?: string
    location?: string
    bio?: string
    linkedinUrl?: string
    isVerified?: boolean
    profileComplete?: boolean
    lastLogin?: string
    preferences?: {
      notifications: boolean
      publicProfile: boolean
      jobAlerts: boolean
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: string
    graduationYear?: string
    course?: string
    phone?: string
    currentCompany?: string
    currentPosition?: string
    location?: string
    bio?: string
    linkedinUrl?: string
    isVerified?: boolean
    profileComplete?: boolean
    lastLogin?: string
    preferences?: {
      notifications: boolean
      publicProfile: boolean
      jobAlerts: boolean
    }
  }
}