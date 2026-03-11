import { useState } from "react";

const Comments = ({ postId }) => {
  const [desc, setDesc] = useState("");

  // Dummy Data
  const dummyComments = [
    {
      id: 1,
      desc: "Bhai bahut sahi lag rahi hai photo! 🔥",
      name: "Jitesh",
      userId: 1,
      profilePic: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 2,
      desc: "Nice click, kahan ki hai ye?",
      name: "Rohit",
      userId: 2,
      profilePic: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
  ];

  return (
    <div className="p-4 border-t border-gray-100 bg-gray-50/30">
      {/* Write Comment Input */}
      <div className="flex items-center gap-3 mb-5">
        <img 
          src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png" 
          alt="" 
          className="w-8 h-8 rounded-full object-cover"
        />
        <input
          type="text"
          placeholder="Write a comment..."
          className="grow bg-gray-100 border-none outline-none p-2 rounded-lg text-sm"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-xs font-semibold">
          Send
        </button>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {dummyComments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            <img src={comment.profilePic} alt="" className="w-8 h-8 rounded-full object-cover shrink-0" />
            <div className="flex flex-col gap-1">
              <div className="bg-gray-100 p-2 rounded-2xl rounded-tl-none">
                <span className="font-bold text-[13px] text-gray-800 block">{comment.name}</span>
                <p className="text-sm text-gray-700">{comment.desc}</p>
              </div>
              <span className="text-[10px] text-gray-400 ml-2">1 min ago</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;