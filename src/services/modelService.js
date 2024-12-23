import { collection, addDoc, updateDoc, doc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';

const MODELS_COLLECTION = 'models';

export const addModel = async (modelData) => {
  try {
    const docRef = await addDoc(collection(db, MODELS_COLLECTION), {
      ...modelData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding model:', error);
    throw error;
  }
};

export const updateModelScore = async (modelId, evaluationData) => {
  try {
    const modelRef = doc(db, MODELS_COLLECTION, modelId);
    await updateDoc(modelRef, {
      ...evaluationData,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error('Error updating model score:', error);
    throw error;
  }
};

export const getModels = async () => {
  try {
    const q = query(collection(db, MODELS_COLLECTION), orderBy('averageScore', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error getting models:', error);
    throw error;
  }
}; 