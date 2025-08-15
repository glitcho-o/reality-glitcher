import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { MainTabParamList } from '../navigation/RootNavigator';

type HomeScreenNavigationProp = BottomTabNavigationProp<MainTabParamList, 'Home'>;

export function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { user } = useSelector((state: RootState) => state.user);

  const transformationModes = [
    {
      id: 'cyberpunk',
      title: 'Cyberpunk',
      emoji: '🌆',
      description: 'Neon-lit futuristic city vibes',
      color: '#00ff88',
    },
    {
      id: 'medieval',
      title: 'Medieval Fantasy',
      emoji: '🏰',
      description: 'Castles, dragons, and magic',
      color: '#ffa500',
    },
    {
      id: 'cartoon',
      title: 'Cartoon Mode',
      emoji: '🎨',
      description: 'Hand-drawn animated appearance',
      color: '#ff6b9d',
    },
  ];

  const handleModeSelect = (mode: string) => {
    navigation.navigate('AR', { mode });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome to Reality Glitcher</Text>
          <Text style={styles.subtitle}>Choose your transformation</Text>
        </View>

        <View style={styles.modesContainer}>
          {transformationModes.map((mode) => (
            <TouchableOpacity
              key={mode.id}
              style={[styles.modeCard, { borderColor: mode.color }]}
              onPress={() => handleModeSelect(mode.id)}
            >
              <Text style={styles.modeEmoji}>{mode.emoji}</Text>
              <Text style={[styles.modeTitle, { color: mode.color }]}>{mode.title}</Text>
              <Text style={styles.modeDescription}>{mode.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.multiplayerButton}
          onPress={() => navigation.navigate('Multiplayer')}
        >
          <Text style={styles.multiplayerText}>🤝 Join Multiplayer Session</Text>
        </TouchableOpacity>
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
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
    marginTop: 5,
  },
  modesContainer: {
    marginBottom: 30,
  },
  modeCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderWidth: 2,
    alignItems: 'center',
  },
  modeEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  modeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modeDescription: {
    fontSize: 14,
    color: '#cccccc',
    textAlign: 'center',
  },
  multiplayerButton: {
    backgroundColor: '#333333',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  multiplayerText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});