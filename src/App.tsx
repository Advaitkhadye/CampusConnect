import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './pages/auth/AuthContext';
import { Layout } from './components/layout/Layout';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { Home } from './pages/user/Home';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { Events } from './pages/user/Events';
import { MyRegistrations } from './pages/user/MyRegistrations';

const ProtectedRoute: React.FC<{ children: React.ReactNode; requireAdmin?: boolean }> = ({
  children,
  requireAdmin = false
}) => {
  const { user, role, loading } = useAuth();

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requireAdmin && role !== 'admin') {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <Layout>
              <Home />
            </Layout>
          } />
          <Route path="/register" element={<Register />} />
          <Route path="/events" element={
            <Layout>
              <Events />
            </Layout>
          } />
          <Route path="/my-registrations" element={
            <Layout>
              <MyRegistrations />
            </Layout>
          } />
          <Route path="/admin" element={
            <ProtectedRoute requireAdmin>
              <Layout>
                <AdminDashboard />
              </Layout>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
