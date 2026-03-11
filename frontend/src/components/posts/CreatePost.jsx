import { useState, useRef } from "react";
import { Image, MapPin, Users, X } from "lucide-react"; // X icon preview hatane ke liye
import axios from "axios";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { makerequest } from "../../axios";


const CreatePost = ({ addPost, name = "Test2" }) => {
  const [text, setText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // Actual file store karne ke liye
  const [preview, setPreview] = useState(null); // UI mein dikhane ke liye
  const fileInputRef = useRef(null); // Input ko trigger karne ke liye

  const upload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    console.log("Uploading file:", file.name); // Debugging line

    try {
      const response = await makerequest.post("/upload", formData);
      return response.data.filename;
    } catch (error) {
      // Isse exact error message milega backend se
      console.error("Backend Error Message:", error.response?.data);
      return null;
    }
  };


  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (newPost) => axios.post("http://localhost:5000/api/posts", newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  // Image select karne ka function
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file)); // File ko preview URL mein convert karna
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Agar na text hai na image, toh submit na karein
    if (!text.trim() && !selectedImage) return;

    let imgURL = "";
    if (selectedImage) {
      imgURL = await upload(selectedImage); // Image ko server pe upload karke filename le rahe hain
    }

    console.log("Submitting post with data:", { user: name, desc: text, img: imgURL });
    // Mutation trigger karein
    mutation.mutate({
      user: name,
      desc: text,
      img: imgURL, // Backend filename (e.g., "1723456.jpg") ya empty string
    });

    // Reset form after submission
    setText("");
    setSelectedImage(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = ""; // Input field clear karne ke liye
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 w-full   mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden shrink-0">
          <img
            src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png"
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="grow flex flex-col gap-2">
          <textarea
            placeholder={`What's on your mind, ${name}?`}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full text-black outline-none text-md py-2 resize-none min-h-10"
            rows="2"
          />
        </div>
      {/* Image Preview Section */}
      {preview && (
    <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200 shrink-0 shadow-sm">
      <button
        onClick={() => { setPreview(null); setSelectedImage(null); }}
        className="absolute top-1 right-1 bg-black/50 p-0.5 rounded-full text-white hover:bg-black z-10"
      >
        <X size={14} />
      </button>
      <img src={preview} alt="upload-preview" className="w-full h-full object-cover" />
    </div>
  )}
      </div>


      <hr className="border-gray-100 mb-3" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          {/* Custom Add Image Button */}
          <button
            onClick={() => fileInputRef.current.click()}
            className="flex items-center gap-2 text-gray-500 hover:bg-gray-50 p-2 rounded-lg transition"
          >
            <Image size={18} className="text-green-400" />
            <span className="text-xs font-medium hidden sm:block">Add Image</span>
          </button>

          <button className="flex items-center gap-2 text-gray-500 hover:bg-gray-50 p-2 rounded-lg transition">
            <MapPin size={18} className="text-red-400" />
            <span className="text-xs font-medium hidden sm:block">Add Place</span>
          </button>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!text.trim() && !selectedImage}
          className={`px-8 py-1.5 rounded-md font-semibold text-sm transition ${text.trim() || selectedImage
            ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
            : "bg-blue-300 text-white cursor-not-allowed"
            }`}

        >  Share </button>
      </div>
    </div>
  );
};

export default CreatePost;