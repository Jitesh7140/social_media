import axios from 'axios';

export const loginUser = async (formData) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', formData);
    return response.data;
  } catch (error) {  
    return { success: false, message: error.response ? error.response.data.message : "Login failed" };
  }
};