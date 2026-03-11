import { useState } from "react";
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { makerequest } from "../../axios";
import moment from "moment";

const Comments = ({ postId }) => {
    const [desc, setDesc] = useState("");
    const queryClient = useQueryClient();

    // 1. Fetch Comments
    const { isPending, error, data } = useQuery({
        queryKey: ["comments", postId],
        queryFn: () => makerequest.get("/comments?postId=" + postId).then((res) => res.data),
    });

    // 2. Add Comment Mutation
    const mutation = useMutation({
        mutationFn: (newComment) => {
            return makerequest.post("/comments", newComment);
        },
        onSuccess: () => {
            // Comment add hone ke baad list ko refresh karein
            queryClient.invalidateQueries(["comments", postId]);
        },
    });

    const handleClick = async (e) => {
        e.preventDefault();
        if (!desc.trim()) return;

        // Mutation trigger karein
        mutation.mutate({ comment_text: desc, post_id: postId   }); // Note: userId ko backend par verify karke lena chahiye
        setDesc(""); // Input field khali karein
    };

    return (
        <div className="p-4 border-t border-gray-100 bg-gray-50/30">
            {/* Write Comment Input */}
            <div className="flex items-center gap-3 mb-5">
                <img
                    src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png"
                    alt="user"
                    className="w-8 h-8 rounded-full object-cover"
                />
                <input
                    type="text"
                    placeholder="Write a comment..."
                    className="grow bg-gray-100 border-none outline-none p-2 rounded-lg text-sm"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                />
                <button 
                    onClick={handleClick}
                    disabled={mutation.isPending}
                    className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-xs font-semibold disabled:bg-blue-300"
                >
                    {mutation.isPending ? "Sending..." : "Send"}
                </button>
            </div>

            {/* Comments List Section */}
            <div className="space-y-4">
                {isPending ? (
                    "Loading..."
                ) : error ? (
                    "Something went wrong"
                ) : (
                    data.map((comment) => (
                        <div key={comment.id} className="flex gap-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 bg-blue-500 flex items-center justify-center text-white font-bold text-xs">
                                {comment.profilePic ? (
                                    <img src={comment.profilePic} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <span>{comment.name ? comment.name[0].toUpperCase() : 'U'}</span>
                                )}
                            </div>

                            <div className="flex flex-col gap-1">
                                <div className="bg-gray-100 p-2 rounded-2xl rounded-tl-none">
                                    <span className="font-bold text-[13px] text-gray-800 block">{comment.name}</span>
                                    <p className="text-sm text-gray-700">{comment.comment_text}</p>
                                </div>
                                <span className="text-[10px] text-gray-400 ml-2">
                                    {moment(comment.createdAt).fromNow()}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Comments;