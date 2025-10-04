// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
  error?: string
  code?: string
  timestamp: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export interface ValidationError {
  field: string
  message: string
}

export interface ApiError {
  error: string
  details?: ValidationError[]
  code?: string
  timestamp: string
}

// Request Types
export interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface SearchParams extends PaginationParams {
  query?: string
  filters?: Record<string, any>
}

// Auth API Types
export interface AuthResponse {
  user: {
    id: string
    email: string
    name: string
    role: string
    [key: string]: any
  }
  token?: string
}

// Alumni API Types
export interface AlumniListParams extends SearchParams {
  graduationYear?: string
  course?: string
  department?: string
  company?: string
  location?: string
}

// Event API Types
export interface EventListParams extends SearchParams {
  type?: string
  status?: string
  dateFrom?: string
  dateTo?: string
}

// Job API Types
export interface JobListParams extends SearchParams {
  type?: string
  location?: string
  company?: string
  experience?: string
}

// News API Types
export interface NewsListParams extends SearchParams {
  category?: string
  author?: string
  dateFrom?: string
  dateTo?: string
}