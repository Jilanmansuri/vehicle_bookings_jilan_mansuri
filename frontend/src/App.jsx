import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CircularProgress } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AdminLayout from './components/AdminLayout';
import { ProtectedRoute } from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy loaded pages
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const BookingsList = lazy(() => import('./pages/BookingsList'));
const UsersList = lazy(() => import('./pages/UsersList'));
const VehiclesList = lazy(() => import('./pages/VehiclesList'));
const DriversList = lazy(() => import('./pages/DriversList'));
const LocationsList = lazy(() => import('./pages/LocationsList'));
const PaymentsList = lazy(() => import('./pages/PaymentsList'));
const Settings = lazy(() => import('./pages/Settings'));
const ActivityLogsList = lazy(() => import('./pages/ActivityLogsList'));

const FallbackLoader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-gray-50 dark:bg-[#0f172a]">
    <CircularProgress size={60} thickness={4} />
  </div>
);

function App() {
  const mode = useSelector((state) => state.ui.themeMode);

  const theme = createTheme({
    palette: {
      mode: mode,
      primary: {
        main: '#3b82f6', // Tailwind blue-500
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <BrowserRouter>
          <Suspense fallback={<FallbackLoader />}>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Routes (AdminLayout handles the sidebar, ProtectedRoute handles auth) */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                {/* Available for both Admin and User */}
                <Route index element={<Dashboard />} />
                <Route path="bookings" element={<BookingsList />} />
                <Route path="vehicles" element={<VehiclesList />} />
                <Route path="payments" element={<PaymentsList />} />
                <Route path="history" element={<BookingsList />} /> {/* Dummy for now */}
                <Route path="settings" element={<Settings />} />

                {/* Admin Only Routes */}
                <Route path="users" element={<ProtectedRoute requireAdmin><UsersList /></ProtectedRoute>} />
                <Route path="drivers" element={<ProtectedRoute requireAdmin><DriversList /></ProtectedRoute>} />
                <Route path="locations" element={<ProtectedRoute requireAdmin><LocationsList /></ProtectedRoute>} />
                <Route path="activity" element={<ProtectedRoute requireAdmin><ActivityLogsList /></ProtectedRoute>} />
                
                {/* Fallback */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        <ToastContainer position="top-right" theme={mode} />
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
