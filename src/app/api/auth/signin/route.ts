import { NextRequest, NextResponse } from 'next/server'
import { handleApiError, ApiError } from '@/lib/api-utils'
import { signinSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate with Zod
    const validatedData = signinSchema.parse(body)
    const { email, password } = validatedData

    // Check database configuration
    const dbUri = process.env.DATABASE_URI
    if (!dbUri) {
      console.warn('DATABASE_URI not configured, using demo mode')
    }

    // Demo user with full profile data
    const demoUser = {
      id: '1',
      name: 'Demo Alumni',
      email: 'alumni@dnyanasadhana.edu.in',
      password: Buffer.from('password123').toString('base64'),
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
      preferences: {
        notifications: true,
        publicProfile: true,
        jobAlerts: true
      },
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // Check credentials
    const hashedInputPassword = Buffer.from(password).toString('base64')
    
    if (email === demoUser.email && hashedInputPassword === demoUser.password) {
      // Update last login
      demoUser.lastLogin = new Date().toISOString()
      
      // Return success (without password)
      const { password: _, ...userWithoutPassword } = demoUser
      
      return NextResponse.json({
        success: true,
        message: 'Login successful',
        user: userWithoutPassword
      }, { status: 200 })
    }

    // Invalid credentials
    throw new ApiError(401, 'Invalid email or password', 'INVALID_CREDENTIALS')

  } catch (error) {
    return handleApiError(error)
  }
}