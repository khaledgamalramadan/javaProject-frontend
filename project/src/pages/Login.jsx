import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.includes('admin')) {
      navigate('/admin');
    } else {
      navigate('/student');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-200 to-gray-300"> {/* تدرج للخلفية */}
      {/* Container */}
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8"> {/* زيادة padding */}
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          {/* Graduation Icon */}
          <div className="text-6xl text-gray-700 mb-4">🎓</div>
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 text-center">Training Management System</h1>
          <p className="text-gray-600 text-sm mt-2">Sign in to your account</p>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out" // تحسينات في الحواف
              placeholder="Enter your email"
              required
            />
          </div>
          {/* Password */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out" // تحسينات في الحواف
              placeholder="Enter your password"
              required
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-md" // إضافة ظل للزر
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
