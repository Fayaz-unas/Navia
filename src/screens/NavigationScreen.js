import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MicButton from '../components/MicButton';
import VoiceOverlay from '../components/VoiceOverlay';
import { COLORS } from '../utils/constants';

export default function NavigationScreen() {
  return (
    <View style={styles.container}>
      {/* Instruction text */}
      <VoiceOverlay text="Walk straight. Right turn ahead." />

      {/* Camera placeholder */}
      <View style={styles.cameraPlaceholder} />

      {/* Mic button */}
      <MicButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  cameraPlaceholder: {
    flex: 1,
    backgroundColor: '#222',
  },
});