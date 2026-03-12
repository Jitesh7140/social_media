import { useState, useRef } from "react";
import { makerequest } from "../../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X, Camera, MapPin, User, Save } from "lucide-react";

const Update = ({ setOpenUpdate, user }) => {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [texts, setTexts] = useState({
    name: user.name || "",
    city: user.city || "",
  });
 

  const coverInputRef = useRef(null);
  const profileInputRef = useRef(null);

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makerequest.post("/upload", formData); 
      return res.data;
    } catch (err) {
      console.log("Upload Error:", err);
    }
  };

  // 1. Inputs handle karne ke liye (Text aur File dono ke liye)
  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === "file") {
      // Agar file hai toh use file state mein set karein
      if (name === "profile") setCover(files[0]);
      if (name === "cover") setProfile(files[0]);
    } else {
      // Agar text hai toh texts state mein
      setTexts((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCover(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile(file);
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (updatedUser) => makerequest.put("/user/find/" + user.id, updatedUser),
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      queryClient.invalidateQueries(["profilePosts"]);
      queryClient.invalidateQueries(["profileFollowers"]);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    let coverUrl = user.coverPic;
    let profileUrl = user.profilePic;

    

    try {
      // Sirf tabhi upload call karein agar user ne nayi file select ki ho
      if (cover) {
        coverUrl = await upload(cover);
      }
      if (profile) {
        profileUrl = await upload(profile);
      }

      mutation.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl });
      setOpenUpdate(false);
    } catch (err) {
      console.error("Submit Error:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-200">

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Edit Profile</h2>
          <button
            onClick={() => setOpenUpdate(false)}
            className="p-1 hover:bg-gray-100 rounded-full transition"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        <form className="p-6 space-y-6">
          {/* Photos Selection */}
          <div className="grid grid-cols-2 gap-4">
            {/* Cover Photo Upload */}
            <div className="flex flex-col items-center">
              <label className="text-sm font-semibold text-gray-600 mb-2">Cover Photo</label>
              <div className="relative group w-full h-24 bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-blue-400 transition">
                {cover || user.coverPic ? (
                  <img
                    src={cover ? URL.createObjectURL(cover) : "/uploads/" + user.coverPic}
                    className="w-full h-full object-cover"
                    alt="Cover Preview"
                  />
                ) : <Camera className="text-gray-400" />}
                <input
                  type="file"
                  name="profile" // Ye name zaroori hai
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleChange}
                />
                 
              </div>
            </div>

            {/* Profile Photo Upload */}
            <div className="flex flex-col items-center">
              <label className="text-sm font-semibold text-gray-600 mb-2">Profile Picture</label>
              <div className="relative group w-24 h-24 bg-gray-100 rounded-full overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-blue-400 transition">
                {profile || user.profilePic ? (
                  <img
                    src={profile ? URL.createObjectURL(profile) : "/uploads/" + user.profilePic}
                    className="w-full h-full object-cover"
                    alt="Profile Preview"
                  />
                ) : <User className="text-gray-400" size={32} />}
                <input
                  type="file"
                  name="cover" // Ye name zaroori hai
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleChange}
                />
                 
              </div>
            </div>
          </div>

          {/* Text Inputs */}
          <div className="space-y-4">
            <div className="relative">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Full Name</label>
              <div className="flex items-center mt-1 border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition">
                <User size={18} className="text-gray-400 mr-2" />
                <input
                  type="text"
                  name="name"
                  value={texts.name}
                  onChange={handleChange}
                  className="w-full outline-none text-gray-700 bg-transparent"
                  placeholder="What's your name?"
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">City</label>
              <div className="flex items-center mt-1 border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition">
                <MapPin size={18} className="text-gray-400 mr-2" />
                <input
                  type="text"
                  name="city"
                  value={texts.city}
                  onChange={handleChange}
                  className="w-full outline-none text-gray-700 bg-transparent"
                  placeholder="Where do you live?"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setOpenUpdate(false)}
              className="flex-1 py-2.5 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={mutation.isLoading}
              className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-200 flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
              <Save size={18} />
              {mutation.isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;