
import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';
import { User } from '../types';
import { WP_API_URL } from '../config';

// Use the environment variable for the WordPress API URL.
const API_BASE_URL = WP_API_URL ? `${WP_API_URL}/wp-json/mranderson-api/v1` : '';


interface GoogleProfile {
  name: string;
  email: string;
  picture: string;
  sub: string; // Google's unique ID
}

interface AuthContextType {
  user: User | null;
  // Fix: Add users array and getUsers function for the admin panel.
  users: User[];
  getUsers: () => Promise<void>;
  login: (email: string, pass: string) => Promise<{ user: User | null; error: string | null }>;
  loginWithGoogle: (profile: GoogleProfile) => Promise<{ user: User | null; error: string | null }>;
  logout: () => void;
  register: (name: string, email: string, password: string, whatsapp: string) => Promise<{ user: User | null; error: string | null }>;
  isLoading: boolean;
  saveQuestionnaireResults: (slug: string, score: number) => Promise<void>;
  submitCommunityQuestion: (question: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const authFetch = useCallback(async (endpoint: string, options: RequestInit = {}) => {
    if (!API_BASE_URL) {
      throw new Error("API URL is not configured in config.ts.");
    }
    const token = user?.token || localStorage.getItem('authToken');
    const headers = new Headers(options.headers || {});
    if (token) {
        headers.append('Authorization', `Bearer ${token}`);
    }
    headers.append('Content-Type', 'application/json');

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    return response;
  }, [user?.token]);

  // Effect for initializing the logged-in user from storage
  useEffect(() => {
    const validateToken = async () => {
      if (!API_BASE_URL) {
        setIsLoading(false);
        return;
      }
      try {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
          const response = await fetch(`${API_BASE_URL}/users/validate-token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: storedToken }),
          });
          if (response.ok) {
            const userData = await response.json();
            setUser({ ...userData.user, token: storedToken });
          } else {
            localStorage.removeItem('authToken');
            setUser(null);
          }
        }
      } catch (error) {
        console.error("Token validation failed", error);
        localStorage.removeItem('authToken');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    validateToken();
  }, []);
  
  const handleAuthSuccess = (data: any) => {
      const { token, user_data } = data;
      localStorage.setItem('authToken', token);
      setUser({ ...user_data, token });
      return { user: { ...user_data, token }, error: null };
  }
  
  const handleAuthError = async (response: Response) => {
      const errorData = await response.json();
      return { user: null, error: errorData.message || 'Ocorreu um erro.' };
  }

  const login = async (email: string, pass: string) => {
    if (!API_BASE_URL) return { user: null, error: 'API não configurada.' };
    try {
        const response = await fetch(`${API_BASE_URL}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password: pass }),
        });
        if (response.ok) {
            const data = await response.json();
            return handleAuthSuccess(data);
        }
        return await handleAuthError(response);
    } catch (error) {
        return { user: null, error: 'Erro de conexão. Tente novamente.' };
    }
  };
  
  const loginWithGoogle = async (profile: GoogleProfile) => {
    if (!API_BASE_URL) return { user: null, error: 'API não configurada.' };
    try {
      const response = await fetch(`${API_BASE_URL}/users/google-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile }),
      });
      if (response.ok) {
        const data = await response.json();
        return handleAuthSuccess(data);
      }
      return await handleAuthError(response);
    } catch (error) {
      return { user: null, error: 'Erro de conexão com o Google. Tente novamente.' };
    }
  };

  const register = async (name: string, email: string, password: string, whatsapp: string) => {
    if (!API_BASE_URL) return { user: null, error: 'API não configurada.' };
    try {
        const response = await fetch(`${API_BASE_URL}/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, whatsapp }),
        });
        if (response.ok) {
            // After successful registration, log the user in
            return await login(email, password);
        }
        return await handleAuthError(response);
    } catch (error) {
        return { user: null, error: 'Erro de conexão. Tente novamente.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };
  
  // Fix: Add function to fetch all users for the admin panel.
  const getUsers = useCallback(async () => {
    if (user?.role !== 'admin') {
      console.error('Permission denied: Only admins can fetch the user list.');
      setUsers([]);
      return;
    }

    try {
      const response = await authFetch('/users/list-all', {
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users || []);
      } else {
        console.error('Failed to fetch users:', await response.text());
        setUsers([]);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
    }
  }, [authFetch, user?.role]);

  const saveQuestionnaireResults = async (slug: string, score: number) => {
    try {
        const response = await authFetch('/users/save-results', {
            method: 'POST',
            body: JSON.stringify({ slug, score }),
        });
        if (response.ok) {
            const data = await response.json();
            setUser(prevUser => prevUser ? { ...prevUser, questionnaireResults: data.results } : null);
        } else {
            console.error("Failed to save questionnaire results");
        }
    } catch (error) {
        console.error("Error saving questionnaire results:", error);
    }
  };

  const submitCommunityQuestion = async (question: string) => {
      try {
          const response = await authFetch('/questions/submit', {
              method: 'POST',
              body: JSON.stringify({ question }),
          });
          if (response.ok) {
              return { success: true };
          }
          const errorData = await response.json();
          return { success: false, error: errorData.message || "Não foi possível enviar a pergunta." };
      } catch (error) {
          return { success: false, error: "Erro de conexão ao enviar pergunta." };
      }
  };

  return (
    <AuthContext.Provider value={{ user, users, getUsers, login, loginWithGoogle, register, logout, isLoading, saveQuestionnaireResults, submitCommunityQuestion }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};