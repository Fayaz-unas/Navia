// screens/WelcomeScreen.js
import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable, 
  Animated,
  Alert 
} from 'react-native';
import { startListening, stopListening, requestPermissions } from '../voice/SpeechToText';
import { speak } from '../voice/TextToSpeech';

export default function WelcomeScreen({ onNavigate }) {
  const [isListening, setIsListening] = useState(false);
  const [destination, setDestination] = useState('');
  const [hasPermission, setHasPermission] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    async function setup() {
      const granted = await requestPermissions();
      setHasPermission(granted);
      
      if (granted) {
        // Welcome message
        setTimeout(() => {
          speak("Navia is ready. Tap and speak your destination.");
        }, 500);
      }
    }
    setup();
  }, []);

  useEffect(() => {
    // Pulsing animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Glow animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handlePressIn = async () => {
    if (!hasPermission) {
      Alert.alert('Permission Required', 'Please enable microphone access');
      return;
    }

    setIsListening(true);
    setDestination('');

    try {
      await startListening(
        // Final result
        (text) => {
          console.log('Final destination:', text);
        },
        // Partial results (real-time)
        (text) => {
          setDestination(text);
        },
        // Error
        (error) => {
          console.error('Speech error:', error);
          Alert.alert('Error', 'Could not recognize speech. Please try again.');
          setIsListening(false);
        }
      );
    } catch (error) {
      console.error('Error starting listening:', error);
      Alert.alert('Error', 'Failed to start voice recognition');
      setIsListening(false);
    }
  };

  const handlePressOut = async () => {
    setIsListening(false);
    
    try {
      await stopListening();
      
      // Wait a moment for final transcription
      setTimeout(async () => {
        if (destination && destination.trim()) {
          await speak(`Navigating to ${destination}`);
          
          // Navigate after speech completes
          setTimeout(() => {
            onNavigate(destination);
          }, 2000);
        } else {
          await speak("I didn't catch that. Please try again.");
          setDestination('');
        }
      }, 300);
    } catch (error) {
      console.error('Error stopping listening:', error);
    }
  };

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.8],
  });

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Navia is Ready</Text>

      {/* Mic Button Container */}
      <Pressable
        style={styles.micContainer}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {/* Outer glow ring */}
        <Animated.View 
          style={[
            styles.glowRing,
            { 
              opacity: isListening ? 1 : glowOpacity,
              transform: [{ scale: pulseAnim }]
            }
          ]}
        >
          <View style={[
            styles.glowRingInner,
            isListening && styles.glowRingListening
          ]} />
        </Animated.View>

        {/* Main circle */}
        <Animated.View style={styles.circle}>
          {/* Mic Icon */}
          <View style={styles.micIcon}>
            <View style={[
              styles.micTop, 
              isListening && styles.micActive
            ]} />
            <View style={[
              styles.micBody,
              isListening && styles.micBodyActive
            ]} />
            <View style={[
              styles.micStand,
              isListening && styles.micActive
            ]} />
          </View>
        </Animated.View>
      </Pressable>

      {/* Instruction/Destination Text */}
      {destination ? (
        <View style={styles.textContainer}>
          <Text style={styles.destinationLabel}>Destination:</Text>
          <Text style={styles.destinationText}>{destination}</Text>
        </View>
      ) : (
        <View style={styles.textContainer}>
          <Text style={styles.instruction}>
            {isListening ? 'Listening...' : 'Tap and Speak'}
          </Text>
          <Text style={styles.subtitle}>Destination</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 80,
    letterSpacing: 0.5,
  },
  micContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60,
  },
  glowRing: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowRingInner: {
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 12,
    borderColor: '#FFD700',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 30,
    elevation: 8,
  },
  glowRingListening: {
    borderColor: '#FF4444',
    shadowColor: '#FF4444',
  },
  circle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#1a1a1a',
    borderWidth: 8,
    borderColor: '#FFD700',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
  },
  micIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  micTop: {
    width: 36,
    height: 50,
    backgroundColor: '#FFD700',
    borderRadius: 18,
    marginBottom: 8,
  },
  micActive: {
    backgroundColor: '#FF4444',
  },
  micBody: {
    width: 50,
    height: 20,
    borderWidth: 4,
    borderColor: '#FFD700',
    borderTopWidth: 0,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginBottom: 4,
  },
  micBodyActive: {
    borderColor: '#FF4444',
  },
  micStand: {
    width: 4,
    height: 16,
    backgroundColor: '#FFD700',
    borderRadius: 2,
  },
  textContainer: {
    alignItems: 'center',
  },
  instruction: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    letterSpacing: -1,
  },
  destinationLabel: {
    fontSize: 24,
    fontWeight: '600',
    color: '#999',
    textAlign: 'center',
    marginBottom: 12,
  },
  destinationText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});