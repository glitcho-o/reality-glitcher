import { io, Socket } from 'socket.io-client';

export interface UserPosition {
  x: number;
  y: number;
  z: number;
}

export interface UserRotation {
  x: number;
  y: number;
  z: number;
}

export interface ConnectedUser {
  userId: string;
  username: string;
  position: UserPosition;
  rotation: UserRotation;
}

export interface MultiplayerEvents {
  // Connection events
  'user-joined': (data: ConnectedUser) => void;
  'user-left': (data: { userId: string; username: string }) => void;
  'session-users': (data: { users: ConnectedUser[] }) => void;
  
  // Position events
  'user-position-update': (data: { userId: string; position: UserPosition; rotation: UserRotation }) => void;
  
  // Transformation events
  'user-transformation-change': (data: { userId: string; mode: string; intensity: number }) => void;
  
  // Voice chat events
  'voice-offer': (data: { fromUserId: string; offer: any }) => void;
  'voice-answer': (data: { fromUserId: string; answer: any }) => void;
  'ice-candidate': (data: { fromUserId: string; candidate: any }) => void;
}

class SocketService {
  private socket: Socket | null = null;
  private isConnected = false;
  private eventHandlers: Map<string, Function[]> = new Map();

  connect(serverUrl: string = 'http://localhost:3000'): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.isConnected) {
        resolve();
        return;
      }

      this.socket = io(serverUrl, {
        transports: ['websocket'],
        timeout: 5000,
      });

      this.socket.on('connect', () => {
        console.log('🔌 Connected to Reality Glitcher server');
        this.isConnected = true;
        resolve();
      });

      this.socket.on('disconnect', () => {
        console.log('🔌 Disconnected from server');
        this.isConnected = false;
      });

      this.socket.on('connect_error', (error) => {
        console.error('❌ Connection error:', error);
        reject(error);
      });

      // Set up event forwarding
      this.setupEventForwarding();
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      this.eventHandlers.clear();
      console.log('🔌 Disconnected from server');
    }
  }

  private setupEventForwarding(): void {
    if (!this.socket) return;

    const events: (keyof MultiplayerEvents)[] = [
      'user-joined',
      'user-left', 
      'session-users',
      'user-position-update',
      'user-transformation-change',
      'voice-offer',
      'voice-answer',
      'ice-candidate',
    ];

    events.forEach(event => {
      this.socket!.on(event, (data: any) => {
        const handlers = this.eventHandlers.get(event);
        if (handlers) {
          handlers.forEach(handler => handler(data));
        }
      });
    });
  }

  // Authentication
  authenticate(userId: string, username: string): void {
    if (!this.socket) return;
    
    this.socket.emit('authenticate', { userId, username });
    console.log(`🔐 Authenticated as ${username}`);
  }

  // Session management
  joinSession(sessionId: string): void {
    if (!this.socket) return;
    
    this.socket.emit('join-session', { sessionId });
    console.log(`🚪 Joining session ${sessionId}`);
  }

  // Position updates
  updatePosition(position: UserPosition, rotation: UserRotation): void {
    if (!this.socket) return;
    
    this.socket.emit('update-position', { position, rotation });
  }

  // Transformation sync
  broadcastTransformation(mode: string, intensity: number): void {
    if (!this.socket) return;
    
    this.socket.emit('transformation-change', { mode, intensity });
  }

  // Voice chat WebRTC signaling
  sendVoiceOffer(targetUserId: string, offer: any): void {
    if (!this.socket) return;
    
    this.socket.emit('voice-offer', { targetUserId, offer });
  }

  sendVoiceAnswer(targetUserId: string, answer: any): void {
    if (!this.socket) return;
    
    this.socket.emit('voice-answer', { targetUserId, answer });
  }

  sendIceCandidate(targetUserId: string, candidate: any): void {
    if (!this.socket) return;
    
    this.socket.emit('ice-candidate', { targetUserId, candidate });
  }

  // Event handling
  on<K extends keyof MultiplayerEvents>(event: K, handler: MultiplayerEvents[K]): void {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
    }
    this.eventHandlers.get(event)!.push(handler);
  }

  off<K extends keyof MultiplayerEvents>(event: K, handler: MultiplayerEvents[K]): void {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  }

  // Connection status
  isSocketConnected(): boolean {
    return this.isConnected && this.socket?.connected === true;
  }

  // Get connection stats
  getConnectionStats(): { connected: boolean; latency?: number } {
    if (!this.socket || !this.isConnected) {
      return { connected: false };
    }

    return {
      connected: true,
      // Note: latency measurement would need custom implementation
      latency: undefined,
    };
  }
}

export const socketService = new SocketService();