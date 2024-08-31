import { OpenAI } from 'openai';

const openai = new OpenAI(process.env.OPENAI_API_KEY);

export async function analyzeTasks(tasks) {
  const response = await openai.completions.create({
    model: 'text-davinci-003',
    prompt: `Analyze and prioritize the following tasks: ${tasks.join(', ')}`,
    max_tokens: 150,
  });
  return response.choices[0].text.trim();
}

export async function recommendTasks(tasks) {
  const response = await openai.completions.create({
    model: 'text-davinci-003',
    prompt: `Suggest new tasks or re-prioritize these: ${tasks.join(', ')}`,
    max_tokens: 150,
  });
  return response.choices[0].text.trim();
}
