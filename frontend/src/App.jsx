import './App.css';
import RegistrationPage from './components/auth/registration.jsx';
import LoginPage from './components/auth/login.jsx';
import Home from './components/home/home.jsx';
import Navbar from './components/navbar/navbar.jsx';
import { Route, Routes, Navigate } from 'react-router-dom'; // Navigate bhi add kar diya hai default page ke liye
import { QueryClient,  QueryClientProvider  } from '@tanstack/react-query'

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;