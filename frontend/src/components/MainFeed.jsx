import React from "react";

const MainFeed = () => {
  return (
    <main className="col-span-1 md:col-span-2 space-y-5">

      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex space-x-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>

          <input
            type="text"
            placeholder="What's on your mind?"
            className="bg-gray-100 hover:bg-gray-200 grow rounded-full px-4 outline-none transition"
          />
        </div>

        <hr className="my-3 border-gray-100" />

        <div className="flex justify-around">
          <button className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg flex-1 justify-center">
            <span className="text-red-500">📹</span>
            <span className="text-sm font-semibold text-gray-600">Live Video</span>
          </button>

          <button className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg flex-1 justify-center">
            <span className="text-green-500">🖼️</span>
            <span className="text-sm font-semibold text-gray-600">Photo/video</span>
          </button>

          <button className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg flex-1 justify-center">
            <span className="text-yellow-500">😊</span>
            <span className="text-sm font-semibold text-gray-600">Feeling/activity</span>
          </button>
        </div>
      </div>

    </main>
  );
};

export default MainFeed;