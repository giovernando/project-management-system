import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import apiClient from '../api/apiClient';
import { FaProjectDiagram, FaMoneyBillWave, FaWarehouse, FaUsers } from 'react-icons/fa';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalAssets: 0,
    totalFinance: 0,
    totalVendors: 0,
  });
  const [financeData, setFinanceData] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchFinanceData();
  }, []);

  const fetchStats = async () => {
    try {
      const [projectsRes, assetsRes, vendorsRes] = await Promise.all([
        apiClient.get('/projects'),
        apiClient.get('/assets'),
        apiClient.get('/vendors'),
      ]);

      setStats({
        totalProjects: projectsRes.data.length,
        totalAssets: assetsRes.data.length,
        totalFinance: 0, // Will be calculated from finance data
        totalVendors: vendorsRes.data.length,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchFinanceData = async () => {
    try {
      const response = await apiClient.get('/finance');
      setFinanceData(response.data);
      const totalFinance = response.data.reduce((sum: number, item: any) => sum + parseFloat(item.amount), 0);
      setStats(prev => ({ ...prev, totalFinance }));
    } catch (error) {
      console.error('Error fetching finance data:', error);
    }
  };

  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Expenses',
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: ['Projects', 'Operations', 'Payroll'],
    datasets: [
      {
        data: [40, 30, 30],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
        ],
      },
    ],
  };

  const StatCard: React.FC<{ title: string; value: string | number; icon: React.ComponentType<any> }> = ({ title, value, icon: Icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center">
        <div className="p-3 rounded-full bg-blue-100">
          <Icon className="text-blue-600" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.name}!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Projects" value={stats.totalProjects} icon={FaProjectDiagram} />
        <StatCard title="Total Assets" value={stats.totalAssets} icon={FaWarehouse} />
        <StatCard title="Total Finance" value={`$${stats.totalFinance.toLocaleString()}`} icon={FaMoneyBillWave} />
        <StatCard title="Total Vendors" value={stats.totalVendors} icon={FaUsers} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>
          <Bar data={barData} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Expense Breakdown</h2>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
