import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

// Public navigation items
const publicNavItems = [
  { name: 'Home', link: '/' },
  { name: 'About', link: '/about' },
  { name: 'Resources', link: '/resources' },
  { name: 'Contact', link: '/contact' }
];

// Private navigation items (only shown when logged in)
const privateNavItems = [
  { name: 'Dashboard', link: '/dashboard' },
  { name: 'Learn', link: '/learn' },
  { name: 'Community', link: '/community' },
  { name: 'Profile', link: '/profile' }
];

export function Header() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-purple-600">Amasimbi</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {publicNavItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.link}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-purple-600"
                >
                  {item.name}
                </Link>
              ))}
              {user && privateNavItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.link}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-purple-600"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  Welcome, {user.displayName}
                </span>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="text-sm"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="ghost" className="text-sm">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="text-sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
} 