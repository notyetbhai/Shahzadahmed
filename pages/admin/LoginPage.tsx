
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import AnimatedPage from '../../components/AnimatedPage';

const LoginPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const success = await login(password);
      if (!success) {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during login.');
    }
  };

  return (
    <AnimatedPage>
      <div className="flex items-center justify-center min-h-screen bg-section-gray">
        <div className="w-full max-w-md p-8 space-y-8 bg-background rounded-lg shadow-2xl border border-border-gray">
          <div className="text-center">
            <h1 className="text-3xl font-serif font-bold text-heading">Admin Panel</h1>
            <p className="mt-2 text-sm text-accent">Please enter your credentials to proceed.</p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="password-input" className="sr-only">Password</label>
                <input
                  id="password-input"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-3 border border-border-gray placeholder-gray-500 text-body focus:outline-none focus:ring-accent focus:border-accent sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && <p className="text-sm text-red-600 text-center">{error}</p>}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-button hover:bg-button-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors"
              >
                Login
              </button>
            </div>
          </form>
          <div className="text-center">
            <Link to="/" className="text-sm text-accent hover:text-heading transition-colors duration-300">
              &larr; Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default LoginPage;