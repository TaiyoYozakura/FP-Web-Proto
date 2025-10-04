// Core User Types
export interface BaseUser {
  id: string
  email: string
  password: string
  role: 'alumni' | 'faculty' | 'student' | 'admin'
  isVerified: boolean
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Alumni extends BaseUser {
  role: 'alumni'
  firstName: string
  lastName: string
  graduationYear: string
  course: string
  department: string
  rollNumber?: string
  currentCompany?: string
  currentPosition?: string
  workExperience: WorkExperience[]
  achievements: Achievement[]
  skills: string[]
  bio?: string
  profilePicture?: string
  contact: Contact
  address: Address
  socialMedia: SocialMedia
  preferences: UserPreferences
  connections: string[]
  lastLogin?: string
}

export interface Faculty extends BaseUser {
  role: 'faculty'
  firstName: string
  lastName: string
  employeeId: string
  department: string
  designation: string
  subjects: string[]
  qualifications: string[]
  experience: number
  researchAreas: string[]
  publications: Publication[]
  contact: Contact
  profilePicture?: string
  joiningDate: string
}

export interface Student extends BaseUser {
  role: 'student'
  firstName: string
  lastName: string
  rollNumber: string
  course: string
  department: string
  year: number
  semester: number
  academicRecord: AcademicRecord
  contact: Contact
  address: Address
  guardianContact: Contact
  enrollmentDate: string
}

export interface Admin extends BaseUser {
  role: 'admin'
  firstName: string
  lastName: string
  permissions: AdminPermission[]
  department?: string
}

// Supporting Models
export interface Event {
  id: string
  title: string
  description: string
  type: 'reunion' | 'workshop' | 'seminar' | 'networking' | 'cultural'
  date: string
  endDate?: string
  venue: string
  isOnline: boolean
  meetingLink?: string
  organizer: string
  maxAttendees?: number
  registeredAttendees: string[]
  fee?: number
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
  images: string[]
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface Job {
  id: string
  title: string
  company: string
  description: string
  requirements: string[]
  location: string
  type: 'full-time' | 'part-time' | 'contract' | 'internship'
  experience: string
  salary?: string
  postedBy: string
  applicants: string[]
  status: 'active' | 'closed' | 'filled'
  expiryDate: string
  createdAt: string
  updatedAt: string
}

export interface News {
  id: string
  title: string
  content: string
  summary: string
  category: 'achievement' | 'announcement' | 'event' | 'academic' | 'general'
  author: string
  images: string[]
  tags: string[]
  isPublished: boolean
  publishedAt?: string
  createdAt: string
  updatedAt: string
}

export interface Donation {
  id: string
  donorId: string
  amount: number
  currency: string
  purpose: 'scholarship' | 'infrastructure' | 'research' | 'general'
  isAnonymous: boolean
  paymentMethod: string
  transactionId: string
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  message?: string
  createdAt: string
}

export interface Message {
  id: string
  senderId: string
  receiverId: string
  subject: string
  content: string
  isRead: boolean
  attachments: string[]
  threadId?: string
  createdAt: string
}

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  category: 'system' | 'event' | 'job' | 'message' | 'achievement'
  isRead: boolean
  actionUrl?: string
  createdAt: string
}

// Utility Types
export interface Contact {
  phone?: string
  alternatePhone?: string
  email: string
  alternateEmail?: string
}

export interface Address {
  street?: string
  city?: string
  state?: string
  country?: string
  pincode?: string
}

export interface SocialMedia {
  linkedin?: string
  twitter?: string
  facebook?: string
  instagram?: string
  website?: string
}

export interface WorkExperience {
  company: string
  position: string
  startDate: string
  endDate?: string
  isCurrent: boolean
  description?: string
  location?: string
}

export interface Achievement {
  title: string
  description: string
  date: string
  category: 'academic' | 'professional' | 'social' | 'sports' | 'cultural'
  certificate?: string
}

export interface Publication {
  title: string
  journal: string
  year: string
  authors: string[]
  doi?: string
  url?: string
}

export interface AcademicRecord {
  currentGPA?: number
  semester: number
  year: number
  subjects: SubjectGrade[]
  attendance: number
}

export interface SubjectGrade {
  subject: string
  grade: string
  credits: number
  semester: number
}

export interface UserPreferences {
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
  privacy: {
    profileVisible: boolean
    contactVisible: boolean
    experienceVisible: boolean
  }
  jobAlerts: boolean
  eventAlerts: boolean
  newsletter: boolean
}

export interface Department {
  id: string
  name: string
  code: string
  head: string
  description?: string
  courses: string[]
  faculty: string[]
  established: string
}

export interface Course {
  id: string
  name: string
  code: string
  department: string
  duration: number
  type: 'undergraduate' | 'postgraduate' | 'diploma' | 'certificate'
  description?: string
  subjects: string[]
}

export interface Company {
  id: string
  name: string
  industry: string
  location: string
  website?: string
  description?: string
  employees: string[]
}

export interface AdminPermission {
  resource: string
  actions: ('create' | 'read' | 'update' | 'delete')[]
}