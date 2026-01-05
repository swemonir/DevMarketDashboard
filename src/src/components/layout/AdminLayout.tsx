import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { useAuth } from '../../contexts/AuthContext';
import { LoadingSpinner } from '../ui/LoadingSpinner';
export function AdminLayout() {
  const {
    user,
    isLoading
  } = useAuth();
  if (isLoading) {
    return <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <LoadingSpinner />
      </div>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <div className="min-h-screen bg-gray-950 text-gray-100 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64 min-w-0">
        <TopBar />
        <main className="flex-1 p-8 overflow-y-auto custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-8 pb-12">
            <Outlet />
          </div>
        </main>
      </div>
    </div>;
}