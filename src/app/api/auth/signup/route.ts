import { NextRequest, NextResponse } from 'next/server'
import { handleApiError, ApiError } from '@/lib/api-utils'
import { signupSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate with Zod
    const validatedData = signupSchema.parse(body)
    const { name, email, password, graduationYear, course, phone } = validatedData

    // Check database configuration
    const dbUri = process.env.DATABASE_URI
    if (!dbUri) {
      throw new ApiError(500, 'Database not configured', 'DB_NOT_CONFIGURED')
    }

    // Check if user exists (demo)
    if (email === 'alumni@dnyanasadhana.edu.in') {
      throw new ApiError(409, 'User already exists', 'USER_EXISTS')
    }

    // Hash password (use bcrypt in production)
    const hashedPassword = Buffer.from(password).toString('base64')

    // Create user object with full profile data
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      graduationYear: graduationYear || null,
      course: course || null,
      phone: phone || null,
      role: 'alumni',
      isVerified: false,
      profileComplete: false,
      currentCompany: null,
      currentPosition: null,
      location: null,
      bio: null,
      linkedinUrl: null,
      preferences: {
        notifications: true,
        publicProfile: true,
        jobAlerts: true
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // In production: await db.user.create({ data: newUser })
    
    // Return success (without password)
    const { password: _, ...userWithoutPassword } = newUser
    
    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      user: userWithoutPassword
    }, { status: 201 })

  } catch (error) {
    return handleApiError(error)
  }
}