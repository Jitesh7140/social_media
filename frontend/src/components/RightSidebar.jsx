import React from "react";

const RightSidebar = () => {
  return (
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
  );
};

export default RightSidebar;