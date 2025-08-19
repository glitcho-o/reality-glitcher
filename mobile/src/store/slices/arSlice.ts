import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TransformationMode = 'cyberpunk' | 'medieval' | 'cartoon' | 'none';

interface ARState {
  isActive: boolean;
  currentMode: TransformationMode;
  intensity: number;
  isRecording: boolean;
  fps: number;
  processingLatency: number;
}

const initialState: ARState = {
  isActive: false,
  currentMode: 'none',
  intensity: 1.0,
  isRecording: false,
  fps: 60,
  processingLatency: 0,
};

export const arSlice = createSlice({
  name: 'ar',
  initialState,
  reducers: {
    setActive: (state, action: PayloadAction<boolean>) => {
      state.isActive = action.payload;
    },
    setTransformationMode: (state, action: PayloadAction<TransformationMode>) => {
      state.currentMode = action.payload;
    },
    setIntensity: (state, action: PayloadAction<number>) => {
      state.intensity = Math.max(0, Math.min(1, action.payload));
    },
    setRecording: (state, action: PayloadAction<boolean>) => {
      state.isRecording = action.payload;
    },
    updatePerformanceMetrics: (state, action: PayloadAction<{ fps: number; latency: number }>) => {
      state.fps = action.payload.fps;
      state.processingLatency = action.payload.latency;
    },
  },
});

export const { setActive, setTransformationMode, setIntensity, setRecording, updatePerformanceMetrics } = arSlice.actions;