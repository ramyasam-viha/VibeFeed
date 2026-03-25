import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { theme } from '../../constants/theme';

export default function CreateScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/create-bg.png')}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
      />
      <LinearGradient
        colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']}
        style={StyleSheet.absoluteFill}
      />

      {/* Top Controls */}
      <View style={[styles.topControls, { top: insets.top + 12 }]}>
        <Pressable style={styles.topButton}>
          <Ionicons name="close" size={28} color="#FFF" />
        </Pressable>
        <View style={styles.topCenter}>
          <Text style={styles.topTitle}>Create</Text>
        </View>
        <Pressable style={styles.topButton}>
          <Ionicons name="musical-notes" size={24} color="#FFF" />
          <Text style={styles.topButtonLabel}>Sounds</Text>
        </Pressable>
      </View>

      {/* Side Tools */}
      <View style={styles.sideTools}>
        {[
          { icon: 'swap-vertical', label: 'Flip' },
          { icon: 'speedometer-outline', label: 'Speed' },
          { icon: 'color-filter-outline', label: 'Filters' },
          { icon: 'timer-outline', label: 'Timer' },
          { icon: 'flash-outline', label: 'Flash' },
        ].map((tool) => (
          <Pressable
            key={tool.label}
            style={styles.sideTool}
            onPress={() => Haptics.selectionAsync()}
          >
            <Ionicons name={tool.icon as any} size={24} color="#FFF" />
            <Text style={styles.sideToolLabel}>{tool.label}</Text>
          </Pressable>
        ))}
      </View>

      {/* Center viewfinder hint */}
      <View style={styles.centerContent}>
        <View style={styles.cameraCircle}>
          <Ionicons name="camera" size={48} color="rgba(255,255,255,0.4)" />
        </View>
        <Text style={styles.cameraHint}>Tap to record</Text>
      </View>

      {/* Bottom Controls */}
      <View style={[styles.bottomControls, { bottom: insets.bottom + 80 }]}>
        {/* Effects / Templates row */}
        <View style={styles.bottomRow}>
          <Pressable style={styles.effectButton} onPress={() => Haptics.selectionAsync()}>
            <Ionicons name="sparkles" size={22} color="#FFF" />
            <Text style={styles.effectLabel}>Effects</Text>
          </Pressable>

          {/* Record Button */}
          <Pressable
            style={styles.recordButtonOuter}
            onPress={() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)}
          >
            <LinearGradient
              colors={[theme.primary, '#FF6B81']}
              style={styles.recordButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.recordButtonInner} />
            </LinearGradient>
          </Pressable>

          <Pressable style={styles.effectButton} onPress={() => Haptics.selectionAsync()}>
            <Ionicons name="images-outline" size={22} color="#FFF" />
            <Text style={styles.effectLabel}>Upload</Text>
          </Pressable>
        </View>

        {/* Duration tabs */}
        <View style={styles.durationRow}>
          {['15s', '60s', '3m', '10m'].map((dur, i) => (
            <Pressable
              key={dur}
              style={[styles.durationChip, i === 1 && styles.durationChipActive]}
              onPress={() => Haptics.selectionAsync()}
            >
              <Text style={[styles.durationText, i === 1 && styles.durationTextActive]}>
                {dur}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  topControls: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    zIndex: 10,
  },
  topButton: {
    alignItems: 'center',
    gap: 2,
  },
  topButtonLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: '#FFF',
    marginTop: 2,
  },
  topCenter: {
    alignItems: 'center',
  },
  topTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
  sideTools: {
    position: 'absolute',
    right: 16,
    top: '30%',
    gap: 20,
    zIndex: 10,
  },
  sideTool: {
    alignItems: 'center',
    gap: 4,
  },
  sideToolLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: '#FFF',
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraHint: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.5)',
    marginTop: 12,
  },
  bottomControls: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
    marginBottom: 20,
  },
  effectButton: {
    alignItems: 'center',
    gap: 4,
  },
  effectLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: '#FFF',
  },
  recordButtonOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: 'rgba(254,44,85,0.4)',
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordButtonGradient: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordButtonInner: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  durationRow: {
    flexDirection: 'row',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: theme.radius.full,
    padding: 3,
  },
  durationChip: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: theme.radius.full,
  },
  durationChipActive: {
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  durationText: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.5)',
  },
  durationTextActive: {
    color: '#FFF',
    fontWeight: '700',
  },
});
