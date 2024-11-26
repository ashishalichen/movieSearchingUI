import OpenAI from 'openai';
import { OPEN_AI_KEY } from './constant';

const openAI = new OpenAI({
  apiKey: OPEN_AI_KEY, // defaults to process.env["OPENAI_API_KEY"]
  dangerouslyAllowBrowser: true
});

export default openAI;