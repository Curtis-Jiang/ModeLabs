export const MODEL_TYPES = {
  LARGE_LANGUAGE: 'Large Language',
  MULTIMODAL: 'Multimodal',
};

export const MODEL_LICENSES = {
  COMMERCIAL: 'Commercial',
  OPEN_SOURCE: 'Open Source',
};

export const INITIAL_MODELS = [
  {
    name: 'llava-v1.6-34b',
    type: MODEL_TYPES.MULTIMODAL,
    license: MODEL_LICENSES.OPEN_SOURCE,
    organization: 'LLaVA',
    description: 'Large Language and Vision Assistant',
    apiEndpoint: process.env.REACT_APP_LLAVA_API_ENDPOINT,
    apiKey: process.env.REACT_APP_LLAVA_API_KEY,
    parameters: {
      maxTokens: 2048,
      temperature: 0.7,
      topP: 0.9,
    },
    capabilities: ['text', 'vision'],
    evaluationMetrics: {
      averageScore: 0,
      math: 0,
      code: 0,
      vision: 0,
    },
    votes: 0,
  },
]; 