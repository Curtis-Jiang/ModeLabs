import React, { useState } from 'react';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';

export default function RecommendationPage() {
  const [selectedTab, setSelectedTab] = useState('performance');

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 text-blue-100 mb-6">
              <span>编程开发</span>
              <span className="text-sm">→</span>
              <span>代码补全</span>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-yellow-300">✨</span>
                    <span className="text-yellow-300 font-medium">最佳推荐</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-4">Claude 3.5</h2>
                  <p className="text-blue-100 max-w-xl mb-6">
                    基于您的需求，Claude 3.5是最佳选择。它在代码补全方面表现出色，
                    具有极强的上下文理解能力和准确的代码生成能力。
                  </p>
                  <div className="flex gap-6">
                    <div>
                      <div className="text-sm text-blue-200 mb-1">平均响应时间</div>
                      <div className="text-2xl font-bold">0.8s</div>
                    </div>
                    <div>
                      <div className="text-sm text-blue-200 mb-1">准确率</div>
                      <div className="text-2xl font-bold">95%</div>
                    </div>
                    <div>
                      <div className="text-sm text-blue-200 mb-1">用户满意度</div>
                      <div className="text-2xl font-bold">4.8/5</div>
                    </div>
                  </div>
                </div>
                <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                  开始使用
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* 主要内容区域 */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 text-blue-100 mb-6">
              <span>编程开发</span>
              <span className="text-sm">→</span>
              <span>代码补全</span>
            </div>

            {/* 详细分析区域 */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="border-b border-gray-100">
                <div className="flex">
                  <button
                    className={`px-6 py-4 font-medium ${
                      selectedTab === 'performance'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    onClick={() => setSelectedTab('performance')}
                  >
                    性能对比
                  </button>
                  <button
                    className={`px-6 py-4 font-medium ${
                      selectedTab === 'cost'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    onClick={() => setSelectedTab('cost')}
                  >
                    成本分析
                  </button>
                  <button
                    className={`px-6 py-4 font-medium ${
                      selectedTab === 'reviews'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    onClick={() => setSelectedTab('reviews')}
                  >
                    用户评价
                  </button>
                  <button
                    className={`px-6 py-4 font-medium ${
                      selectedTab === 'metrics'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    onClick={() => setSelectedTab('metrics')}
                  >
                    指标分析
                  </button>
                </div>
              </div>

              <div className="p-8">
                {selectedTab === 'performance' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">性能对比</h3>
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h4 className="font-medium">Claude 3.5</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>准确性</span>
                            <span className="font-medium">95%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>响应速度</span>
                            <span className="font-medium">0.8s</span>
                          </div>
                          <div className="flex justify-between">
                            <span>稳定性</span>
                            <span className="font-medium">92%</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-medium">GPT-4</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>准确性</span>
                            <span className="font-medium">90%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>响应速度</span>
                            <span className="font-medium">1.2s</span>
                          </div>
                          <div className="flex justify-between">
                            <span>稳定性</span>
                            <span className="font-medium">88%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === 'cost' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">成本估算</h3>
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h4 className="font-medium">基础价格</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>API调用</span>
                            <span className="font-medium">$0.01/次</span>
                          </div>
                          <div className="flex justify-between">
                            <span>每月最低</span>
                            <span className="font-medium">$10</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-medium">预估成本</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>小规模使用</span>
                            <span className="font-medium">$20-50/月</span>
                          </div>
                          <div className="flex justify-between">
                            <span>中等规模</span>
                            <span className="font-medium">$100-300/月</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === 'reviews' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">用户评价</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-yellow-400">★★★★★</span>
                          <span className="text-gray-600 text-sm">优秀的代码补全体验</span>
                        </div>
                        <p className="text-gray-600 text-sm">
                          "使用Claude 3.5已经三个月了，代码补全的准确度非常高，
                          特别是在处理复杂业务逻辑时，能够准确理解上下文并给出恰当的建议。"
                        </p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-yellow-400">★★★★☆</span>
                          <span className="text-gray-600 text-sm">响应速度快，建议精准</span>
                        </div>
                        <p className="text-gray-600 text-sm">
                          "代码提示非常快，而且建议都很有参考价值。唯一的不足是在处理
                          某些特殊框架时可能需要更多上下文信息。"
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === 'metrics' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">专业指标分析</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h4 className="font-medium">Claude 3.5</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>准确率（Precision）</span>
                            <span className="font-medium">93%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>召回率（Recall）</span>
                            <span className="font-medium">96%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>F1分数</span>
                            <span className="font-medium">94.5%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>AUC值</span>
                            <span className="font-medium">0.97</span>
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium">ROC曲线</h5>
                          <img src="/images/claude_roc.png" alt="Claude 3.5 ROC曲线" className="w-full h-auto" />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium">GPT-4</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>准确率（Precision）</span>
                            <span className="font-medium">88%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>召回率（Recall）</span>
                            <span className="font-medium">91%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>F1分数</span>
                            <span className="font-medium">89.5%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>AUC值</span>
                            <span className="font-medium">0.92</span>
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium">ROC曲线</h5>
                          <img src="/images/gpt4_roc.png" alt="GPT-4 ROC曲线" className="w-full h-auto" />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="font-medium">指标说明</h4>
                      <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm">
                        <li>
                          <strong>准确率（Precision）：</strong>
                          模型预测为正类的样本中实际为正类的比例。
                        </li>
                        <li>
                          <strong>召回率（Recall）：</strong>
                          实际为正类的样本中被模型正确预测的比例。
                        </li>
                        <li>
                          <strong>F1分数：</strong>
                          准确率和召回率的调和平均数，用于综合评估模型性能。
                        </li>
                        <li>
                          <strong>AUC值：</strong>
                          ROC曲线下的面积，衡量模型区分正负样本的能力，值越接近1表示性能越好。
                        </li>
                        <li>
                          <strong>ROC曲线：</strong>
                          反映了模型在不同阈值下的敏感性和特异性，曲线越靠近左上角表示性能越好。
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
