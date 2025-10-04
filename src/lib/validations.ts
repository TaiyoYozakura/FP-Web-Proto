import { z } from 'zod'

// Auth Schemas
export const signupSchema = z.object({
  firstName: z.string().min(2, 'First name required').max(50),
  lastName: z.string().min(2, 'Last name required').max(50),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be 6+ characters').max(100),
  role: z.enum(['alumni', 'faculty', 'student']),
  graduationYear: z.string().optional(),
  course: z.string().optional(),
  department: z.string().optional(),
  phone: z.string().regex(/^\+?[\d\s-()]+$/, 'Invalid phone').optional()
})

export const signinSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password required')
})

// Contact Schema
export const contactSchema = z.object({
  phone: z.string().optional(),
  alternatePhone: z.string().optional(),
  email: z.string().email(),
  alternateEmail: z.string().email().optional()
})

// Address Schema
export const addressSchema = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  pincode: z.string().optional()
})

// Alumni Schema
export const alumniUpdateSchema = z.object({
  firstName: z.string().min(2).max(50).optional(),
  lastName: z.string().min(2).max(50).optional(),
  currentCompany: z.string().max(100).optional(),
  currentPosition: z.string().max(100).optional(),
  bio: z.string().max(500).optional(),
  skills: z.array(z.string()).optional(),
  contact: contactSchema.optional(),
  address: addressSchema.optional(),
  socialMedia: z.object({
    linkedin: z.string().url().optional(),
    twitter: z.string().url().optional(),
    website: z.string().url().optional()
  }).optional()
})

// Event Schema
export const eventSchema = z.object({
  title: z.string().min(5, 'Title too short').max(200),
  description: z.string().min(10, 'Description too short'),
  type: z.enum(['reunion', 'workshop', 'seminar', 'networking', 'cultural']),
  date: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  venue: z.string().min(5, 'Venue required'),
  isOnline: z.boolean(),
  meetingLink: z.string().url().optional(),
  maxAttendees: z.number().positive().optional(),
  fee: z.number().min(0).optional()
})

// Job Schema
export const jobSchema = z.object({
  title: z.string().min(5, 'Title too short').max(200),
  company: z.string().min(2, 'Company name required').max(100),
  description: z.string().min(50, 'Description too short'),
  requirements: z.array(z.string()),
  location: z.string().min(2, 'Location required'),
  type: z.enum(['full-time', 'part-time', 'contract', 'internship']),
  experience: z.string(),
  salary: z.string().optional(),
  expiryDate: z.string().datetime()
})

// News Schema
export const newsSchema = z.object({
  title: z.string().min(10, 'Title too short').max(200),
  content: z.string().min(50, 'Content too short'),
  summary: z.string().min(20, 'Summary too short').max(300),
  category: z.enum(['achievement', 'announcement', 'event', 'academic', 'general']),
  tags: z.array(z.string()),
  images: z.array(z.string().url()).optional()
})

// Message Schema
export const messageSchema = z.object({
  receiverId: z.string().min(1, 'Receiver required'),
  subject: z.string().min(5, 'Subject too short').max(200),
  content: z.string().min(10, 'Message too short'),
  attachments: z.array(z.string().url()).optional()
})

// Donation Schema
export const donationSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  currency: z.string().length(3, 'Invalid currency'),
  purpose: z.enum(['scholarship', 'infrastructure', 'research', 'general']),
  isAnonymous: z.boolean(),
  message: z.string().max(500).optional()
})

// Export types
export type SignupInput = z.infer<typeof signupSchema>
export type SigninInput = z.infer<typeof signinSchema>
export type AlumniUpdateInput = z.infer<typeof alumniUpdateSchema>
export type EventInput = z.infer<typeof eventSchema>
export type JobInput = z.infer<typeof jobSchema>
export type NewsInput = z.infer<typeof newsSchema>
export type MessageInput = z.infer<typeof messageSchema>
export type DonationInput = z.infer<typeof donationSchema>