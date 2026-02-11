import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { selectGenerationModel } from '@/lib/genModel';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    const { topic } = await request.json();
    const model = await selectGenerationModel(genAI);
    const prompt = `Provide 5 smart study suggestions and tips for learning about: ${topic}. Be specific and actionable.`;
    const result = await model.generateContent(prompt);
    const suggestions = result.response.text();

    return NextResponse.json({ suggestions });
  } catch (error) {
    return NextResponse.json(
      { 
        error: error.message, 
        details: error.toString() 
      }, 
      { status: 500 }
    );
  }
}
