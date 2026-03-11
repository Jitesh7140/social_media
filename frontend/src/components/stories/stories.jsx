import { storiesData } from "./storiesData";
  import { Plus } from "lucide-react";

const Stories = ({ stories, currentUser = "Test2" }) => {
  return (
    <div className="flex space-x-3 overflow-x-auto pb-4 scrollbar-hide">
      
      {/* Create Story Card */}
      <div className="group relative w-28 h-44 shrink-0 cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm border border-gray-200">
        <div className="h-3/4 w-full overflow-hidden">
          <img 
            src="https://picsum.photos/200/300?random=100" 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            alt="Your profile"
          />
        </div>
        <div className="absolute bottom-0 w-full h-1/4 bg-white flex flex-col items-center justify-center">
          <div className="absolute -top-4 bg-blue-600 p-1.5 rounded-full border-4 border-white text-white">
            <Plus size={18} strokeWidth={3} />
          </div>
          <span className="text-[11px] font-bold text-gray-800 mt-2">Create Story</span>
        </div>
      </div>

      {/* Friends Stories */}
      {storiesData.map((story) => (
        <div
          key={story.id}
          className="group relative w-28 h-44 shrink-0 cursor-pointer overflow-hidden rounded-xl shadow-sm transition transform active:scale-95"
        >
          {/* Main Story Image */}
          <img
            src={story.image}
            alt={story.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Dark Overlay for Text Visibility */}
          <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/60" />

          {/* User Profile Avatar on Top Left */}
          <div className="absolute top-2 left-2 w-9 h-9 border-4 border-blue-600 rounded-full overflow-hidden shadow-lg z-10">
            <img 
              src={`https://i.pravatar.cc/150?u=${story.id}`} 
              className="w-full h-full object-cover" 
              alt="avatar"
            />
          </div>

          {/* User Name */}
          <span className="absolute bottom-2 left-2 right-2 text-white text-[12px] font-semibold truncate z-10">
            {story.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Stories;