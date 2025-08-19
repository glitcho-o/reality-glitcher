import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, CameraView } from 'expo-camera';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setActive, setTransformationMode, TransformationMode } from '../store/slices/arSlice';

export function ARScreen() {
  const dispatch = useDispatch();
  const { isActive, currentMode, intensity } = useSelector((state: RootState) => state.ar);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleModeChange = (mode: TransformationMode) => {
    dispatch(setTransformationMode(mode));
  };

  const toggleAR = () => {
    setIsLoading(true);
    setTimeout(() => {
      dispatch(setActive(!isActive));
      setIsLoading(false);
    }, 1000); // Simulate processing time
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        Alert.alert('Photo Saved', 'Your transformed reality has been captured!');
      } catch (error) {
        Alert.alert('Error', 'Failed to take picture');
      }
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.text}>Requesting camera permissions...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.text}>No access to camera</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera}>
        {/* AR Overlay */}
        {isActive && (
          <View style={styles.arOverlay}>
            <Text style={styles.arModeText}>
              {currentMode.toUpperCase()} MODE ACTIVE
            </Text>
            {currentMode === 'cyberpunk' && (
              <View style={styles.cyberpunkOverlay}>
                <Text style={styles.cyberpunkText}>NEURAL LINK ESTABLISHED</Text>
              </View>
            )}
            {currentMode === 'medieval' && (
              <View style={styles.medievalOverlay}>
                <Text style={styles.medievalText}>⚔️ REALM OF MAGIC ⚔️</Text>
              </View>
            )}
            {currentMode === 'cartoon' && (
              <View style={styles.cartoonOverlay}>
                <Text style={styles.cartoonText}>🎨 TOON WORLD ACTIVE 🎨</Text>
              </View>
            )}
          </View>
        )}

        {/* Controls */}
        <View style={styles.controls}>
          <View style={styles.topControls}>
            <TouchableOpacity
              style={[styles.modeButton, currentMode === 'cyberpunk' && styles.activeModeButton]}
              onPress={() => handleModeChange('cyberpunk')}
            >
              <Text style={styles.modeButtonText}>🌆</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modeButton, currentMode === 'medieval' && styles.activeModeButton]}
              onPress={() => handleModeChange('medieval')}
            >
              <Text style={styles.modeButtonText}>🏰</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modeButton, currentMode === 'cartoon' && styles.activeModeButton]}
              onPress={() => handleModeChange('cartoon')}
            >
              <Text style={styles.modeButtonText}>🎨</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomControls}>
            <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
              <Text style={styles.captureButtonText}>📸</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.arToggleButton, isActive && styles.activeArButton]}
              onPress={toggleAR}
              disabled={isLoading}
            >
              <Text style={styles.arToggleText}>
                {isLoading ? '⌛' : isActive ? 'STOP AR' : 'START AR'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0a0a',
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
  },
  camera: {
    flex: 1,
  },
  arOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arModeText: {
    position: 'absolute',
    top: 50,
    fontSize: 16,
    color: '#00ff88',
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 5,
  },
  cyberpunkOverlay: {
    backgroundColor: 'rgba(0, 255, 136, 0.1)',
    padding: 20,
    borderRadius: 10,
  },
  cyberpunkText: {
    color: '#00ff88',
    fontSize: 18,
    fontWeight: 'bold',
  },
  medievalOverlay: {
    backgroundColor: 'rgba(255, 165, 0, 0.1)',
    padding: 20,
    borderRadius: 10,
  },
  medievalText: {
    color: '#ffa500',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartoonOverlay: {
    backgroundColor: 'rgba(255, 107, 157, 0.1)',
    padding: 20,
    borderRadius: 10,
  },
  cartoonText: {
    color: '#ff6b9d',
    fontSize: 18,
    fontWeight: 'bold',
  },
  controls: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    padding: 20,
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  modeButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeModeButton: {
    borderColor: '#00ff88',
  },
  modeButtonText: {
    fontSize: 24,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonText: {
    fontSize: 30,
  },
  arToggleButton: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  activeArButton: {
    backgroundColor: 'rgba(0, 255, 136, 0.8)',
    borderColor: '#00ff88',
  },
  arToggleText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});