import { Server, Socket } from 'socket.io';

interface UserPosition {
  x: number;
  y: number;
  z: number;
}

interface UserRotation {
  x: number;
  y: number;
  z: number;
}

interface ConnectedUser {
  socketId: string;
  userId: string;
  username: string;
  sessionId?: string;
  position: UserPosition;
  rotation: UserRotation;
}

const connectedUsers = new Map<string, ConnectedUser>();
const sessionRooms = new Map<string, Set<string>>();

export function setupSocketHandlers(io: Server) {
  io.on('connection', (socket: Socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handle user authentication
    socket.on('authenticate', (data: { userId: string; username: string }) => {
      const user: ConnectedUser = {
        socketId: socket.id,
        userId: data.userId,
        username: data.username,
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
      };
      
      connectedUsers.set(socket.id, user);
      console.log(`User authenticated: ${data.username} (${data.userId})`);
    });

    // Handle joining AR session
    socket.on('join-session', (data: { sessionId: string }) => {
      const user = connectedUsers.get(socket.id);
      if (!user) return;

      // Leave previous session if any
      if (user.sessionId) {
        socket.leave(user.sessionId);
        const prevSessionUsers = sessionRooms.get(user.sessionId);
        if (prevSessionUsers) {
          prevSessionUsers.delete(socket.id);
          socket.to(user.sessionId).emit('user-left', {
            userId: user.userId,
            username: user.username,
          });
        }
      }

      // Join new session
      user.sessionId = data.sessionId;
      socket.join(data.sessionId);
      
      if (!sessionRooms.has(data.sessionId)) {
        sessionRooms.set(data.sessionId, new Set());
      }
      sessionRooms.get(data.sessionId)!.add(socket.id);

      // Notify other users in the session
      socket.to(data.sessionId).emit('user-joined', {
        userId: user.userId,
        username: user.username,
        position: user.position,
        rotation: user.rotation,
      });

      // Send current session users to the new user
      const sessionUsers = Array.from(sessionRooms.get(data.sessionId)!)
        .map(socketId => connectedUsers.get(socketId))
        .filter(u => u && u.socketId !== socket.id)
        .map(u => ({
          userId: u!.userId,
          username: u!.username,
          position: u!.position,
          rotation: u!.rotation,
        }));

      socket.emit('session-users', { users: sessionUsers });
      
      console.log(`User ${user.username} joined session ${data.sessionId}`);
    });

    // Handle position updates
    socket.on('update-position', (data: { position: UserPosition; rotation: UserRotation }) => {
      const user = connectedUsers.get(socket.id);
      if (!user || !user.sessionId) return;

      user.position = data.position;
      user.rotation = data.rotation;

      // Broadcast position update to other users in the session
      socket.to(user.sessionId).emit('user-position-update', {
        userId: user.userId,
        position: data.position,
        rotation: data.rotation,
      });
    });

    // Handle AR transformation sync
    socket.on('transformation-change', (data: { mode: string; intensity: number }) => {
      const user = connectedUsers.get(socket.id);
      if (!user || !user.sessionId) return;

      // Broadcast transformation change to other users in the session
      socket.to(user.sessionId).emit('user-transformation-change', {
        userId: user.userId,
        mode: data.mode,
        intensity: data.intensity,
      });
    });

    // Handle voice chat signaling
    socket.on('voice-offer', (data: { targetUserId: string; offer: any }) => {
      const targetUser = Array.from(connectedUsers.values())
        .find(u => u.userId === data.targetUserId);
      
      if (targetUser) {
        io.to(targetUser.socketId).emit('voice-offer', {
          fromUserId: connectedUsers.get(socket.id)?.userId,
          offer: data.offer,
        });
      }
    });

    socket.on('voice-answer', (data: { targetUserId: string; answer: any }) => {
      const targetUser = Array.from(connectedUsers.values())
        .find(u => u.userId === data.targetUserId);
      
      if (targetUser) {
        io.to(targetUser.socketId).emit('voice-answer', {
          fromUserId: connectedUsers.get(socket.id)?.userId,
          answer: data.answer,
        });
      }
    });

    socket.on('ice-candidate', (data: { targetUserId: string; candidate: any }) => {
      const targetUser = Array.from(connectedUsers.values())
        .find(u => u.userId === data.targetUserId);
      
      if (targetUser) {
        io.to(targetUser.socketId).emit('ice-candidate', {
          fromUserId: connectedUsers.get(socket.id)?.userId,
          candidate: data.candidate,
        });
      }
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      const user = connectedUsers.get(socket.id);
      if (user) {
        // Remove from session
        if (user.sessionId) {
          const sessionUsers = sessionRooms.get(user.sessionId);
          if (sessionUsers) {
            sessionUsers.delete(socket.id);
            socket.to(user.sessionId).emit('user-left', {
              userId: user.userId,
              username: user.username,
            });
          }
        }
        
        connectedUsers.delete(socket.id);
        console.log(`User disconnected: ${user.username} (${socket.id})`);
      }
    });
  });
}