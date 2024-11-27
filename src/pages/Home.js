import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
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
    MessagesSquare as Discord,
    Menu
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

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    setActiveTab(path);
    if(path === 'ai-recommend'){
      window.location.href = '/welcome';
    }
  };

  const signInButton = user ? (
    <div 
      onClick={() => navigate('/profile')} 
      className="flex items-center space-x-3 px-6 py-3 text-gray-700 cursor-pointer hover:bg-gray-100 rounded-full"
    >
      {user.photoURL ? (
        <img 
          src={user.photoURL} 
          alt="Profile" 
          className="w-8 h-8 rounded-full"
        />
      ) : (
        <UserCircle2 className="w-6 h-6" />
      )}
      <span>{user.email}</span>
    </div>
  ) : (
    <Link
      to="/login"
      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full flex items-center space-x-3
                hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 transition-all duration-300 ease-in-out transform hover:scale-110"
    >
      <UserCircle2 className="w-6 h-6" />
      <span>Sign In</span>
    </Link>
  );

  return (
    <nav className="w-full py-4 px-8 flex items-center justify-between backdrop-blur-lg bg-white/40 fixed top-0 z-50 border-b border-gray-300">
      <div className="flex items-center space-x-4">
        <h1 className="font-serif text-4xl flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleNavigation('home')}>
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
            ModeLabs
          </span>
          <div className="w-3 h-3 rounded-full bg-blue-500 group-hover:animate-ping"/>
        </h1>
      </div>
      
      <div className="hidden lg:flex items-center space-x-6">
        <NavButton 
          icon={Brain} 
          label="Model" 
          isActive={activeTab === 'model'}
          onClick={() => handleNavigation('model')}
        />
        <NavButton 
          icon={Sparkles} 
          label="AI Recommend" 
          isActive={activeTab === 'ai-recommend'}
          onClick={() => handleNavigation('ai-recommend')}
        />
        <NavButton 
          icon={Database} 
          label="Dataset" 
          isActive={activeTab === 'dataset'}
          onClick={() => handleNavigation('dataset')}
        />
        <NavButton 
          icon={TestTube} 
          label="Test" 
          isActive={activeTab === 'test'}
          onClick={() => handleNavigation('test')}
        />
        {signInButton}
      </div>
      <div className="lg:hidden flex items-center">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <Menu className="w-7 h-7 text-gray-800" />
        </button>
      </div>
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg py-6 flex flex-col items-center space-y-4 lg:hidden">
          <NavButton 
            icon={Brain} 
            label="Model" 
            isActive={activeTab === 'model'}
            onClick={() => handleNavigation('model')}
          />
          <NavButton 
            icon={Sparkles} 
            label="AI Recommend" 
            isActive={activeTab === 'ai-recommend'}
            onClick={() => handleNavigation('ai-recommend')}
          />
          <NavButton 
            icon={Database} 
            label="Dataset" 
            isActive={activeTab === 'dataset'}
            onClick={() => handleNavigation('dataset')}
          />
          <NavButton 
            icon={TestTube} 
            label="Test" 
            isActive={activeTab === 'test'}
            onClick={() => handleNavigation('test')}
          />
          {signInButton}
        </div>
      )}
    </nav>
  );
};

const GradientBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Enhanced gradient background with a denser, more blended look */}
      <div className="absolute inset-0 opacity-70">
        <div className="absolute transform rotate-6 left-1/4 -top-40 w-[600px] h-[600px] animate-pulse">
          <div className="absolute w-full h-full rounded-full bg-blue-500/60 blur-3xl" />
          <div className="absolute w-full h-full rounded-full bg-blue-400/40 blur-2xl animate-ping" />
        </div>
        
        <div className="absolute transform rotate-45 right-1/4 top-28 w-[600px] h-[600px] animate-pulse delay-100">
          <div className="absolute w-full h-full rounded-full bg-purple-500/60 blur-3xl" />
          <div className="absolute w-full h-full rounded-full bg-purple-400/40 blur-2xl animate-ping" />
        </div>
        
        <div className="absolute transform -rotate-12 -left-36 bottom-32 w-[600px] h-[600px] animate-pulse delay-200">
          <div className="absolute w-full h-full rounded-full bg-cyan-500/60 blur-3xl" />
          <div className="absolute w-full h-full rounded-full bg-cyan-400/40 blur-2xl animate-ping" />
        </div>
      </div>
      
      {/* Grid overlay for sci-fi effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 backdrop-blur-[2px]"
           style={{
             backgroundImage: `
               linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
               linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
             `,
             backgroundSize: '40px 40px'
           }}
      />
    </div>
  );
};

const MainContent = () => {
  const navigate = useNavigate();
  const handleStartNow = () => {
    navigate('/Ranking');
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-32">
      <div className="text-center space-y-10 max-w-3xl">
        <h1 className="text-8xl font-extrabold tracking-tighter mb-8 relative group cursor-default">
          <span className="bg-gradient-to-r from-blue-700 via-purple-700 to-cyan-700 bg-clip-text text-transparent
                         animate-gradient-x">
            ModeLabs
          </span>
          <div className="absolute -top-5 -right-5 w-10 h-10 bg-blue-500/20 rounded-full blur-xl group-hover:animate-ping"/>
        </h1>
        
        <p className="text-2xl text-center leading-loose text-gray-900 backdrop-blur-md bg-white/40 p-8 rounded-3xl
                      border border-white/30 shadow-xl">
          ModeLabs is a leaderboard for evaluating the capabilities of large language models and multimodal large models.
          <span className="block mt-4 text-blue-700 font-semibold">Discover the future of AI evaluation.</span>
        </p>
        
        <button 
          onClick={handleStartNow}
          className="group relative inline-flex items-center space-x-6 bg-gradient-to-r from-blue-700 to-purple-700
                     text-white px-10 py-5 rounded-full text-3xl font-bold overflow-hidden
                     hover:shadow-[0_0_35px_rgba(59,130,246,0.7)] transition-all duration-300 transform hover:scale-110"
        >
          <span className="relative z-10">Start Now</span>
          <ChevronRight className="w-7 h-7 transition-transform duration-300 group-hover:translate-x-3" />
          <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
};

const Footer = () => {
    return (
      <footer className="relative z-10 bg-white/20 backdrop-blur-md border-t border-white/30">
        <div className="max-w-7xl mx-auto pt-20 pb-12 px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
            {/* Research Section */}
            <div className="space-y-5">
              <h3 className="text-xl font-bold text-gray-900">Research</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-700 hover:text-blue-700">Overview</a></li>
                <li><a href="#" className="text-gray-700 hover:text-blue-700">Index</a></li>
                <li><a href="#" className="text-gray-700 hover:text-blue-700">Latest Papers</a></li>
                <li><a href="#" className="text-gray-700 hover:text-blue-700">Documentation</a></li>
              </ul>
            </div>
  
            {/* Products Section */}
            <div className="space-y-5">
              <h3 className="text-xl font-bold text-gray-900">Products</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-700 hover:text-blue-700">Models</a></li>
                <li><a href="#" className="text-gray-700 hover:text-blue-700">Datasets</a></li>
                <li><a href="#" className="text-gray-700 hover:text-blue-700">API</a></li>
                <li><a href="#" className="text-gray-700 hover:text-blue-700">Pricing</a></li>
              </ul>
            </div>
  
            {/* Company Section */}
            <div className="space-y-5">
              <h3 className="text-xl font-bold text-gray-900">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-700 hover:text-blue-700">About Us</a></li>
                <li><a href="#" className="text-gray-700 hover:text-blue-700">Careers</a></li>
                <li><a href="#" className="text-gray-700 hover:text-blue-700">Blog</a></li>
                <li><a href="#" className="text-gray-700 hover:text-blue-700">News</a></li>
              </ul>
            </div>
  
            {/* Legal Section */}
            <div className="space-y-5">
              <h3 className="text-xl font-bold text-gray-900">Legal</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-700 hover:text-blue-700">Terms</a></li>
                <li><a href="#" className="text-gray-700 hover:text-blue-700">Privacy</a></li>
                <li><a href="#" className="text-gray-700 hover:text-blue-700">Security</a></li>
                <li><a href="#" className="text-gray-700 hover:text-blue-700">Cookie Policy</a></li>
              </ul>
            </div>
  
            {/* Contact Section */}
            <div className="space-y-5">
              <h3 className="text-xl font-bold text-gray-900">Connect</h3>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="mailto:caojq22@mails.tsinghua.edu.cn" 
                    className="text-gray-700 hover:text-blue-700 flex items-center space-x-3"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Contact Us</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-blue-700 flex items-center space-x-3">
                    <Globe className="w-5 h-5" />
                    <span>Support Center</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-blue-700 flex items-center space-x-3">
                    <Heart className="w-5 h-5" />
                    <span>Community</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
  
          {/* Bottom Bar */}
          <div className="pt-12 border-t border-gray-300">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-5 md:space-y-0">
              <div className="flex items-center space-x-5">
                <span className="text-gray-600">© 2024 ModeLabs. All rights reserved.</span>
                <a href="#" className="text-gray-600 hover:text-blue-700">
                  <Globe className="w-5 h-5" />
                </a>
              </div>
              
              <div className="flex items-center space-x-8">
                <a href="#" className="text-gray-500 hover:text-gray-700">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-700">
                  <Github className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-700">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-700">
                  <Youtube className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-700">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-700">
                  <Discord className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  const LandingPage = () => {
    return (
      <div className="relative min-h-screen bg-white overflow-hidden flex flex-col">
        <GradientBackground />
        <Navbar />
        <main className="flex-grow">
          <MainContent />
        </main>
        <Footer />
      </div>
    );
  };
  
export default LandingPage;