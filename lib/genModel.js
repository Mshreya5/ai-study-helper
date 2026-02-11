import { GoogleGenerativeAI } from '@google/generative-ai';

async function attemptToListModels(genAI) {
  const methodsToTry = [
    () => genAI.listModels && genAI.listModels(),
    () => genAI.list_models && genAI.list_models(),
    () => genAI.getModels && genAI.getModels(),
    () => genAI.listModelsAsync && genAI.listModelsAsync()
  ];

  for (const method of methodsToTry) {
    try {
      const response = await method();
      if (response) {
        return response.models || response;
      }
    } catch (error) {
      continue;
    }
  }

  return null;
}

async function listModelsViaRestApi() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models?key=${encodeURIComponent(apiKey)}`
    );
    
    if (response.ok) {
      const data = await response.json();
      return data.models || data;
    }
  } catch (error) {
    return null;
  }
}

function findUsableModel(availableModels) {
  const generationMethods = ['generateContent', 'generateText', 'generate'];
  
  const modelWithMethod = availableModels.find(model => {
    const methods = model.supportedGenerationMethods || [];
    return methods.some(method => generationMethods.includes(method));
  });
  
  return modelWithMethod || availableModels[0];
}

function getModelName(modelObject) {
  return modelObject.name || modelObject.model || modelObject.displayName || modelObject.id;
}

export async function selectGenerationModel(genAI) {
  let availableModels = await attemptToListModels(genAI);

  if (!availableModels || !Array.isArray(availableModels) || availableModels.length === 0) {
    availableModels = await listModelsViaRestApi();
  }

  if (!availableModels || !Array.isArray(availableModels) || availableModels.length === 0) {
    throw new Error(
      'Unable to find generative models. Please ensure GEMINI_API_KEY is set and valid.'
    );
  }

  const selectedModel = findUsableModel(availableModels);
  const modelName = getModelName(selectedModel);
  
  if (!modelName) {
    throw new Error('No valid model name found in the model list');
  }

  return genAI.getGenerativeModel({ model: modelName });
}
