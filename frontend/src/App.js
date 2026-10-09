import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import InternshipDetail from './components/internships/InternshipDetail';
import PostInternshipPage from './pages/PostInternshipPage';
import MyApplicationsPage from './pages/MyApplicationsPage';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/internship/:id" element={<InternshipDetail />} />
            <Route path="/post-internship" element={
              <PrivateRoute>
                <PostInternshipPage />
              </PrivateRoute>
            } />
            <Route path="/my-applications" element={
              <PrivateRoute>
                <MyApplicationsPage />
              </PrivateRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;