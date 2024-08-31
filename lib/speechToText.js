import speech from '@google-cloud/speech';

const client = new speech.SpeechClient();

export async function transcribeAudio(audioBuffer) {
  const request = {
    audio: { content: audioBuffer.toString('base64') },
    config: {
      encoding: 'LINEAR16',
      sampleRateHertz: 16000,
      languageCode: 'en-US',
    },
  };

  const [response] = await client.recognize(request);
  const transcription = response.results.map(result => result.alternatives[0].transcript).join(' ');
  return transcription;
}
