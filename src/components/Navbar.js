import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { 
  ChevronRight, 
  Brain, 
  Database, 
  TestTube, 
  UserCircle2, 
  Sparkles,
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
  const { user , role } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleNavigation = (path) => {
    setActiveTab(path);
    setMenuOpen(false);

    if (!user) {
      navigate('/login');
      return;
    }
    
    switch(path) {
      case 'model':
        navigate('/ranking');
        break;
      case 'dataset':
        navigate('/dataset');
        break;
      case 'test':
        navigate('/test');
        break;
      case 'ai-recommend':
        navigate('/welcome');
        break;
      case 'home':
      default:
        navigate('/');
    }
  };

  const signInButton = user ? (
    <div className="relative group">
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
      
      {/* Dropdown Menu */}
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
        <button
          onClick={() => navigate('/profile')}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
        >
          Profile
        </button>
        <button
          onClick={handleLogout}
          className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
        >
          Log Out
        </button>
      </div>
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
        <Link to="/" className="font-serif text-4xl flex items-center space-x-3 cursor-pointer group">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
            ModeLabs
          </span>
          <div className="w-3 h-3 rounded-full bg-blue-500 group-hover:animate-ping"/>
        </Link>
      </div>
      
      <div className="hidden lg:flex items-center space-x-6">
        <NavButton 
          icon={Brain} 
          label="Model" 
          isActive={activeTab === 'model'}
          onClick={() => handleNavigation('model')}
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
        <NavButton 
          icon={Sparkles} 
          label="AI Recommend" 
          isActive={activeTab === 'ai-recommend'}
          onClick={() => handleNavigation('ai-recommend')}
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

export default Navbar;