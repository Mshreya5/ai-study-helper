import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { selectGenerationModel } from '@/lib/genModel';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function createPrompt(studyText, actionType) {
  const prompts = {
    summary: `Summarize the following study notes in a clear, concise manner. Focus on key concepts and main ideas:\n\n${studyText}`,
    explain: `Explain the following content in simple terms suitable for an interested beginner, including examples where helpful:\n\n${studyText}`,
    questions: `Generate 5 short quiz questions (with short answers) based on the following content. Return as plain text with each question and answer separated by a blank line:\n\n${studyText}`,
  };

  return prompts[actionType] || prompts.summary;
}

export async function POST(request) {
  try {
    const { text: studyText, type: actionType } = await request.json();
    const model = await selectGenerationModel(genAI);
    const prompt = createPrompt(studyText, actionType);
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return NextResponse.json({ 
      success: true, 
      response: responseText 
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to generate content' 
      }, 
      { status: 500 }
    );
  }
}
