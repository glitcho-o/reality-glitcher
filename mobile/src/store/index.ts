import { configureStore } from '@reduxjs/toolkit';
import { arSlice } from './slices/arSlice';
import { userSlice } from './slices/userSlice';
import { multiplayerSlice } from './slices/multiplayerSlice';

export const store = configureStore({
  reducer: {
    ar: arSlice.reducer,
    user: userSlice.reducer,
    multiplayer: multiplayerSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;