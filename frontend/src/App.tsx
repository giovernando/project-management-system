import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RoleProvider } from './context/RoleContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <RoleProvider>
        <Router>
          <div className="min-h-screen bg-gray-100">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <div className="flex">
                      <Sidebar />
                      <div className="flex-1 ml-64">
                        <Navbar />
                        <main className="p-6">
                          <Routes>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/" element={<Navigate to="/dashboard" replace />} />
                            {/* Add more protected routes here */}
                          </Routes>
                        </main>
                      </div>
                    </div>
                  </ProtectedRoute>
                }
              />
            </Routes>
            <ToastContainer position="top-right" autoClose={3000} aria-label="Toast notifications" />
          </div>
        </Router>
      </RoleProvider>
    </AuthProvider>
  );
};

export default App;
