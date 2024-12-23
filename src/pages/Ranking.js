import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { Search, Star, TrendingUp, Award, ArrowUpRight, X } from 'lucide-react';
import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

const Leaderboard = () => {
    const [activeTab, setActiveTab] = useState('Large Language');
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newModel, setNewModel] = useState({
        model_name: '',
        model_type: 'Large Language',
        api_url: '',
        api_token: '',
        description: '',
    });

    const fetchData = async () => {
        try {
            let response;
            if (activeTab === 'Large Language') {
                response = await axios.get('http://localhost:3001/api/language-model-rankings');
            } else if (activeTab === 'Multimodal') {
                response = await axios.get('http://localhost:3001/api/multimodal-model-rankings');
            }
            const rankedData = response.data.map((item, index) => ({
                ...item,
                rank: index + 1
            }));
            console.log('Ranked data:', rankedData);
            setData(rankedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const getRankColor = (rank) => {
        if (rank === 1) return 'text-yellow-500';
        if (rank === 2) return 'text-gray-500';
        if (rank === 3) return 'text-amber-600';
        return 'text-gray-800';
    };

    const getRankIcon = (rank) => {
        if (rank === 1) return <Award className="w-5 h-5 text-yellow-500" />;
        if (rank === 2) return <Award className="w-5 h-5 text-gray-500" />;
        if (rank === 3) return <Award className="w-5 h-5 text-amber-600" />;
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const collectionName = newModel.model_type === 'Large Language' 
                ? 'language-models' 
                : 'multimodal-models';
            
            const modelData = {
                ...newModel,
                updated_at: new Date().toISOString().split('T')[0],
            };

            await addDoc(collection(db, collectionName), modelData);
            setIsModalOpen(false);
            setNewModel({
                model_name: '',
                model_type: 'Large Language',
                api_url: '',
                api_token: '',
                description: '',
            });
            fetchData();
        } catch (error) {
            console.error('Error adding new model:', error);
            alert('Failed to add new model');
        }
    };

    return (
        <div className="relative z-10 py-28 px-6 lg:px-32">
            <div className="absolute inset-0 bg-gradient-to-b from-violet-50 via-white to-blue-50 -z-10" />
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-6xl font-bold bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent mb-6">
                        Model Leaderboard
                    </h2>
                    <p className="text-xl text-gray-600 flex items-center justify-center space-x-2 mb-8">
                        <TrendingUp className="w-5 h-5" />
                        <span>2024 March Rankings</span>
                    </p>
                    <div className="max-w-2xl mx-auto bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-gray-200 shadow-sm">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input 
                                type="text"
                                placeholder="Search models..."
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-center space-x-4 mb-10">
                    {['Large Language', 'Multimodal'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 rounded-xl text-lg font-medium transition-all duration-300 ${
                                activeTab === tab 
                                ? 'bg-gradient-to-r from-violet-600 to-blue-500 text-white shadow-lg transform scale-105' 
                                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="overflow-x-auto border border-gray-200 rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm mb-8">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-50/80">
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">RANK</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">NAME</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">UPDATE</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">OVERALL SCORE</th>
                                {activeTab === 'Large Language' && (
                                    <>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">MATHEMATICS</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">CODING</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">KNOWLEDGE USAGE</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">ORGANIZATION</th>
                                    </>
                                )}
                                {activeTab === 'Multimodal' && (
                                    <>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">VISUAL RECOGNITION</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">AUDIO PROCESSING</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">TEXT UNDERSTANDING</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">INTEGRATION</th>
                                    </>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((model, index) => (
                                <tr key={index} className="hover:bg-blue-50/50 transition-colors border-t border-gray-100 group">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center space-x-2">
                                            {getRankIcon(model.rank)}
                                            <span className={`font-semibold ${getRankColor(model.rank)}`}>{model.rank}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center space-x-2">
                                            <Star className="w-4 h-4 text-blue-500" />
                                            <span className="text-blue-600 font-medium group-hover:text-blue-800 cursor-pointer">{model.model_name}</span>
                                            {model.rank <= 3 && <ArrowUpRight className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{model.updated_at}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="font-medium text-emerald-600">{model.overall_score}</span>
                                    </td>
                                    {activeTab === 'Large Language' && (
                                        <>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{model.mathematics}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{model.coding}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{model.knowledge_usage}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{model.organization}</td>
                                        </>
                                    )}
                                    {activeTab === 'Multimodal' && (
                                        <>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{model.visual_recognition}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{model.audio_processing}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{model.text_understanding}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{model.integration}</td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between items-center text-gray-500 text-sm">
                    <span className="flex items-center space-x-2">
                        <Star className="w-4 h-4" />
                        <span>Based on Modelabs 1.0</span>
                    </span>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        ADD NEW Model →
                    </button>
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold text-gray-800">Add New Model</h3>
                                <button 
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Model Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={newModel.model_name}
                                            onChange={(e) => setNewModel({...newModel, model_name: e.target.value})}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Model Type
                                        </label>
                                        <select
                                            value={newModel.model_type}
                                            onChange={(e) => setNewModel({...newModel, model_type: e.target.value})}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="Large Language">Large Language</option>
                                            <option value="Multimodal">Multimodal</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            API URL
                                        </label>
                                        <input
                                            type="url"
                                            required
                                            value={newModel.api_url}
                                            onChange={(e) => setNewModel({...newModel, api_url: e.target.value})}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            API Token
                                        </label>
                                        <input
                                            type="password"
                                            required
                                            value={newModel.api_token}
                                            onChange={(e) => setNewModel({...newModel, api_token: e.target.value})}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Model Description
                                    </label>
                                    <textarea
                                        required
                                        value={newModel.description}
                                        onChange={(e) => setNewModel({...newModel, description: e.target.value})}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        rows="3"
                                        placeholder="Enter a brief description of the model..."
                                    />
                                </div>

                                <div className="flex justify-end space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        Add Model
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const RankingPage = () => {
    return (
        <Layout>
            <Leaderboard />
        </Layout>
    );
};

export default RankingPage;