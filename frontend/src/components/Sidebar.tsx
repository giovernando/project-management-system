import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useRole as useRoleContext } from '../context/RoleContext';
import {
  FaHome,
  FaProjectDiagram,
  FaMoneyBillWave,
  FaWarehouse,
  FaUsers,
  FaFileAlt,
  FaBuilding,
  FaCog,
  FaSignOutAlt,
} from 'react-icons/fa';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { logout, user } = useAuth();
  const { hasRole } = useRoleContext();

  const menuItems = [
    { path: '/dashboard', icon: FaHome, label: 'Dashboard', roles: ['super_admin', 'keuangan', 'user'] },
    { path: '/projects', icon: FaProjectDiagram, label: 'Projects', roles: ['super_admin', 'keuangan', 'user'] },
    { path: '/finance', icon: FaMoneyBillWave, label: 'Finance', roles: ['super_admin', 'keuangan'] },
    { path: '/inventory', icon: FaWarehouse, label: 'Inventory', roles: ['super_admin', 'keuangan', 'user'] },
    { path: '/vendors', icon: FaUsers, label: 'Vendors', roles: ['super_admin', 'keuangan', 'user'] },
    { path: '/reports', icon: FaFileAlt, label: 'Reports', roles: ['super_admin', 'keuangan', 'user'] },
    { path: '/company-profile', icon: FaBuilding, label: 'Company Profile', roles: ['super_admin'] },
    { path: '/settings', icon: FaCog, label: 'Settings', roles: ['super_admin'] },
  ];

  const filteredMenuItems = menuItems.filter(item => hasRole(item.roles));

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold">Project Management</h1>
        <p className="text-sm text-gray-400">Welcome, {user?.name}</p>
        <p className="text-xs text-gray-500 capitalize">{user?.role.replace('_', ' ')}</p>
      </div>

      <nav>
        <ul className="space-y-2">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Icon />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <button
          onClick={logout}
          className="flex items-center space-x-3 px-4 py-2 w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
