import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ConnectedUser {
  id: string;
  username: string;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
}

interface MultiplayerState {
  isConnected: boolean;
  sessionId: string | null;
  connectedUsers: ConnectedUser[];
  isHost: boolean;
  voiceChatEnabled: boolean;
}

const initialState: MultiplayerState = {
  isConnected: false,
  sessionId: null,
  connectedUsers: [],
  isHost: false,
  voiceChatEnabled: false,
};

export const multiplayerSlice = createSlice({
  name: 'multiplayer',
  initialState,
  reducers: {
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    setSessionId: (state, action: PayloadAction<string | null>) => {
      state.sessionId = action.payload;
    },
    setConnectedUsers: (state, action: PayloadAction<ConnectedUser[]>) => {
      state.connectedUsers = action.payload;
    },
    updateUserPosition: (state, action: PayloadAction<{ userId: string; position: { x: number; y: number; z: number } }>) => {
      const user = state.connectedUsers.find(u => u.id === action.payload.userId);
      if (user) {
        user.position = action.payload.position;
      }
    },
    setHost: (state, action: PayloadAction<boolean>) => {
      state.isHost = action.payload;
    },
    setVoiceChatEnabled: (state, action: PayloadAction<boolean>) => {
      state.voiceChatEnabled = action.payload;
    },
  },
});

export const { setConnected, setSessionId, setConnectedUsers, updateUserPosition, setHost, setVoiceChatEnabled } = multiplayerSlice.actions;