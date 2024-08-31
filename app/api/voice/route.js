import { transcribeAudio } from '../../../lib/speechToText';

export async function POST(request) {
  try {
    const audioBuffer = Buffer.from(await request.arrayBuffer());
    const transcription = await transcribeAudio(audioBuffer);
    // Process transcription to manage tasks
    // Implement command interpretation logic
    return new Response(JSON.stringify({ transcription }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
