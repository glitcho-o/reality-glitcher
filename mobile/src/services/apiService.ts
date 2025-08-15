const API_BASE_URL = 'http://localhost:3000/api';

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  message: string;
}

export interface Friend {
  id: string;
  username: string;
  avatar?: string;
  lastSeen: Date;
}

export interface MultiplayerSession {
  id: string;
  hostUserId: string;
  sessionName: string;
  participants: any[];
  isActive: boolean;
  createdAt: Date;
}

class ApiService {
  private token: string | null = null;

  setToken(token: string): void {
    this.token = token;
  }

  clearToken(): void {
    this.token = null;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      defaultHeaders.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Authentication
  async register(username: string, email: string, password: string): Promise<AuthResponse> {
    return this.makeRequest<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    });
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    return this.makeRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async verifyToken(): Promise<{ user: User }> {
    return this.makeRequest<{ user: User }>('/auth/verify');
  }

  // User management
  async getUserProfile(userId: string): Promise<{ user: User }> {
    return this.makeRequest<{ user: User }>(`/users/profile/${userId}`);
  }

  async getFriends(userId: string): Promise<{ friends: Friend[] }> {
    return this.makeRequest<{ friends: Friend[] }>(`/users/friends/${userId}`);
  }

  async addFriend(userId: string, friendUsername: string): Promise<{ message: string }> {
    return this.makeRequest<{ message: string }>(`/users/friends/${userId}`, {
      method: 'POST',
      body: JSON.stringify({ friendUsername }),
    });
  }

  // Multiplayer
  async createSession(hostUserId: string, sessionName?: string): Promise<{ session: MultiplayerSession }> {
    return this.makeRequest<{ session: MultiplayerSession }>('/multiplayer/sessions', {
      method: 'POST',
      body: JSON.stringify({ hostUserId, sessionName }),
    });
  }

  async joinSession(sessionId: string, userId: string, username: string): Promise<{ session: MultiplayerSession }> {
    return this.makeRequest<{ session: MultiplayerSession }>(`/multiplayer/sessions/${sessionId}/join`, {
      method: 'POST',
      body: JSON.stringify({ userId, username }),
    });
  }

  async leaveSession(sessionId: string, userId: string): Promise<{ message: string }> {
    return this.makeRequest<{ message: string }>(`/multiplayer/sessions/${sessionId}/leave`, {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });
  }

  async getSession(sessionId: string): Promise<{ session: MultiplayerSession }> {
    return this.makeRequest<{ session: MultiplayerSession }>(`/multiplayer/sessions/${sessionId}`);
  }

  async getActiveSessions(): Promise<{ sessions: MultiplayerSession[] }> {
    return this.makeRequest<{ sessions: MultiplayerSession[] }>('/multiplayer/sessions');
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string; service: string }> {
    return this.makeRequest<{ status: string; timestamp: string; service: string }>('/../health');
  }
}

export const apiService = new ApiService();