import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { makerequest } from "../../axios";
import Update from "../update/Update";
import PostCard from "../posts/postCard";
import axios from 'axios';
import { MapPin, Edit2, UserPlus, Grid, Info, Users, Image as ImageIcon } from "lucide-react";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);


  useEffect(() => {
    axios.get('http://localhost:5000/api/user/', {
      withCredentials: true
    })
      .then(response => {
        if (response.data.status === 'Success') {
          console.log('user data', response.data);
          setCurrentUser(response.data.userId);
        } else {
          navigate('/login');
        }
      })
      .catch((err) => {
        console.log('Error fetching user data, redirecting to login', err);
      });

  }, []);

  console.log('Current User ID:', currentUser);

  const location = useLocation();
  const userId = parseInt(location.pathname.split("/")[2]);

  // when navigating here, if state.openUpdate is true AND it's your own profile, show modal immediately
  useEffect(() => {
    if (currentUser?.id === userId && location.state?.openUpdate) {
      setOpenUpdate(true);
    }
  }, [currentUser, userId, location.state]);

  const { isLoading, data } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => makerequest.get("/user/find/" + userId).then((res) => res.data),
  });

  // fetch posts belonging to this profile
  const { data: postsData, isLoading: postsLoading } = useQuery({
    queryKey: ["profilePosts", userId],
    queryFn: () => makerequest.get(`/posts?userId=${userId}`).then((res) => res.data),
  });

  // fetch followers data belonging to this profile
  const { data: followersData, isLoading: followersLoading } = useQuery({
    queryKey: ["profileFollowers", userId],
    queryFn: () => makerequest.get(`/relationships/?followedUserId=${userId}`).then((res) => res.data),
  });



  // Default images (Placeholder)
  const defaultCover = "/uploads/coverpic.avif"; // Aapke public folder mein ek default cover image honi chahiye
  const defaultProfile = "/uploads/profile.jpg"; // Aapke public folder mein ek default profile image honi chahiye

  if (isLoading) return <div className="p-10 text-center font-bold text-gray-500">Loading Profile...</div>;

  return (
    <div className="bg-[#f0f2f5] min-h-screen pb-10">
      {/* --- Header Section --- */}
      <div className="bg-white shadow-md">
        <div className="max-w-5xl mx-auto">
          {/* Cover Photo */}
          <div className="relative h-62.5 md:h-87.5 w-full bg-gray-200 rounded-b-xl overflow-hidden group">
            <img
              src={data?.resp?.coverPic ? "/uploads/" + data?.resp?.coverPic : defaultCover}
              alt="cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all"></div>
          </div>

          {/* Profile Details Area */}
          <div className="px-4 md:px-8 pb-4">
            <div className="flex flex-col md:flex-row items-center md:items-end -mt-16 md:-mt-20 space-y-4 md:space-y-0 md:space-x-6 relative z-10">
              {/* Profile Picture */}
              <div className="relative">
                <img
                  src={data?.resp?.profilePic ? "/uploads/" + data?.resp?.profilePic : defaultProfile}
                  alt="profile"
                  className="w-40 h-40 md:w-44 md:h-44 rounded-full border-4 border-white object-cover bg-white shadow-lg"
                />
              </div>

              {/* Name & Bio */}
              <div className="flex-1 text-center md:text-left mb-2">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">{data?.resp?.name || "User"}</h1>
                <p className="text-gray-500 font-medium flex items-center justify-center md:justify-start mt-1">
                  <MapPin size={18} className="mr-1 text-gray-400" />
                  {data?.resp?.city || "Unknown Location"}
                </p>
              </div>

              {/* Action Buttons  for followinf follower btn*/}
              <div className="flex space-x-2 pb-2">
                {/* {userId === currentUser?.id ? (
                  <button
                    onClick={() => setOpenUpdate(true)}
                    className="flex items-center px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-lg transition-all"
                  >
                    <Edit2 size={18} className="mr-2" />
                    Edit Profile
                  </button>
                ) : (
                  <button className="flex items-center px-6 py-2.5 bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold rounded-lg transition-all shadow-md">
                    <UserPlus size={18} className="mr-2" />
                    {followersLoading ? "Loading..." : followersData?.some(follower => follower.followerUserId === currentUser?.id) ? "Following" : "Follow"}
                  </button>
                )} */}
              </div>
            </div>

            {/* Divider */}
            <hr className="mt-6 border-gray-200" />

            {/* Facebook Tabs */}
            <div className="flex space-x-2 md:space-x-4 text-gray-600 font-bold overflow-x-auto no-scrollbar">
              <TabItem icon={<Grid size={18} />} label="Posts" active />
              {/* <TabItem icon={<Info size={18} />} label="About" />
              <TabItem icon={<Users size={18} />} label="Friends" />
              <TabItem icon={<ImageIcon size={18} />} label="Photos" /> */}
            </div>
          </div>
        </div>
      </div>

      {/* --- Main Content --- */}
      <div className="max-w-5xl mx-auto mt-4 px-2 grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Col: Intro */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-extrabold mb-4">Intro</h2>
            <div className="space-y-4">
              <div className="flex items-center text-gray-700">
                <MapPin className="mr-3 text-gray-400" />
                <span>Lives in <b>{data?.resp?.city || "Earth"}</b></span>
              </div>

              {currentUser === userId ? (
                <button
                  onClick={() => setOpenUpdate(true)} // Click handler yahan missing tha!
                  className="w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-gray-700 transition"
                >
                  Edit Details
                </button>
              ) : (
                <button className="w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-gray-700 transition">
                  View Details
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Col: Posts Area */}
        <div className="lg:col-span-7">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-gray-900">Posts</h2>
              <button className="text-blue-600 font-semibold hover:bg-blue-50 px-3 py-1 rounded-md transition">Filters</button>
            </div>
          </div>
          {postsLoading ? (
            <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-200 text-center">
              <p className="text-gray-500 font-medium text-lg">Loading posts...</p>
            </div>
          ) : postsData && postsData.length > 0 ? (
            <div className="space-y-4">
              {postsData.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-200 text-center">
              <p className="text-gray-500 font-medium text-lg">
                No posts yet from {data?.resp?.name || "this user"}
              </p>
            </div>
          )}
        </div>
      </div>

      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data?.resp} />}
    </div>
  );
};

// Sub-component for Tabs
const TabItem = ({ icon, label, active }) => (
  <div className={`flex items-center px-4 py-4 cursor-pointer transition-all border-b-4 ${active ? 'border-blue-600 text-blue-600' : 'border-transparent hover:bg-gray-100 rounded-t-lg'}`}>
    <span className="mr-2">{icon}</span>
    <span>{label}</span>
  </div>
);

export default Profile;