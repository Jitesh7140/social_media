import axios from 'axios';

export const registerUser = async (formData) => {
  try {
    const response = await axios.post('http://localhost:5000/api/register', formData);
    return response.data;
  } catch (error) {  
    return { success: false, message: error.response ? error.response.data.message : "Registration failed" };
  }
};