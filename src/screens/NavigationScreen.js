// screens/NavigationScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { CameraView } from 'expo-camera';
import MicButton from '../components/MicButton';
import VoiceOverlay from '../components/VoiceOverlay';

export default function NavigationScreen() {
  const [isListening, setIsListening] = useState(false);
  const [instruction, setInstruction] = useState("Head north on Main St.\nTurn right in 100m.");

  const handleStartListening = () => {
    setIsListening(true);
    console.log('Listening...');
  };

  const handleStopListening = () => {
    setIsListening(false);
    console.log('Stopped');
  };

  return (
    <View style={styles.container}>
      {/* Camera View */}
      <CameraView style={styles.camera} facing="back">
        {/* Instruction Overlay */}
        <SafeAreaView style={styles.overlayContainer}>
          <VoiceOverlay text={instruction} />
        </SafeAreaView>
      </CameraView>

      {/* Mic Button */}
      <MicButton
        isListening={isListening}
        onStartListening={handleStartListening}
        onStopListening={handleStopListening}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  overlayContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});