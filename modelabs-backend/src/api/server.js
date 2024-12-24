const express = require('express');
const cors = require('cors');
const { evaluateModel } = require('../services/evaluation_service');
const admin = require('firebase-admin');
const datasetRoutes = require('../routes/datasetRoutes');

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS for frontend requests
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Dataset routes
app.use('/api/datasets', datasetRoutes);

// API endpoint to trigger model evaluation
app.post('/api/evaluate', async (req, res) => {
    try {
        const { modelId, modelType } = req.body;
        
        if (!modelId || !modelType) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        // Get model data from Firebase
        const collectionName = modelType === 'Large Language' ? 'language-models' : 'multimodal-models';
        const modelDoc = await admin.firestore().collection(collectionName).doc(modelId).get();

        if (!modelDoc.exists) {
            return res.status(404).json({ error: 'Model not found' });
        }

        const modelData = {
            ...modelDoc.data(),
            id: modelDoc.id,
            model_type: modelType
        };

        // Start evaluation in background
        evaluateModel(modelData).catch(error => {
            console.error('Error during model evaluation:', error);
        });

        // Return success immediately
        res.json({ message: 'Evaluation started' });
    } catch (error) {
        console.error('Error handling evaluation request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app; 