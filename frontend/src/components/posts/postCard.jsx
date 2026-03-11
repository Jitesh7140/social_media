import { useState } from "react";
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import moment from "moment";
import Comments from "../comments/comments";
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { makerequest } from "../../axios";

const PostCard = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const queryClient = useQueryClient();

  // 1. Apni Auth Context ya LocalStorage se current user nikalen
  // Taaki pata chale ki "Main" (log-in user) kaun hoon
  const currentUser = JSON.parse(localStorage.getItem("user"));

  // 2. Database se is post ke saare likes fetch karein
  const { isLoading, data: data } = useQuery({
    queryKey: ["likes", post.id],
    queryFn: () => makerequest.get("/likes?postId=" + post.id).then((res) => res.data),
  });

  // PostCard.jsx mein
  const likesData = data?.likes || [];
  const serverUserId = data?.currentUserId;

  const isLiked = likesData.includes(serverUserId);


  const mutation = useMutation({
    mutationFn: () => {
      return makerequest.post("/likes", { postId: post.id });
    },
    onSuccess: () => {
      // Jaise hi click ho, UI ko refresh karo
      queryClient.invalidateQueries(["likes", post.id]);
    },
  });

  const handleLike = () => {
    mutation.mutate();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-4 transition hover:shadow-md">
        {/* Header Section */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-linear-to-tr from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-inner">
            {post.name ? post.name[0].toUpperCase() : 'U'}
          </div>
          
          <div>
            <p className="font-bold text-sm text-gray-800 hover:underline cursor-pointer">
              {post.name || "Anonymous"} 
            </p>
            <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">
              {post.createdAt ? moment(post.createdAt).fromNow() : "Just Now"}
            </p>
          </div>
        </div>
        
        <button className="text-gray-400 hover:bg-gray-100 p-1.5 rounded-full transition">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Post Image */}
      {post.img && (
        <div className="bg-gray-50 border-y border-gray-50 overflow-hidden">
          <img
            src={"/uploads/" + post.img}
            alt="Post"
            className="w-full h-auto object-cover max-h-125"
          />
        </div>
      )}

      {/* Action Buttons Section */}
      <div className="px-2 py-1.5">
        <div className="flex justify-between items-center px-2 py-1">
          <div className="flex items-center space-x-1">

            <button
              onClick={handleLike}
              disabled={isLoading}
              className="bg-transparent border-none cursor-pointer p-1 flex items-center transition-transform active:scale-125"
            >
              {isLiked ? (
                /* --- Red Filled Heart SVG --- */
                <svg
                  aria-label="Unlike"
                  color="#ed4956"
                  fill="#ed4956"
                  height="24"
                  role="img"
                  viewBox="0 0 48 48"
                  width="24"
                >
                  <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 14.9 16.5 21.7 22.5 30 1.1 1.5 2.6 1.5 3.7 0 6-8.3 22.5-15.1 22.5-30 0-8-6-14.5-13.4-14.5z"></path>
                </svg>
              ) : (
                /* --- Empty Heart (Outline) SVG --- */
                <svg
                  aria-label="Like"
                  color="#262626"
                  fill="#262626"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.195 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.03.042.08.107.117.161.039-.054.089-.12.12-.161a4.21 4.21 0 0 1 3.672-1.941m0-2c-2.543 0-3.798 1.98-4.292 2.687C12.006 3.885 10.75 1.904 8.207 1.904A6.711 6.711 0 0 0 1.5 8.671c0 4.072 3.06 6.272 5.57 8.511 2.457 2.193 4.11 3.671 4.93 4.423a.757.757 0 0 0 .999 0c.82-.752 2.473-2.23 4.93-4.423 2.51-2.239 5.57-4.439 5.57-8.511a6.711 6.711 0 0 0-6.708-6.767z"></path>
                </svg>
              )}
            </button>

            <span className={`text-sm font-bold ml-2  text-gray-800"}`}>
              {likesData?.length || 0} 
            <span className="text-sm font-bold ml-2 text-gray-800">Likes</span>
            </span>



            <button
              onClick={() => setCommentOpen(!commentOpen)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition"
            >
              <MessageCircle size={20} />
              <span className="text-sm font-medium">Comment</span>
            </button>
          </div>

          <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition">
            <Share2 size={20} />
            <span className="text-sm font-medium">Share</span>
          </button>
        </div>
      </div>

      {commentOpen && <Comments postId={post.id} />}
    </div>
  );
};

export default PostCard;