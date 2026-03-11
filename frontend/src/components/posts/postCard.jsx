import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import moment from "moment";

const PostCard = ({ post }) => {
  // Console check ke liye
  // console.log("Post Data:", post);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-4 transition hover:shadow-md">
      
      {/* Header Section */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Avatar - User ke naam ka pehla letter */}
          <div className="w-10 h-10 bg-linear-to-tr from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-inner">
            {post.name ? post.name[0].toUpperCase() : 'U'}
          </div>
          
          <div>
            <p className="font-bold text-sm text-gray-800 hover:underline cursor-pointer">
              {post.name || "Anonymous"} 
            </p>
            <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">
              {/* Agar createdAt null hai toh 'Just Now' dikhayega */}
              {post.createdAt ? moment(post.createdAt).fromNow() : "Just Now"}
            </p>
          </div>
        </div>
        
        {/* Three dots menu */}
        <button className="text-gray-400 hover:bg-gray-100 p-1.5 rounded-full transition">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Post Text - post.post_dec use kiya hai yahan */}
      <div className="px-4 pb-3">
        <p className="text-gray-700 text-[15px] leading-relaxed">
          {post.post_dec}
        </p>
      </div>

      {/* Post Image */}
      {post.img && (
        <div className="bg-gray-50 border-y border-gray-50 overflow-hidden">
          <img 
            src={"/uploads/"+post.img} 
            alt="Post content" 
            className="w-full h-auto object-cover max-h-125 hover:scale-[1.01] transition-transform duration-300"
          />
        </div>
      )}

      {/* Action Buttons Section */}
      <div className="px-2 py-1.5">
        <div className="flex justify-between items-center px-2 py-1">
           {/* Left side actions */}
           <div className="flex items-center space-x-1">
              <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-500 transition group">
                <Heart size={20} className="group-active:scale-125 transition-transform" />
                <span className="text-sm font-medium">Like</span>
              </button>
              
              <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition">
                <MessageCircle size={20} />
                <span className="text-sm font-medium">Comment</span>
              </button>
           </div>

           {/* Right side action */}
           <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition">
              <Share2 size={20} />
              <span className="text-sm font-medium">Share</span>
           </button>
        </div>
      </div>

    </div>
  );
};

export default PostCard;