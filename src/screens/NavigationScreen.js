// screens/NavigationScreen.js
import { startListening, stopListening } from '../voice/SpeechToText';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { CameraView } from 'expo-camera';
import MicButton from '../components/MicButton';
import VoiceOverlay from '../components/VoiceOverlay';
import { speak } from '../voice/TextToSpeech';

export default function NavigationScreen() {
  const [isListening, setIsListening] = useState(false);
  const [instruction, setInstruction] = useState(
    "Head north on Main St.\nTurn right in 100m."
  );

  // Optional: speak when instruction changes
  useEffect(() => {
    speak(instruction);
  }, []);

  const handleStartListening = () => {
  setIsListening(true);

  startListening((text) => {
    setInstruction(text);   // 👈 show on screen
    speak(text);            // 👈 speak it
  });
};

const handleStopListening = () => {
  setIsListening(false);
  stopListening();
};

  return (
    <View style={styles.container}>
      {/* Camera MUST be standalone */}
      <CameraView style={StyleSheet.absoluteFill} facing="back" />

      {/* Instruction Overlay */}
      <SafeAreaView style={styles.overlayContainer}>
        <VoiceOverlay text={instruction} />
      </SafeAreaView>

      {/* Mic Button Overlay */}
      <View style={styles.micContainer}>
        <MicButton
          isListening={isListening}
          onStartListening={handleStartListening}
          onStopListening={handleStopListening}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  micContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});