import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle, CheckCircle2, User, Calendar, Shield } from 'lucide-react';
import axios from 'axios';

export function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    category: 'student', // Default value
    parent_consent: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const validateForm = () => {
    // Check required fields
    if (!formData.email) {
      setError('Email address is required');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (!formData.confirmPassword) {
      setError('Please confirm your password');
      return false;
    }
    if (!formData.age) {
      setError('Age is required');
      return false;
    }

    // Validate email format
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }

    // Validate password
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    // Validate age
    const age = parseInt(formData.age);
    if (isNaN(age)) {
      setError('Please enter a valid age');
      return false;
    }
    if (age < 12) {
      setError('You must be at least 12 years old to register');
      return false;
    }

    // Check for parental consent if under 18
    if (age < 18 && !formData.parent_consent) {
      setError('Parent/guardian consent is required for users under 18');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) return;

    setLoading(true);

    try {
      console.log('Attempting to register with:', {
        ...formData,
        password: '[REDACTED]',
        confirmPassword: '[REDACTED]'
      });

      const response = await axios.post('http://localhost:5000/api/auth/register', {
        email: formData.email,
        password: formData.password,
        displayName: formData.email.split('@')[0],
        age: parseInt(formData.age),
        category: formData.category,
        parent_consent: formData.parent_consent
      });

      console.log('Registration response:', {
        status: response.status,
        data: response.data
      });

      if (response.data && response.data.token) {
        setSuccess('Registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err: any) {
      console.error('Detailed registration error:', {
        message: err.message,
        response: err.response ? {
          status: err.response.status,
          data: err.response.data,
          headers: err.response.headers
        } : 'No response',
        request: err.request ? 'Request was made but no response received' : 'No request made'
      });

      if (err.message === 'Network Error') {
        setError('Unable to connect to the server. Please make sure the backend server is running (http://localhost:5000)');
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.response?.status === 400) {
        setError('Invalid registration details. Please check your information.');
      } else if (err.response?.status === 409) {
        setError('An account with this email already exists.');
      } else {
        setError(`Registration failed: ${err.message || 'Unknown error'}`);
      }
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
            Join AMASIMBI
          </h1>
          <p className="text-lg text-purple-700 max-w-2xl mx-auto">
            Create your account to access comprehensive reproductive health education
            and join our supportive community of young women in Rwanda.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Information Section */}
          <div className="flex-1 bg-white p-8 rounded-2xl shadow-lg border border-purple-100">
            <h2 className="text-2xl font-semibold text-purple-900 mb-6">
              Important Information
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-purple-900">Age Requirements</h3>
                  <p className="text-gray-600 text-sm">Our platform is designed for young women aged 12-25.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-purple-900">Parental Consent</h3>
                  <p className="text-gray-600 text-sm">If you're under 18, you'll need parent/guardian consent to join.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Lock className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-purple-900">Privacy & Security</h3>
                  <p className="text-gray-600 text-sm">Your information is kept private and secure. We never share personal details.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div className="flex-1 w-full max-w-md">
            <div className="bg-white py-8 px-6 shadow-lg rounded-2xl border border-purple-100">
              <h2 className="text-3xl font-bold text-purple-900 mb-6 text-center">
                Create Account
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg
                               focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                               placeholder-gray-400"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                {/* Password Fields */}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg
                                 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                 placeholder-gray-400"
                        placeholder="Create a password"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg
                                 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                 placeholder-gray-400"
                        placeholder="Confirm your password"
                      />
                    </div>
                  </div>
                </div>

                {/* Age Field */}
                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                    Age *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="age"
                      name="age"
                      type="number"
                      required
                      min="12"
                      value={formData.age}
                      onChange={handleChange}
                      className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg
                               focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                               placeholder-gray-400"
                      placeholder="Enter your age"
                    />
                  </div>
                </div>

                {/* Category Field */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg
                               focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                               text-gray-900"
                    >
                      <option value="student">Student</option>
                      <option value="young_professional">Young Professional</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Parent Consent Checkbox */}
                {parseInt(formData.age) < 18 && (
                  <div className="flex items-start gap-3">
                    <input
                      id="parent_consent"
                      name="parent_consent"
                      type="checkbox"
                      checked={formData.parent_consent}
                      onChange={handleChange}
                      className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label htmlFor="parent_consent" className="text-sm text-gray-600">
                      I confirm that I have parent/guardian consent to join AMASIMBI. 
                      This is required for users under 18 years old.
                    </label>
                  </div>
                )}

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
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>

                {/* Login Link */}
                <p className="text-center text-sm text-gray-600">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="text-purple-600 hover:text-purple-500 font-medium"
                  >
                    Sign in here
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