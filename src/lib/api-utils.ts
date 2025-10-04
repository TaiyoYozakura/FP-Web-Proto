import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export function handleApiError(error: unknown) {
  console.error('API Error:', error)
  
  if (error instanceof ZodError) {
    return NextResponse.json(
      { 
        error: 'Validation failed',
        details: error.errors.map(e => ({ field: e.path.join('.'), message: e.message })),
        code: 'VALIDATION_ERROR',
        timestamp: new Date().toISOString()
      },
      { status: 400 }
    )
  }
  
  if (error instanceof ApiError) {
    return NextResponse.json(
      { 
        error: error.message, 
        code: error.code,
        timestamp: new Date().toISOString()
      },
      { status: error.statusCode }
    )
  }
  
  if (error instanceof Error) {
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
  
  return NextResponse.json(
    { 
      error: 'Unknown error occurred',
      timestamp: new Date().toISOString()
    },
    { status: 500 }
  )
}

export function validateRequired(data: Record<string, any>, fields: string[]) {
  const missing = fields.filter(field => !data[field])
  if (missing.length > 0) {
    throw new ApiError(400, `Missing required fields: ${missing.join(', ')}`, 'MISSING_FIELDS')
  }
}

export function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw new ApiError(400, 'Invalid email format', 'INVALID_EMAIL')
  }
}