import React from "react";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LeftSidebar = () => {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState('');
  const navigate = useNavigate();

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

  return (
    <aside className="hidden md:block col-span-1 sticky top-20 h-fit">
      <ul className="space-y-4 font-medium text-gray-800">
        <li className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
          <div className="w-8 h-8 bg-blue-500 rounded-full"> </div>
          <span>{name}</span>
        </li>

        <li className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
          <span className="text-xl">👥</span>
          <span>Friends</span>
        </li>

        <li className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
          <span className="text-xl">🕒</span>
          <span>Memories</span>
        </li>

        <li className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
          <span className="text-xl">🚩</span>
          <span>Pages</span>
        </li>
      </ul>
    </aside>
  );
};

export default LeftSidebar;