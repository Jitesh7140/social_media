import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

axios.get('http://localhost:5000/api/user')
.then(response => { 
    console.log(response.data);
})
.catch(error => {
    console.error('Error fetching data:', error);
}); 


const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#f0f2f5] font-sans">
     
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 px-4">
        
        {/* --- Left Sidebar (Hidden on Mobile) --- */}
        <aside className="hidden md:block col-span-1 sticky top-20 h-fit">
          <ul className="space-y-4 font-medium text-gray-800">
            <li className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
              <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
              <span>User Name</span>
            </li>
            <li className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
              <span className="text-xl">👥</span> <span>Friends</span>
            </li>
            <li className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
              <span className="text-xl">🕒</span> <span>Memories</span>
            </li>
            <li className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
              <span className="text-xl">🚩</span> <span>Pages</span>
            </li>
          </ul>
        </aside>

        {/* --- Main Feed --- */}
        <main className="col-span-1 md:col-span-2 space-y-5">
          
          {/* Create Post Box */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex space-x-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <input 
                type="text" 
                placeholder="What's on your mind, User?" 
                className="bg-gray-100 hover:bg-gray-200  grow rounded-full px-4 outline-none transition"
              />
            </div>
            <hr className="my-3 border-gray-100" />
            <div className="flex justify-around">
               <button className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg flex-1 justify-center">
                 <span className="text-red-500">📹</span> <span className="text-sm font-semibold text-gray-600">Live Video</span>
               </button>
               <button className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg flex-1 justify-center">
                 <span className="text-green-500">🖼️</span> <span className="text-sm font-semibold text-gray-600">Photo/video</span>
               </button>
               <button className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg flex-1 justify-center">
                 <span className="text-yellow-500">😊</span> <span className="text-sm font-semibold text-gray-600">Feeling/activity</span>
               </button>
            </div>
          </div>

          {/* Sample Post */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
             <div className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                   <div className="w-10 h-10 bg-indigo-500 rounded-full"></div>
                   <div>
                      <p className="font-bold text-sm">Digital Workspace Official</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                   </div>
                </div>
                <span className="text-gray-500 cursor-pointer">•••</span>
             </div>
             <div className="px-4 pb-3">
                <p className="text-gray-800">Welcome to your new digital workspace! Let's get productive today. 🚀</p>
             </div>
             <div className="h-64 bg-indigo-100 flex items-center justify-center border-y border-gray-50">
                <span className="text-indigo-600 font-bold text-2xl">Post Image Placeholder</span>
             </div>
             <div className="p-2">
                <div className="flex justify-around border-t border-gray-100 pt-2">
                   <button className="hover:bg-gray-100 flex-1 py-2 rounded-md font-semibold text-gray-600 text-sm">Like</button>
                   <button className="hover:bg-gray-100 flex-1 py-2 rounded-md font-semibold text-gray-600 text-sm">Comment</button>
                   <button className="hover:bg-gray-100 flex-1 py-2 rounded-md font-semibold text-gray-600 text-sm">Share</button>
                </div>
             </div>
          </div>

        </main>

        {/* --- Right Sidebar (Hidden on Mobile) --- */}
        <aside className="hidden md:block col-span-1">
           <div className="bg-white p-4 rounded-xl shadow-sm">
              <h3 className="font-bold text-gray-500 mb-4">Sponsored</h3>
              <div className="flex items-center space-x-3 mb-4 cursor-pointer">
                 <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                 <div>
                    <p className="text-sm font-semibold">Join the 2026 Dev Summit</p>
                    <p className="text-xs text-gray-400">devsummit.com</p>
                 </div>
              </div>
              <hr className="my-4" />
              <h3 className="font-bold text-gray-500 mb-4">Contacts</h3>
              <div className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                 <div className="relative">
                    <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                 </div>
                 <span className="text-sm font-medium">Friend Name</span>
              </div>
           </div>
        </aside>

      </div>
    </div>
  );
};

export default HomePage;