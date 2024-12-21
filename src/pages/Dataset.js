import React, { useState, useRef, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { db, storage } from '../config/firebase';
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { 
  Upload, 
  Database, 
  X, 
  CheckCircle, 
  AlertCircle, 
  Search,
  Download,
  ExternalLink,
  Trash2
} from 'lucide-react';

const ALLOWED_EXTENSIONS = ['.json', '.jsonl', '.csv', '.xlsx', '.yaml', '.yml'];
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

const Dataset = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileDescription, setFileDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDescriptionInput, setShowDescriptionInput] = useState(false);
  const fileInputRef = useRef(null);
  const { user } = useAuth();

  // Fetch datasets from Firebase
  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const datasetsQuery = query(
          collection(db, 'datasets'),
          orderBy('uploadedAt', 'desc')
        );
        const querySnapshot = await getDocs(datasetsQuery);
        const datasetsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          // Convert Firebase Timestamp to string for display
          lastUpdated: doc.data().uploadedAt?.toDate().toLocaleDateString() || 'N/A'
        }));
        setDatasets(datasetsData);
      } catch (error) {
        console.error('Error fetching datasets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDatasets();
  }, []);

  // Filter datasets based on search and category
  const filteredDatasets = datasets.filter(dataset => {
    const matchesSearch = dataset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dataset.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || dataset.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Format file size for display
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
      
      // Validate file extension
      if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
        setUploadStatus({
          type: 'error',
          message: `File type not allowed. Allowed types: ${ALLOWED_EXTENSIONS.join(', ')}`
        });
        return;
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        setUploadStatus({
          type: 'error',
          message: 'File size must be less than 100MB'
        });
        return;
      }

      setSelectedFile(file);
      setShowDescriptionInput(true); // Show the description input
      setUploadStatus(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !user) return;

    setIsUploading(true);
    setUploadStatus(null);

    try {
      // Store metadata in Firestore
      const datasetRef = await addDoc(collection(db, 'datasets'), {
        name: selectedFile.name,
        userId: user.uid,
        userEmail: user.email,
        fileSize: selectedFile.size,
        fileType: '.' + selectedFile.name.split('.').pop().toLowerCase(),
        uploadedAt: serverTimestamp(),
        description: fileDescription, // Save the description
        status: 'pending', // Since we don't have actual file storage yet
        downloads: 0,
        visibility: 'public',
        tags: []
      });

      // Fetch the newly added dataset
      const newDataset = {
        id: datasetRef.id,
        name: selectedFile.name,
        userId: user.uid,
        userEmail: user.email,
        fileSize: selectedFile.size,
        fileType: '.' + selectedFile.name.split('.').pop().toLowerCase(),
        uploadedAt: new Date().toLocaleDateString(), // Set the current date
        description: fileDescription,
        status: 'pending',
        downloads: 0,
        visibility: 'public',
        tags: []
      };

      setDatasets([newDataset, ...datasets]); // Add the new dataset to the state

      setUploadStatus({
        type: 'success',
        message: 'Dataset metadata saved successfully! (Note: actual file storage coming soon)'
      });
      setSelectedFile(null);
      setFileDescription(''); // Clear the description input
      setShowDescriptionInput(false); // Hide the description input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus({
        type: 'error',
        message: 'Error saving dataset metadata. Please try again.'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (datasetId) => {
    try {
      await deleteDoc(doc(db, 'datasets', datasetId));
      setDatasets(datasets.filter(dataset => dataset.id !== datasetId));
    } catch (error) {
      console.error('Error deleting dataset:', error);
    }
  };

  const handleDownload = (dataset) => {
    // Simulate file download
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(dataset)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `${dataset.name}.json`;
    document.body.appendChild(element);
    element.click();
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
                accept=".json,.jsonl,.csv,.xlsx,.yaml,.yml"
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

          {/* Description Input */}
          {showDescriptionInput && (
            <div className="mt-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <input
                type="text"
                id="description"
                value={fileDescription}
                onChange={(e) => setFileDescription(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter a description for the dataset"
              />
            </div>
          )}

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
                  setShowDescriptionInput(false); // Hide the description input
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

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading datasets...</p>
          </div>
        ) : (
          /* Datasets Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDatasets.map((dataset) => (
              <div
                key={dataset.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {dataset.name}
                    </h3>
                    <p className="text-sm text-gray-600">{dataset.fileType}</p>
                  </div>
                  <Database className="text-blue-500" />
                </div>
                
                <p className="text-gray-600 mb-4">
                  {dataset.description || 'No description provided'}
                </p>
                
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
                  <div>Size: {formatFileSize(dataset.fileSize)}</div>
                  <div>Format: {dataset.fileType}</div>
                  <div>Updated: {dataset.lastUpdated}</div>
                  <div>Downloads: {dataset.downloads}</div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Uploaded by: {dataset.userEmail}
                  </span>
                  <div className="space-x-2">
                    <button 
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                      title="Download dataset"
                      onClick={() => handleDownload(dataset)}
                    >
                      <Download className="w-5 h-5" />
                    </button>
                    <button 
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                      title="View details"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </button>
                    <button
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                      title="Delete dataset"
                      onClick={() => handleDelete(dataset.id)}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results Message */}
        {!loading && filteredDatasets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No datasets found matching your criteria.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dataset;
