'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  graduationYear: string;
  position?: string;
  company?: string;
  location?: string;
  bio?: string;
  skills?: string[];
  isLoggedIn: boolean;
}

interface AppState {
  user: User | null;
  alumni: User[];
  events: any[];
  jobs: any[];
  news: any[];
  messages: any[];
  donations: any[];
  theme: string;
}

type AppAction = 
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'REGISTER'; payload: User }
  | { type: 'UPDATE_PROFILE'; payload: Partial<User> }
  | { type: 'ADD_EVENT'; payload: any }
  | { type: 'ADD_JOB'; payload: any }
  | { type: 'ADD_NEWS'; payload: any }
  | { type: 'SEND_MESSAGE'; payload: any }
  | { type: 'ADD_DONATION'; payload: any }
  | { type: 'SET_THEME'; payload: string };

const initialState: AppState = {
  user: null,
  alumni: [
    { id: '1', firstName: 'John', lastName: 'Smith', email: 'john@email.com', graduationYear: '2015', position: 'Software Engineer', company: 'Tech Corp', location: 'Mumbai', isLoggedIn: false },
    { id: '2', firstName: 'Sarah', lastName: 'Johnson', email: 'sarah@email.com', graduationYear: '2018', position: 'Product Manager', company: 'StartupXYZ', location: 'Bangalore', isLoggedIn: false },
    { id: '3', firstName: 'Michael', lastName: 'Brown', email: 'michael@email.com', graduationYear: '2012', position: 'Data Scientist', company: 'Analytics Inc', location: 'Pune', isLoggedIn: false },
    { id: '4', firstName: 'Emily', lastName: 'Davis', email: 'emily@email.com', graduationYear: '2020', position: 'Marketing Manager', company: 'Brand Co', location: 'Delhi', isLoggedIn: false }
  ],
  events: [
    { id: '1', title: 'Annual Alumni Meet 2024', date: 'Dec 15, 2024', location: 'College Campus', type: 'Reunion', registered: false },
    { id: '2', title: 'Tech Networking Evening', date: 'Jan 20, 2025', location: 'Mumbai', type: 'Networking', registered: false },
    { id: '3', title: 'Career Workshop', date: 'Feb 10, 2025', location: 'Online', type: 'Workshop', registered: false }
  ],
  jobs: [
    { id: '1', title: 'Senior Software Engineer', company: 'Tech Solutions Inc.', location: 'Mumbai', type: 'Full Time', salary: '₹15-25 LPA', posted: '2 days ago' },
    { id: '2', title: 'Product Manager', company: 'StartupXYZ', location: 'Bangalore', type: 'Full Time', salary: '₹20-30 LPA', posted: '1 week ago' },
    { id: '3', title: 'Data Analyst', company: 'Analytics Corp', location: 'Remote', type: 'Remote', salary: '₹8-15 LPA', posted: '3 days ago' }
  ],
  news: [
    { id: '1', title: 'College Ranks #1 in Innovation Index 2024', category: 'College Updates', date: 'Nov 1, 2024', excerpt: 'Our college has been ranked #1 in the National Innovation Index 2024...' },
    { id: '2', title: 'Alumni Spotlight: Sarah Johnson Wins Award', category: 'Alumni Achievements', date: 'Oct 28, 2024', excerpt: 'Sarah Johnson, Class of 2015, has been awarded the Young Entrepreneur of the Year...' },
    { id: '3', title: 'New Research Center Opens', category: 'College Updates', date: 'Oct 25, 2024', excerpt: 'The state-of-the-art AI Research Center is now open for students and faculty...' }
  ],
  messages: [],
  donations: [],
  theme: typeof window !== 'undefined' ? (localStorage.getItem('globalDefaultTheme') || 'dark') : 'dark'
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: { ...action.payload, isLoggedIn: true } };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'REGISTER':
      const newUser = { ...action.payload, id: Date.now().toString(), isLoggedIn: true };
      return { 
        ...state, 
        user: newUser,
        alumni: [...state.alumni, newUser]
      };
    case 'UPDATE_PROFILE':
      if (!state.user) return state;
      const updatedUser = { ...state.user, ...action.payload };
      return {
        ...state,
        user: updatedUser,
        alumni: state.alumni.map(a => a.id === state.user?.id ? updatedUser : a)
      };
    case 'ADD_EVENT':
      return { ...state, events: [...state.events, { ...action.payload, id: Date.now().toString() }] };
    case 'ADD_JOB':
      return { ...state, jobs: [...state.jobs, { ...action.payload, id: Date.now().toString() }] };
    case 'ADD_NEWS':
      return { ...state, news: [...state.news, { ...action.payload, id: Date.now().toString() }] };
    case 'SEND_MESSAGE':
      return { ...state, messages: [...state.messages, { ...action.payload, id: Date.now().toString() }] };
    case 'ADD_DONATION':
      return { ...state, donations: [...state.donations, { ...action.payload, id: Date.now().toString() }] };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}