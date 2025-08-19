import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/RootNavigator';

type OnboardingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding'>;

export function OnboardingScreen() {
  const navigation = useNavigation<OnboardingScreenNavigationProp>();

  const handleGetStarted = () => {
    navigation.navigate('Main');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.background}>
        <View style={styles.content}>
          <Text style={styles.title}>Reality Glitcher</Text>
          <Text style={styles.tagline}>See the world the way no human ever has</Text>
          
          <View style={styles.features}>
            <Text style={styles.featureText}>🌆 Cyberpunk Transformation</Text>
            <Text style={styles.featureText}>🏰 Medieval Fantasy Mode</Text>
            <Text style={styles.featureText}>🎨 Cartoon Reality</Text>
            <Text style={styles.featureText}>🤝 Multiplayer AR</Text>
          </View>

          <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
            <Text style={styles.buttonText}>Enter the Glitch</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(10, 10, 10, 0.7)',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#00ff88',
    textAlign: 'center',
    marginBottom: 10,
  },
  tagline: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 40,
    opacity: 0.9,
  },
  features: {
    marginBottom: 60,
  },
  featureText: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  getStartedButton: {
    backgroundColor: '#00ff88',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonText: {
    color: '#0a0a0a',
    fontSize: 18,
    fontWeight: 'bold',
  },
});