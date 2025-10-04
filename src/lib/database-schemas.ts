// Database Schema Definitions (for reference)

export const DatabaseSchemas = {
  // Users table (base for all user types)
  users: `
    CREATE TABLE users (
      id VARCHAR(255) PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role ENUM('alumni', 'faculty', 'student', 'admin') NOT NULL,
      is_verified BOOLEAN DEFAULT FALSE,
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_email (email),
      INDEX idx_role (role)
    );
  `,

  // Alumni profiles
  alumni: `
    CREATE TABLE alumni (
      id VARCHAR(255) PRIMARY KEY,
      user_id VARCHAR(255) UNIQUE NOT NULL,
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      graduation_year VARCHAR(4) NOT NULL,
      course VARCHAR(100) NOT NULL,
      department VARCHAR(100) NOT NULL,
      roll_number VARCHAR(50),
      current_company VARCHAR(200),
      current_position VARCHAR(200),
      bio TEXT,
      profile_picture VARCHAR(500),
      skills JSON,
      last_login TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_graduation_year (graduation_year),
      INDEX idx_course (course),
      INDEX idx_department (department)
    );
  `,

  // Faculty profiles
  faculty: `
    CREATE TABLE faculty (
      id VARCHAR(255) PRIMARY KEY,
      user_id VARCHAR(255) UNIQUE NOT NULL,
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      employee_id VARCHAR(50) UNIQUE NOT NULL,
      department VARCHAR(100) NOT NULL,
      designation VARCHAR(100) NOT NULL,
      subjects JSON,
      qualifications JSON,
      experience INT DEFAULT 0,
      research_areas JSON,
      profile_picture VARCHAR(500),
      joining_date DATE NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_employee_id (employee_id),
      INDEX idx_department (department)
    );
  `,

  // Student profiles
  students: `
    CREATE TABLE students (
      id VARCHAR(255) PRIMARY KEY,
      user_id VARCHAR(255) UNIQUE NOT NULL,
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      roll_number VARCHAR(50) UNIQUE NOT NULL,
      course VARCHAR(100) NOT NULL,
      department VARCHAR(100) NOT NULL,
      year INT NOT NULL,
      semester INT NOT NULL,
      enrollment_date DATE NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_roll_number (roll_number),
      INDEX idx_course (course),
      INDEX idx_year (year)
    );
  `,

  // Contact information
  contacts: `
    CREATE TABLE contacts (
      id VARCHAR(255) PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      phone VARCHAR(20),
      alternate_phone VARCHAR(20),
      alternate_email VARCHAR(255),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `,

  // Address information
  addresses: `
    CREATE TABLE addresses (
      id VARCHAR(255) PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      type ENUM('current', 'permanent', 'office') DEFAULT 'current',
      street TEXT,
      city VARCHAR(100),
      state VARCHAR(100),
      country VARCHAR(100),
      pincode VARCHAR(20),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `,

  // Events
  events: `
    CREATE TABLE events (
      id VARCHAR(255) PRIMARY KEY,
      title VARCHAR(200) NOT NULL,
      description TEXT NOT NULL,
      type ENUM('reunion', 'workshop', 'seminar', 'networking', 'cultural') NOT NULL,
      date DATETIME NOT NULL,
      end_date DATETIME,
      venue VARCHAR(200) NOT NULL,
      is_online BOOLEAN DEFAULT FALSE,
      meeting_link VARCHAR(500),
      organizer VARCHAR(255) NOT NULL,
      max_attendees INT,
      fee DECIMAL(10,2) DEFAULT 0,
      status ENUM('upcoming', 'ongoing', 'completed', 'cancelled') DEFAULT 'upcoming',
      images JSON,
      created_by VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (created_by) REFERENCES users(id),
      INDEX idx_date (date),
      INDEX idx_type (type),
      INDEX idx_status (status)
    );
  `,

  // Jobs
  jobs: `
    CREATE TABLE jobs (
      id VARCHAR(255) PRIMARY KEY,
      title VARCHAR(200) NOT NULL,
      company VARCHAR(200) NOT NULL,
      description TEXT NOT NULL,
      requirements JSON,
      location VARCHAR(200) NOT NULL,
      type ENUM('full-time', 'part-time', 'contract', 'internship') NOT NULL,
      experience VARCHAR(100),
      salary VARCHAR(100),
      posted_by VARCHAR(255) NOT NULL,
      status ENUM('active', 'closed', 'filled') DEFAULT 'active',
      expiry_date DATETIME NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (posted_by) REFERENCES users(id),
      INDEX idx_company (company),
      INDEX idx_type (type),
      INDEX idx_status (status),
      INDEX idx_expiry_date (expiry_date)
    );
  `,

  // News
  news: `
    CREATE TABLE news (
      id VARCHAR(255) PRIMARY KEY,
      title VARCHAR(200) NOT NULL,
      content TEXT NOT NULL,
      summary VARCHAR(500) NOT NULL,
      category ENUM('achievement', 'announcement', 'event', 'academic', 'general') NOT NULL,
      author VARCHAR(255) NOT NULL,
      images JSON,
      tags JSON,
      is_published BOOLEAN DEFAULT FALSE,
      published_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (author) REFERENCES users(id),
      INDEX idx_category (category),
      INDEX idx_published (is_published),
      INDEX idx_published_at (published_at)
    );
  `,

  // Messages
  messages: `
    CREATE TABLE messages (
      id VARCHAR(255) PRIMARY KEY,
      sender_id VARCHAR(255) NOT NULL,
      receiver_id VARCHAR(255) NOT NULL,
      subject VARCHAR(200) NOT NULL,
      content TEXT NOT NULL,
      is_read BOOLEAN DEFAULT FALSE,
      attachments JSON,
      thread_id VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (sender_id) REFERENCES users(id),
      FOREIGN KEY (receiver_id) REFERENCES users(id),
      INDEX idx_sender (sender_id),
      INDEX idx_receiver (receiver_id),
      INDEX idx_thread (thread_id),
      INDEX idx_created_at (created_at)
    );
  `,

  // Notifications
  notifications: `
    CREATE TABLE notifications (
      id VARCHAR(255) PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      title VARCHAR(200) NOT NULL,
      message TEXT NOT NULL,
      type ENUM('info', 'success', 'warning', 'error') DEFAULT 'info',
      category ENUM('system', 'event', 'job', 'message', 'achievement') NOT NULL,
      is_read BOOLEAN DEFAULT FALSE,
      action_url VARCHAR(500),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_user_id (user_id),
      INDEX idx_is_read (is_read),
      INDEX idx_created_at (created_at)
    );
  `,

  // Donations
  donations: `
    CREATE TABLE donations (
      id VARCHAR(255) PRIMARY KEY,
      donor_id VARCHAR(255) NOT NULL,
      amount DECIMAL(12,2) NOT NULL,
      currency VARCHAR(3) DEFAULT 'INR',
      purpose ENUM('scholarship', 'infrastructure', 'research', 'general') NOT NULL,
      is_anonymous BOOLEAN DEFAULT FALSE,
      payment_method VARCHAR(50),
      transaction_id VARCHAR(200),
      status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
      message TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (donor_id) REFERENCES users(id),
      INDEX idx_donor_id (donor_id),
      INDEX idx_status (status),
      INDEX idx_created_at (created_at)
    );
  `
}

// MongoDB Schema Examples
export const MongoSchemas = {
  users: {
    _id: 'ObjectId',
    email: 'String (unique)',
    password: 'String',
    role: 'String (enum)',
    isVerified: 'Boolean',
    isActive: 'Boolean',
    createdAt: 'Date',
    updatedAt: 'Date'
  },
  
  alumni: {
    _id: 'ObjectId',
    userId: 'ObjectId (ref: users)',
    firstName: 'String',
    lastName: 'String',
    graduationYear: 'String',
    course: 'String',
    department: 'String',
    currentCompany: 'String',
    workExperience: '[Object]',
    achievements: '[Object]',
    skills: '[String]',
    contact: 'Object',
    address: 'Object',
    socialMedia: 'Object',
    preferences: 'Object'
  }
}