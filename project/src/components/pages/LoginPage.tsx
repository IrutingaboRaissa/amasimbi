import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await login(email, password);
      setSuccess('Login successful!');
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Context Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-purple-900 mb-4">
            Welcome to AMASIMBI
          </h1>
          <p className="text-lg text-purple-700 max-w-2xl mx-auto">
            Your trusted platform for reproductive health education in Rwanda. We provide a safe, 
            supportive space for young women to learn, connect, and make informed decisions about their health.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Information Section */}
          <div className="flex-1 bg-white p-8 rounded-2xl shadow-lg border border-purple-100">
            <h2 className="text-2xl font-semibold text-purple-900 mb-6">
              Why Join AMASIMBI?
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Access to comprehensive, age-appropriate reproductive health information</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Connect with a supportive community of peers and experts</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Safe, private environment to learn and ask questions</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Resources for both teens and parents to facilitate important conversations</span>
              </li>
            </ul>
          </div>

          {/* Login Form */}
          <div className="flex-1 w-full max-w-md">
            <div className="bg-white py-8 px-6 shadow-lg rounded-2xl border border-purple-100">
              <h2 className="text-3xl font-bold text-purple-900 mb-6 text-center">
                Sign In
              </h2>
              <form onSubmit={handleLogin} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg
                               focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                               placeholder-gray-400 text-gray-900"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg
                               focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                               placeholder-gray-400 text-gray-900"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                    <AlertCircle className="h-5 w-5" />
                    <p className="text-sm">{error}</p>
                  </div>
                )}

                {/* Success Message */}
                {success && (
                  <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
                    <CheckCircle2 className="h-5 w-5" />
                    <p className="text-sm">{success}</p>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                           transition-colors duration-200"
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>

                {/* Registration Link */}
                <p className="text-center text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/register')}
                    className="text-purple-600 hover:text-purple-500 font-medium"
                  >
                    Register here
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 