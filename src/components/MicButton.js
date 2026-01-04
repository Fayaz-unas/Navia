// components/MicButton.js
import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';

export default function MicButton({ isListening, onStartListening, onStopListening }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
        isListening && styles.buttonListening
      ]}
      onPressIn={onStartListening}
      onPressOut={onStopListening}
    >
      <Text style={styles.icon}>🎤</Text>
      <Text style={styles.text}>Hold to Speak</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFD700',
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  buttonPressed: {
    backgroundColor: '#FFC700',
  },
  buttonListening: {
    backgroundColor: '#FFB700',
  },
  icon: {
    fontSize: 40,
    marginBottom: 8,
  },
  text: {
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
  },
});