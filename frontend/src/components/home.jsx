import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  
  return (
    <div className="min-h-screen bg-gray-50">
 

      {/* --- Hero Section --- */}
      <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Welcome to your new</span>
            <span className="block text-indigo-600">Digital Workspace</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Manage your projects, collaborate with your team, and track your progress all in one place. Simple, fast, and secure.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link
                to="/register"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
              >
                Get Started
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <a
                href="#"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
              >
                Live Demo
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* --- Feature Grid (Optional) --- */}
      <div className="mt-20 bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center p-6">
              <div className="text-indigo-600 text-3xl mb-4">⚡</div>
              <h3 className="text-lg font-medium text-gray-900">Fast Performance</h3>
              <p className="mt-2 text-gray-500 text-sm">Optimized for speed and high-efficiency workflows.</p>
            </div>
            <div className="text-center p-6">
              <div className="text-indigo-600 text-3xl mb-4">🛡️</div>
              <h3 className="text-lg font-medium text-gray-900">Secure Data</h3>
              <p className="mt-2 text-gray-500 text-sm">Your data is encrypted and protected with enterprise security.</p>
            </div>
            <div className="text-center p-6">
              <div className="text-indigo-600 text-3xl mb-4">📱</div>
              <h3 className="text-lg font-medium text-gray-900">Mobile Ready</h3>
              <p className="mt-2 text-gray-500 text-sm">Access your dashboard from any device, anywhere.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;