import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';

const Navbar = () => {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(() => {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user).profilePic : null;
});
 

  axios.defaults.withCredentials = true;



  useEffect(() => {
    axios.get('http://localhost:5000/api/user/', {
      withCredentials: true
    })
      .then(response => {
        if (response.data.status === 'Success') {
          console.log('user data', response.data);
          setAuth(true);
          setName(response.data.name);
        } else {
          setAuth(false);
          navigate('/login');
        }
      })
      .catch(() => {
        setAuth(false);
      });

  }, []);

  const handleLogout = () => {
    axios.post('http://localhost:5000/api/auth/logout')
      .then(res => {
        if (res.data.status === 'Success') {
          setAuth(false);
          console.log('user logged out data', res.data.message);
          navigate('/login');
          // window.location.reload(); 
        }
      }).catch(err => console.log(err));
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 h-14 w-full border-b px-2 md:px-4 flex items-center justify-between">

      {/* --- Left: Logo & Search --- */}
      <div className="flex items-center space-x-2 min-w-0">
        <Link to="/home" className="bg-blue-600 text-white font-bold text-2xl md:text-3xl w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full   shrink-0">
          J
        </Link>
        {/* Search Bar: Mobile par sirf icon dikhega ya hide ho jayega */}
        <div className="flex items-center bg-gray-100 rounded-full px-3 py-2 w-10 h-10 md:w-64 md:h-10 overflow-hidden">
          <span className="text-gray-500">🔍</span>
          <input
            type="text"
            placeholder="Search"
            className="hidden md:block bg-transparent outline-none text-sm ml-2 w-full"
          />
        </div>
      </div>



      {/* --- Right: Icons & Auth --- */}
      <div className="flex items-center space-x-1 md:space-x-2">
        {auth ? (
          <>
            {/* Profile: Mobile par text hide kar diya */}


            {/* Profile Section */}
            <div className="flex items-center hover:bg-gray-100 rounded-full p-1 cursor-pointer transition">
              {/* Avatar Circle */}
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs uppercase shadow-sm">
                <img src={profileImage ? "/uploads/" + profileImage : "/default-avatar.png"} alt="Profile" className="w-full h-full object-cover rounded-full" />
              </div>

              {/* Name Text */}
              <span className="  lg:block ml-2 font-semibold text-sm mr-2 text-gray-800">
                {name}
              </span>
            </div>

            {/* Notification Icons */}
            <div className="flex items-center space-x-1">
              <button title="Messenger" className="w-8 h-8 md:w-10 md:h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition text-lg">💬</button>
              <button title="Notifications" className="w-8 h-8 md:w-10 md:h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition text-lg">🔔</button>

              {/* Logout Button: Responsive fix */}
              <button
                onClick={handleLogout}
                title="Logout"
                className="cursor-pointer w-22 h-8 md:w-22 md:h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition"
              >
                <span className="text-lg">🚪</span>
                <span className="md:inline text-xs font-bold ml-1">Log Out</span>
              </button>
            </div>
          </>
        ) : (
          <div className="flex space-x-1">
            <Link to="/login" className="text-sm font-semibold text-blue-600 px-3 py-2">Log In</Link>
            <Link to="/register" className="text-sm font-semibold bg-blue-600 text-white px-3 py-2 rounded-md">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;