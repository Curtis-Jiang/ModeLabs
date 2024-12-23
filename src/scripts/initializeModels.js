import { addModel } from '../services/modelService';
import { INITIAL_MODELS } from '../config/modelConfig';

const initializeModels = async () => {
  try {
    for (const model of INITIAL_MODELS) {
      await addModel(model);
      console.log(`Successfully initialized model: ${model.name}`);
    }
    console.log('All models initialized successfully');
  } catch (error) {
    console.error('Error initializing models:', error);
  }
};

// Run the initialization
initializeModels(); 