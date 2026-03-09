import './App.css';
import RegistrationPage from './components/registration.jsx';
import LoginPage from './components/login.jsx';
import Home from './components/home.jsx';
import Navbar from './components/navbar.jsx';
import { Route, Routes, Navigate } from 'react-router-dom'; // Navigate bhi add kar diya hai default page ke liye

function App() { 
  return (
    <div className="App">
      <Navbar />

      <Routes> 
        <Route path="/" element={<Home />} />
        
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div> 
  );
}

export default App;