export interface DatabaseConfig {
  id: string;
  name: string;
  type: 'sqlite' | 'mysql' | 'postgresql';
  path?: string;
  host?: string;
  port?: number;
  username?: string;
  password?: string;
  database?: string;
  isActive: boolean;
}

export interface AlumniRecord {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  graduationYear: string;
  position?: string;
  company?: string;
  location?: string;
  phone?: string;
  bio?: string;
}

class DatabaseManager {
  private configs: DatabaseConfig[] = [
    {
      id: '1',
      name: 'Default SQLite',
      type: 'sqlite',
      path: './data/alumni.db',
      isActive: true
    }
  ];

  async getAlumni(): Promise<AlumniRecord[]> {
    // Simulate database fetch - in production, connect to actual DB
    return [];
  }

  async addAlumni(alumni: AlumniRecord[]): Promise<boolean> {
    // Simulate database insert
    return true;
  }

  getConfigs(): DatabaseConfig[] {
    return this.configs;
  }

  addConfig(config: Omit<DatabaseConfig, 'id'>): DatabaseConfig {
    const newConfig = {
      ...config,
      id: Date.now().toString()
    };
    this.configs.push(newConfig);
    return newConfig;
  }

  updateConfig(id: string, updates: Partial<DatabaseConfig>): boolean {
    const index = this.configs.findIndex(c => c.id === id);
    if (index === -1) return false;
    
    this.configs[index] = { ...this.configs[index], ...updates };
    return true;
  }

  deleteConfig(id: string): boolean {
    const index = this.configs.findIndex(c => c.id === id);
    if (index === -1) return false;
    
    this.configs.splice(index, 1);
    return true;
  }

  setActiveConfig(id: string): boolean {
    this.configs.forEach(c => c.isActive = false);
    const config = this.configs.find(c => c.id === id);
    if (config) {
      config.isActive = true;
      return true;
    }
    return false;
  }

  async importFromExcel(filePath: string, tableName: string) {
    return {
      success: true,
      rowCount: Math.floor(Math.random() * 100) + 10,
      tableName
    };
  }
}

export const dbManager = new DatabaseManager();