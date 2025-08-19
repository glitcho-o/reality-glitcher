import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setConnected, setSessionId } from '../store/slices/multiplayerSlice';

export function MultiplayerScreen() {
  const dispatch = useDispatch();
  const { isConnected, sessionId, connectedUsers } = useSelector((state: RootState) => state.multiplayer);
  const [sessionInput, setSessionInput] = useState('');

  const handleJoinSession = () => {
    if (sessionInput.trim()) {
      dispatch(setSessionId(sessionInput.trim()));
      dispatch(setConnected(true));
    }
  };

  const handleCreateSession = () => {
    const newSessionId = Math.random().toString(36).substring(2, 8).toUpperCase();
    dispatch(setSessionId(newSessionId));
    dispatch(setConnected(true));
  };

  const handleLeaveSession = () => {
    dispatch(setConnected(false));
    dispatch(setSessionId(null));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Multiplayer AR</Text>
          <Text style={styles.subtitle}>Share your transformed reality</Text>
        </View>

        {!isConnected ? (
          <View style={styles.connectionSection}>
            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Join Existing Session</Text>
              <TextInput
                style={styles.textInput}
                value={sessionInput}
                onChangeText={setSessionInput}
                placeholder="Enter session code"
                placeholderTextColor="#666"
                autoCapitalize="characters"
              />
              <TouchableOpacity
                style={[styles.button, styles.joinButton]}
                onPress={handleJoinSession}
                disabled={!sessionInput.trim()}
              >
                <Text style={styles.buttonText}>Join Session</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.divider}>
              <Text style={styles.dividerText}>OR</Text>
            </View>

            <TouchableOpacity
              style={[styles.button, styles.createButton]}
              onPress={handleCreateSession}
            >
              <Text style={styles.buttonText}>Create New Session</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.sessionSection}>
            <View style={styles.sessionInfo}>
              <Text style={styles.sessionIdLabel}>Session Code</Text>
              <Text style={styles.sessionIdText}>{sessionId}</Text>
              <Text style={styles.sessionShareText}>Share this code with friends</Text>
            </View>

            <View style={styles.connectedUsersSection}>
              <Text style={styles.connectedUsersTitle}>
                Connected Users ({connectedUsers.length})
              </Text>
              {connectedUsers.length === 0 ? (
                <Text style={styles.noUsersText}>No other users connected</Text>
              ) : (
                connectedUsers.map((user) => (
                  <View key={user.id} style={styles.userCard}>
                    <Text style={styles.userName}>{user.username}</Text>
                    <Text style={styles.userStatus}>🟢 Online</Text>
                  </View>
                ))
              )}
            </View>

            <View style={styles.controls}>
              <TouchableOpacity style={styles.voiceButton}>
                <Text style={styles.voiceButtonText}>🎤 Voice Chat</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.shareButton}>
                <Text style={styles.shareButtonText}>📤 Share View</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.button, styles.leaveButton]}
              onPress={handleLeaveSession}
            >
              <Text style={styles.buttonText}>Leave Session</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.featuresSection}>
          <Text style={styles.featuresTitle}>Multiplayer Features</Text>
          <Text style={styles.featureItem}>🤝 Real-time position sync</Text>
          <Text style={styles.featureItem}>🎭 Shared transformations</Text>
          <Text style={styles.featureItem}>🗣️ Voice communication</Text>
          <Text style={styles.featureItem}>📱 Cross-platform support</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 16,
    color: '#cccccc',
    marginTop: 5,
  },
  connectionSection: {
    marginBottom: 30,
  },
  inputSection: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 15,
    textAlign: 'center',
  },
  divider: {
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerText: {
    color: '#666',
    fontSize: 16,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: 'center',
  },
  joinButton: {
    backgroundColor: '#00ff88',
  },
  createButton: {
    backgroundColor: '#0066ff',
  },
  leaveButton: {
    backgroundColor: '#ff4444',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sessionSection: {
    marginBottom: 30,
  },
  sessionInfo: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  sessionIdLabel: {
    fontSize: 14,
    color: '#cccccc',
  },
  sessionIdText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00ff88',
    marginVertical: 5,
  },
  sessionShareText: {
    fontSize: 12,
    color: '#666',
  },
  connectedUsersSection: {
    marginBottom: 20,
  },
  connectedUsersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  noUsersText: {
    color: '#666',
    textAlign: 'center',
    padding: 20,
  },
  userCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {
    color: '#ffffff',
    fontSize: 16,
  },
  userStatus: {
    color: '#00ff88',
    fontSize: 14,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  voiceButton: {
    backgroundColor: '#333333',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  voiceButtonText: {
    color: '#ffffff',
    fontSize: 14,
  },
  shareButton: {
    backgroundColor: '#333333',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  shareButtonText: {
    color: '#ffffff',
    fontSize: 14,
  },
  featuresSection: {
    marginTop: 20,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  featureItem: {
    color: '#cccccc',
    fontSize: 14,
    marginBottom: 5,
  },
});