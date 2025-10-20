import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FaBell, FaUser } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 text-gray-600 hover:text-gray-800">
          <FaBell />
        </button>

        <div className="flex items-center space-x-2">
          <FaUser className="text-gray-600" />
          <span className="text-sm text-gray-700">{user?.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
