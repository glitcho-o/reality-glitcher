import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setIntensity } from '../store/slices/arSlice';

export function SettingsScreen() {
  const dispatch = useDispatch();
  const { intensity } = useSelector((state: RootState) => state.ar);
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [voiceChatEnabled, setVoiceChatEnabled] = React.useState(false);
  const [highQualityMode, setHighQualityMode] = React.useState(true);

  const handleIntensityChange = (newIntensity: number) => {
    dispatch(setIntensity(newIntensity));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AR Performance</Text>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Transformation Intensity</Text>
            <View style={styles.intensitySlider}>
              {[0.25, 0.5, 0.75, 1.0].map((value) => (
                <TouchableOpacity
                  key={value}
                  style={[
                    styles.intensityButton,
                    intensity === value && styles.activeIntensityButton,
                  ]}
                  onPress={() => handleIntensityChange(value)}
                >
                  <Text style={[
                    styles.intensityButtonText,
                    intensity === value && styles.activeIntensityButtonText,
                  ]}>
                    {Math.round(value * 100)}%
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>High Quality Mode</Text>
            <Switch
              value={highQualityMode}
              onValueChange={setHighQualityMode}
              trackColor={{ false: '#333', true: '#00ff88' }}
              thumbColor={highQualityMode ? '#ffffff' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Multiplayer</Text>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Voice Chat</Text>
            <Switch
              value={voiceChatEnabled}
              onValueChange={setVoiceChatEnabled}
              trackColor={{ false: '#333', true: '#00ff88' }}
              thumbColor={voiceChatEnabled ? '#ffffff' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Push Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#333', true: '#00ff88' }}
              thumbColor={notificationsEnabled ? '#ffffff' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Version</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Build</Text>
            <Text style={styles.infoValue}>2025.01.001</Text>
          </View>
          
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkButtonText}>Privacy Policy</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkButtonText}>Terms of Service</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkButtonText}>Support</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance Stats</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>FPS</Text>
              <Text style={styles.statValue}>60</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Latency</Text>
              <Text style={styles.statValue}>12ms</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Memory</Text>
              <Text style={styles.statValue}>156MB</Text>
            </View>
          </View>
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
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00ff88',
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  settingLabel: {
    fontSize: 16,
    color: '#ffffff',
    flex: 1,
  },
  intensitySlider: {
    flexDirection: 'row',
    gap: 5,
  },
  intensityButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: '#333',
    borderWidth: 1,
    borderColor: '#666',
  },
  activeIntensityButton: {
    backgroundColor: '#00ff88',
    borderColor: '#00ff88',
  },
  intensityButtonText: {
    fontSize: 12,
    color: '#ffffff',
  },
  activeIntensityButtonText: {
    color: '#0a0a0a',
    fontWeight: 'bold',
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: '#cccccc',
  },
  infoValue: {
    fontSize: 16,
    color: '#ffffff',
  },
  linkButton: {
    paddingVertical: 12,
  },
  linkButtonText: {
    fontSize: 16,
    color: '#00ff88',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00ff88',
  },
});