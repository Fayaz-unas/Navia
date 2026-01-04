import Voice from '@react-native-voice/voice';

export function startListening(onResult) {
  Voice.onSpeechStart = () => {
    console.log('🎙️ STT: Speech started');
  };

  Voice.onSpeechResults = (event) => {
    const text = event.value?.[0];
    console.log('✅ STT RESULT:', text);   // 👈 THIS MUST APPEAR ON LAPTOP
    if (onResult && text) {
      onResult(text);
    }
  };

  Voice.onSpeechError = (e) => {
    console.log('❌ STT ERROR:', e);
  };

  Voice.start('en-US');
}

export function stopListening() {
  Voice.stop();
  console.log('🛑 STT stopped');
}