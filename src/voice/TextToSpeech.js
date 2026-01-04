import * as Speech from 'expo-speech';

export function speak(text) {
  Speech.speak(text, {
    rate: 0.9,
    pitch: 1.0,
  });
}