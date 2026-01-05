import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './src/contexts/AuthContext';
import { ToastProvider } from './src/contexts/ToastContext';
import { AdminLayout } from './src/components/layout/AdminLayout';
import { LoginPage } from './src/pages/LoginPage';
import { DashboardPage } from './src/pages/DashboardPage';
import { SubmissionsPage } from './src/pages/SubmissionsPage';
import { UsersPage } from './src/pages/UsersPage';
import { MarketplacePage } from './src/pages/MarketplacePage';
import { RolesPermissionsPage } from './src/pages/RolesPermissionsPage';
import { CategoriesPage } from './src/pages/CategoriesPage';
import { AnalyticsPage } from './src/pages/AnalyticsPage';
import { AppControlPage } from './src/pages/AppControlPage';
import { AuditLogsPage } from './src/pages/AuditLogsPage';
import { SettingsPage } from './src/pages/SettingsPage';
import { NotificationsPage } from './src/pages/NotificationsPage';
import { SupportPage } from './src/pages/SupportPage';
export default function App() {
  return <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route path="/" element={<AdminLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="submissions" element={<SubmissionsPage />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="marketplace" element={<MarketplacePage />} />
              <Route path="roles" element={<RolesPermissionsPage />} />
              <Route path="categories" element={<CategoriesPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="app-control" element={<AppControlPage />} />
              <Route path="audit-logs" element={<AuditLogsPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="notifications" element={<NotificationsPage />} />
              <Route path="support" element={<SupportPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>;
}