import React, { useState, useRef } from 'react';
import { Layout } from '../components/Layout';
import { Search, Database, Download, ExternalLink, Upload, X, CheckCircle, AlertCircle } from 'lucide-react';
import { storage } from '../config/firebase'; // Make sure to configure Firebase storage
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuth } from '../contexts/AuthContext';

const Dataset = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const { user } = useAuth();

  const datasets = [
    {
      id: 1,
      name: "MMLU",
      description: "Massive Multitask Language Understanding",
      category: "Language Understanding",
      size: "15.5GB",
      format: "JSON",
      lastUpdated: "2024-03-15",
      downloads: 12500,
      license: "MIT"
    },
    {
      id: 2,
      name: "GSM8K",
      description: "Grade School Math 8K",
      category: "Mathematics",
      size: "2.3GB",
      format: "JSON",
      lastUpdated: "2024-03-10",
      downloads: 8900,
      license: "Apache 2.0"
    },
    // Add more datasets as needed
  ];

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) { // 100MB limit
        setUploadStatus({
          type: 'error',
          message: 'File size must be less than 100MB'
        });
        return;
      }
      setSelectedFile(file);
      setUploadStatus(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !user) return;

    setIsUploading(true);
    setUploadStatus(null);

    try {
      // Create a reference to the file in Firebase Storage
      const storageRef = ref(storage, `datasets/${user.uid}/${selectedFile.name}`);
      
      // Upload the file
      await uploadBytes(storageRef, selectedFile);
      
      // Get the download URL
      const downloadURL = await getDownloadURL(storageRef);

      // Here you would typically also save the dataset metadata to your database
      // await saveDatasetMetadata({
      //   name: selectedFile.name,
      //   userId: user.uid,
      //   downloadURL,
      //   size: selectedFile.size,
      //   uploadDate: new Date().toISOString(),
      //   // ... other metadata
      // });

      setUploadStatus({
        type: 'success',
        message: 'Dataset uploaded successfully!'
      });
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus({
        type: 'error',
        message: 'Error uploading dataset. Please try again.'
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Model Evaluation Datasets
          </h1>
          <p className="text-xl text-gray-600">
            Comprehensive datasets for evaluating language models
          </p>
        </div>

        {/* Upload Section */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Upload New Dataset</h3>
              <p className="text-gray-600 text-sm">
                Share your dataset with the community. Maximum file size: 100MB
              </p>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
                accept=".json,.csv,.txt,.jsonl"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
              >
                Select File
              </button>
              <button
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  !selectedFile || isUploading
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white`}
              >
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>Upload</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Selected File Info */}
          {selectedFile && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-600">{selectedFile.name}</span>
                <span className="text-xs text-gray-500">
                  ({Math.round(selectedFile.size / 1024)} KB)
                </span>
              </div>
              <button
                onClick={() => {
                  setSelectedFile(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Upload Status */}
          {uploadStatus && (
            <div className={`mt-4 p-4 rounded-lg flex items-center gap-2 ${
              uploadStatus.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}>
              {uploadStatus.type === 'success' ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              <span>{uploadStatus.message}</span>
            </div>
          )}
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search datasets..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border rounded-lg bg-white"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option>All Categories</option>
            <option>Language Understanding</option>
            <option>Mathematics</option>
            <option>Coding</option>
            <option>Reasoning</option>
          </select>
        </div>

        {/* Datasets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {datasets.map((dataset) => (
            <div
              key={dataset.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {dataset.name}
                  </h3>
                  <p className="text-sm text-gray-600">{dataset.category}</p>
                </div>
                <Database className="text-blue-500" />
              </div>
              
              <p className="text-gray-600 mb-4">{dataset.description}</p>
              
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
                <div>Size: {dataset.size}</div>
                <div>Format: {dataset.format}</div>
                <div>Updated: {dataset.lastUpdated}</div>
                <div>Downloads: {dataset.downloads}</div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{dataset.license}</span>
                <div className="space-x-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full">
                    <Download className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full">
                    <ExternalLink className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Dataset;
