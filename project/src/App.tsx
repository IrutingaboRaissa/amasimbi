import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Navbar } from '@/components/Navbar';
import { HomePage } from '@/components/pages/HomePage';
import { LoginPage } from '@/components/pages/LoginPage';
import { RegisterPage } from '@/components/pages/RegisterPage';
import { CommunityPage } from '@/components/pages/CommunityPage';
import { ResourcesPage } from '@/components/pages/ResourcesPage';
import { ProfilePage } from '@/components/pages/ProfilePage';
import { AboutPage } from '@/components/pages/AboutPage';
import { ContactPage } from '@/components/pages/ContactPage';
import { LearnPage } from '@/components/pages/LearnPage';
import { DashboardPage } from '@/components/pages/DashboardPage';

// Helper component to determine if we should show the navbar
function AppContent() {
  const location = useLocation();
  const hideNavbarPaths = ['/dashboard', '/profile'];
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
      {shouldShowNavbar && <Navbar />}
      <main className={`container mx-auto px-4 py-8 ${!shouldShowNavbar ? 'pt-0' : ''}`}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/resources" element={<ResourcesPage />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/learn"
            element={
              <ProtectedRoute>
                <LearnPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/community"
            element={
              <ProtectedRoute>
                <CommunityPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export { App };