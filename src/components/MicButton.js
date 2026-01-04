import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { COLORS } from '../utils/constants';

export default function MicButton({
  isListening,
  onStartListening,
  onStopListening,
}) {
  return (
    <Pressable
      style={styles.button}
      onPressIn={onStartListening}
      onPressOut={onStopListening}
    >
      <Text style={styles.text}>
        {isListening ? '🎤 Listening…' : '🎤 Hold to Speak'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    padding: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});