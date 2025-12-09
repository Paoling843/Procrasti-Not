import React, { useState } from 'react';
import { useAuth } from '../context/AutContext';
import { useNavigate, Link } from 'react-router-dom';

export default function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    if (!name.trim()) return 'Name is required';
    if (!email.includes('@')) return 'Please enter a valid email';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return null;
  };

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (err) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      // mark user as authenticated in context
      login();
      // navigate to dashboard/home after successful registration
      navigate('/');
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-semibold mb-4">Create an account</h1>

        {errors && (
          <div className="bg-red-50 text-red-700 p-2 mb-4 rounded">{errors}</div>
        )}

        {success ? (
          <div className="bg-green-50 text-green-800 p-3 rounded">
            Registration successful. You are now signed in.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label className="block mb-2 text-sm font-medium">Name</label>
            <input
              className="w-full border rounded px-3 py-2 mb-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              required
            />

            <label className="block mb-2 text-sm font-medium">Email</label>
            <input
              className="w-full border rounded px-3 py-2 mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              type="email"
              required
            />

            <label className="block mb-2 text-sm font-medium">Password</label>
            <input
              className="w-full border rounded px-3 py-2 mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Choose a password"
              type="password"
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? 'Creating…' : 'Create account'}
            </button>

            <p className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
