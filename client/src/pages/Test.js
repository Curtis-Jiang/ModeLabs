import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { CheckCircle, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import { db } from '../config/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Test = () => {
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [models, setModels] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch models from Firebase
  const fetchModels = async () => {
    try {
      const languageModelsQuery = query(collection(db, 'language-models'), orderBy('model_name'));
      const multimodalModelsQuery = query(collection(db, 'multimodal-models'), orderBy('model_name'));

      const [languageSnapshot, multimodalSnapshot] = await Promise.all([
        getDocs(languageModelsQuery),
        getDocs(multimodalModelsQuery)
      ]);

      const languageModels = languageSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        type: 'Large Language'
      }));

      const multimodalModels = multimodalSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        type: 'Multimodal'
      }));

      setModels([...languageModels, ...multimodalModels]);
    } catch (error) {
      console.error('Error fetching models:', error);
      setError('Failed to load models');
    }
  };

  // Fetch datasets from backend
  const fetchDatasets = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/datasets');
      const data = await response.json();
      setDatasets(data);
    } catch (error) {
      console.error('Error fetching datasets:', error);
      setError('Failed to load datasets');
    }
  };

  useEffect(() => {
    fetchModels();
    fetchDatasets();
  }, []);

  const handleStartTest = async () => {
    if (!selectedModel || !selectedDataset) {
      setError('请选择模型和数据集');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      console.log('Selected model:', selectedModel);
      console.log('Selected dataset:', selectedDataset);

      const response = await fetch('http://localhost:3001/api/evaluation/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          modelId: selectedModel.id,
          modelType: selectedModel.type,
          datasetId: selectedDataset.id
        }),
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        // 评测任务创建成功后，跳转到评测列表页面
        navigate('/evaluation');
      } else {
        setError(data.message || '启动评测失败');
      }
    } catch (error) {
      console.error('Error starting test:', error);
      setError('启动评测时发生错误');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Test Your Model
            </h1>
            <p className="text-xl text-gray-600">
              Select a model and dataset for evaluation
            </p>
          </div>

          {/* Model Selection Section */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Select Model</h2>
            <div className="grid grid-cols-2 gap-4">
              {models.map((model) => (
                <button
                  key={model.id}
                  onClick={() => setSelectedModel(model)}
                  className={`group relative p-6 rounded-xl border ${
                    selectedModel?.id === model.id
                      ? 'border-violet-500 bg-violet-50/30'
                      : 'border-slate-200 hover:border-violet-200 hover:bg-slate-50'
                  } transition-all duration-200`}
                >
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-slate-900 text-left line-clamp-2">
                          {model.model_name}
                        </h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 mt-2 rounded-full text-xs font-medium ${
                          selectedModel?.id === model.id
                            ? 'bg-violet-100 text-violet-800'
                            : 'bg-slate-100 text-slate-700'
                        }">
                          {model.type}
                        </span>
                      </div>
                      {selectedModel?.id === model.id && (
                        <CheckCircle className="h-5 w-5 text-violet-500 shrink-0" />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Dataset Selection Section */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Dataset</h2>
            <div className="grid grid-cols-1 gap-4">
              {datasets.map((dataset) => (
                <button
                  key={dataset.id}
                  onClick={() => setSelectedDataset(dataset)}
                  disabled={!selectedModel}
                  className={`p-4 rounded-lg border ${
                    !selectedModel
                      ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-50'
                      : selectedDataset?.id === dataset.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  } transition-colors`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-900">{dataset.name}</h3>
                      <p className="text-sm text-gray-500">{dataset.type}</p>
                    </div>
                    {selectedDataset?.id === dataset.id && (
                      <CheckCircle className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertCircle className="text-red-500" />
                <span className="text-red-700">{error}</span>
              </div>
            </div>
          )}

          <div className="mt-6">
            <button
              onClick={handleStartTest}
              disabled={!selectedModel || !selectedDataset || loading}
              className={`w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white 
                ${!selectedModel || !selectedDataset || loading
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                }`}
            >
              {loading ? '评测进行中...' : '开始评测'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Test;
