import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { addModel, getModels, updateModelScore } from '../services/modelService';
import { MODEL_TYPES, MODEL_LICENSES } from '../config/modelConfig';

const ModelManagement = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddingModel, setIsAddingModel] = useState(false);
  const [newModel, setNewModel] = useState({
    name: '',
    type: MODEL_TYPES.LARGE_LANGUAGE,
    license: MODEL_LICENSES.OPEN_SOURCE,
    organization: '',
    description: '',
    apiEndpoint: '',
    apiKey: '',
    parameters: {
      maxTokens: 2048,
      temperature: 0.7,
      topP: 0.9,
    },
    capabilities: [],
    evaluationMetrics: {
      averageScore: 0,
      math: 0,
      code: 0,
      vision: 0,
    },
    votes: 0,
  });

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    try {
      const modelData = await getModels();
      setModels(modelData);
    } catch (error) {
      console.error('Error fetching models:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddModel = async (e) => {
    e.preventDefault();
    try {
      await addModel(newModel);
      setIsAddingModel(false);
      setNewModel({
        name: '',
        type: MODEL_TYPES.LARGE_LANGUAGE,
        license: MODEL_LICENSES.OPEN_SOURCE,
        organization: '',
        description: '',
        apiEndpoint: '',
        apiKey: '',
        parameters: {
          maxTokens: 2048,
          temperature: 0.7,
          topP: 0.9,
        },
        capabilities: [],
        evaluationMetrics: {
          averageScore: 0,
          math: 0,
          code: 0,
          vision: 0,
        },
        votes: 0,
      });
      fetchModels();
    } catch (error) {
      console.error('Error adding model:', error);
    }
  };

  const handleUpdateScore = async (modelId) => {
    try {
      const model = models.find(m => m.id === modelId);
      if (!model) return;

      // Here you would typically run your evaluation tasks
      // For now, we'll just update with random scores as an example
      const newScores = {
        evaluationMetrics: {
          averageScore: Math.random() * 100,
          math: Math.random() * 100,
          code: Math.random() * 100,
          vision: Math.random() * 100,
        }
      };

      await updateModelScore(modelId, newScores);
      fetchModels();
    } catch (error) {
      console.error('Error updating model score:', error);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Model Management</h1>
          <button
            onClick={() => setIsAddingModel(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add New Model
          </button>
        </div>

        {isAddingModel && (
          <div className="mb-8 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Add New Model</h2>
            <form onSubmit={handleAddModel} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={newModel.name}
                  onChange={(e) => setNewModel({...newModel, name: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  value={newModel.type}
                  onChange={(e) => setNewModel({...newModel, type: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  {Object.values(MODEL_TYPES).map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Organization</label>
                <input
                  type="text"
                  value={newModel.organization}
                  onChange={(e) => setNewModel({...newModel, organization: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">API Endpoint</label>
                <input
                  type="text"
                  value={newModel.apiEndpoint}
                  onChange={(e) => setNewModel({...newModel, apiEndpoint: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">API Key</label>
                <input
                  type="password"
                  value={newModel.apiKey}
                  onChange={(e) => setNewModel({...newModel, apiKey: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={newModel.description}
                  onChange={(e) => setNewModel({...newModel, description: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows="3"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAddingModel(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Model
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white shadow overflow-hidden rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Average Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {models.map((model) => (
                <tr key={model.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{model.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{model.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{model.organization}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {model.evaluationMetrics?.averageScore?.toFixed(2) || '0.00'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => handleUpdateScore(model.id)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Run Evaluation
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default ModelManagement; 