import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';

const Test = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    try {
      // Implement your file upload logic here
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated upload
      setUploadStatus('success');
    } catch (error) {
      setUploadStatus('error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Increased padding-top to 24 (pt-24) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Test Your Model
            </h1>
            <p className="text-xl text-gray-600">
              Upload your dataset for model evaluation
            </p>
          </div>

          {/* Upload Section */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                type="file"
                className="hidden"
                id="file-upload"
                onChange={handleFileSelect}
                accept=".json,.csv,.txt"
              />
              
              <div className="space-y-4">
                <div className="flex justify-center">
                  <Upload className="h-12 w-12 text-gray-400" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    Upload your test dataset
                  </h3>
                  <p className="text-gray-500">
                    Drag and drop your file here, or click to select
                  </p>
                </div>
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                >
                  Select File
                </label>
              </div>
            </div>

            {selectedFile && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="text-blue-500" />
                  <span className="font-medium">{selectedFile.name}</span>
                  <span className="text-gray-500">
                    ({Math.round(selectedFile.size / 1024)} KB)
                  </span>
                </div>
              </div>
            )}

            {uploadStatus && (
              <div className={`mt-4 p-4 rounded-lg ${
                uploadStatus === 'success' ? 'bg-green-50' : 'bg-red-50'
              }`}>
                <div className="flex items-center space-x-3">
                  {uploadStatus === 'success' ? (
                    <CheckCircle className="text-green-500" />
                  ) : (
                    <AlertCircle className="text-red-500" />
                  )}
                  <span className={uploadStatus === 'success' ? 'text-green-700' : 'text-red-700'}>
                    {uploadStatus === 'success' 
                      ? 'File uploaded successfully!' 
                      : 'Error uploading file. Please try again.'}
                  </span>
                </div>
              </div>
            )}

            <div className="mt-6">
              <button
                onClick={handleUpload}
                disabled={!selectedFile || uploading}
                className={`w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white 
                  ${!selectedFile || uploading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  }`}
              >
                {uploading ? 'Uploading...' : 'Start Test'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Test;
