import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#121212] text-white py-8 px-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="text-sm text-gray-400">
          © {new Date().getFullYear()} <span className="text-white font-semibold">CircuitBuilderAI</span>. All rights reserved.
        </div>

        <div className="flex space-x-6">
          <a href="#" className="text-gray-400 hover:text-purple-400 transition">
            Home
          </a>
          <a href="#features" className="text-gray-400 hover:text-purple-400 transition">
            Features
          </a>
          <a href="#templates" className="text-gray-400 hover:text-purple-400 transition">
            Templates
          </a>
          <a href="#editor" className="text-gray-400 hover:text-purple-400 transition">
            Editor
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
