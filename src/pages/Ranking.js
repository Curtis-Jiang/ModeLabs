import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Menu, Search, Star, TrendingUp, Award, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
    ChevronRight, 
    Brain, 
    Database, 
    TestTube, 
    UserCircle2, 
    Sparkles,
    Mail, 
    Github, 
    Twitter, 
    Linkedin, 
    Youtube, 
    Instagram, 
    Globe,
    Heart,
    MessagesSquare as Discord
  } from 'lucide-react';

const NavButton = ({ icon: Icon, label, isActive, onClick }) => {
    return (
      <button 
        onClick={onClick}
        className={`
          px-6 py-3 border transition-all duration-300 ease-in-out
          rounded-full flex items-center space-x-3 group
          hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] 
          ${isActive 
            ? 'border-blue-500 text-blue-500 bg-blue-50 shadow-[0_0_25px_rgba(59,130,246,0.3)]' 
            : 'border-black/20 text-black bg-white/90 hover:border-blue-400'}
        `}
      >
        <Icon className={`w-6 h-6 transition-transform duration-300 group-hover:scale-125 ${isActive ? 'text-blue-500' : 'text-black/70'}`} />
        <span className="text-lg font-semibold tracking-wide">{label}</span>
      </button>
    );
  };
  
  const Leaderboard = () => {
      const [activeTab, setActiveTab] = useState('Large Language');
      const data = [
        {
            rank: 1,
            name: "Claude 3 Opus",
            update: "2024/03/15",
            averageScore: "92.8",
            math: "89.5",
            code: "94.2",
            votes: 28547,
            license: "Commercial",
            organization: "Anthropic"
          },
          {
            rank: 2,
            name: "GPT-4 Turbo",
            update: "2024/03/10",
            averageScore: "91.5",
            math: "88.7",
            code: "92.8",
            votes: 25831,
            license: "Commercial",
            organization: "OpenAI"
          },
          {
            rank: 3,
            name: "Gemini Ultra",
            update: "2024/02/28",
            averageScore: "90.2",
            math: "87.9",
            code: "91.5",
            votes: 23456,
            license: "Commercial",
            organization: "Google"
          },
          {
            rank: 4,
            name: "Claude 3 Sonnet",
            update: "2024/03/15",
            averageScore: "89.7",
            math: "86.4",
            code: "90.8",
            votes: 21987,
            license: "Commercial",
            organization: "Anthropic"
          },
          {
            rank: 5,
            name: "Llama 3",
            update: "2024/03/01",
            averageScore: "88.9",
            math: "85.2",
            code: "89.7",
            votes: 19876,
            license: "Open Source",
            organization: "Meta"
          },
          {
            rank: 6,
            name: "GPT-4",
            update: "2024/01/15",
            averageScore: "87.5",
            math: "84.8",
            code: "88.9",
            votes: 18965,
            license: "Commercial",
            organization: "OpenAI"
          },
          {
            rank: 7,
            name: "Claude 3 Haiku",
            update: "2024/03/15",
            averageScore: "86.9",
            math: "83.7",
            code: "87.5",
            votes: 17543,
            license: "Commercial",
            organization: "Anthropic"
          },
          {
            rank: 8,
            name: "Gemini Pro",
            update: "2024/02/28",
            averageScore: "86.4",
            math: "82.9",
            code: "86.8",
            votes: 16789,
            license: "Commercial",
            organization: "Google"
          },
          {
            rank: 9,
            name: "Mixtral 8x7B",
            update: "2024/02/20",
            averageScore: "85.8",
            math: "82.4",
            code: "86.2",
            votes: 15934,
            license: "Open Source",
            organization: "Mistral AI"
          },
          {
            rank: 10,
            name: "Yi-34B",
            update: "2024/02/15",
            averageScore: "85.2",
            math: "81.8",
            code: "85.7",
            votes: 14876,
            license: "Open Source",
            organization: "01.AI"
          },
          {
            rank: 11,
            name: "Mistral Large",
            update: "2024/03/01",
            averageScore: "84.7",
            math: "81.2",
            code: "85.1",
            votes: 13987,
            license: "Commercial",
            organization: "Mistral AI"
          },
          {
            rank: 12,
            name: "Qwen-72B",
            update: "2024/02/10",
            averageScore: "84.1",
            math: "80.7",
            code: "84.6",
            votes: 12845,
            license: "Open Source",
            organization: "Alibaba"
          },
          {
            rank: 13,
            name: "Deepseek 67B",
            update: "2024/02/05",
            averageScore: "83.6",
            math: "80.1",
            code: "84.2",
            votes: 11932,
            license: "Open Source",
            organization: "DeepSeek"
          },
          {
            rank: 14,
            name: "Mistral Medium",
            update: "2024/03/01",
            averageScore: "83.2",
            math: "79.8",
            code: "83.7",
            votes: 10876,
            license: "Commercial",
            organization: "Mistral AI"
          },
          {
            rank: 15,
            name: "GPT-3.5 Turbo",
            update: "2024/01/15",
            averageScore: "82.8",
            math: "79.4",
            code: "83.2",
            votes: 9987,
            license: "Commercial",
            organization: "OpenAI"
          }
      ].concat(
        Array.from({ length: 20 }, (_, i) => ({
          rank: i + 6,
          name: `Model ${i + 6}`,
          update: "2024/03/01",
          averageScore: (Math.random() * (85 - 75) + 75).toFixed(1),
          math: (Math.random() * (85 - 70) + 70).toFixed(1),
          code: (Math.random() * (88 - 75) + 75).toFixed(1),
          votes: Math.floor(Math.random() * 15000) + 5000,
          license: Math.random() > 0.5 ? "Commercial" : "Open Source",
          organization: `Organization ${i + 6}`
        }))
      );

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
              {['Large Language', 'Multimodel'].map(tab => (
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

            <div className="overflow-hidden border border-gray-200 rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm mb-8">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50/80">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">RANK</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">NAME</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">UPDATE</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">AVERAGE SCORE</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">MATH</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">CODE</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">VOTES</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">LICENSE</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">ORGANIZATION</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((entry) => (
                    <tr key={entry.rank} 
                        className="hover:bg-blue-50/50 transition-colors border-t border-gray-100 group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {getRankIcon(entry.rank)}
                          <span className={`font-semibold ${getRankColor(entry.rank)}`}>{entry.rank}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-blue-500" />
                          <span className="text-blue-600 font-medium group-hover:text-blue-800 cursor-pointer">{entry.name}</span>
                          {entry.rank <= 3 && <ArrowUpRight className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{entry.update}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-medium text-emerald-600">{entry.averageScore}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{entry.math}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{entry.code}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{entry.votes.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          entry.license === 'Commercial' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {entry.license}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{entry.organization}</td>
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
              <button className="text-blue-600 hover:text-blue-800 transition-colors">
                View full documentation →
              </button>
            </div>
          </div>
        </div>
      );
    };

const RankingPage = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Model Rankings
          </h1>
          <p className="text-xl text-gray-600">
            Compare and analyze different model performances
          </p>
        </div>

        <Leaderboard />
      </div>
    </Layout>
  );
};

export default RankingPage;