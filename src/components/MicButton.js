import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { COLORS } from '../utils/constants';

export default function MicButton() {
  return (
    <Pressable
      style={styles.button}
      onPressIn={() => console.log('Listening...')}
      onPressOut={() => console.log('Stopped')}
    >
      <Text style={styles.text}>🎤 Hold to Speak</Text>
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