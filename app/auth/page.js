'use client';
import { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup } = useAuth();
  const router = useRouter();

  const isSignupMode = email.length > 0;

  const performAuthentication = async (authMode) => {
    setErrorMessage('');
    setIsLoading(true);
    try {
      authMode === 'login' 
        ? await login(email, password) 
        : await signup(email, password);
      router.push('/dashboard');
    } catch (err) {
      setErrorMessage(err.message || 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          {isSignupMode ? 'Create Account' : 'Welcome Back'}
        </h1>
        
        <AuthForm
          email={email}
          password={password}
          errorMessage={errorMessage}
          isLoading={isLoading}
          isSignupMode={isSignupMode}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onLoginClick={() => performAuthentication('login')}
          onSignupClick={() => performAuthentication('signup')}
        />
        
        <p className="text-center mt-4 text-gray-600 text-sm">
          By continuing you agree to the terms of service.
        </p>
      </div>
    </div>
  );
}

function AuthForm({
  email,
  password,
  errorMessage,
  isLoading,
  isSignupMode,
  onEmailChange,
  onPasswordChange,
  onLoginClick,
  onSignupClick,
}) {
  return (
    <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isLoading}
        required
      />
      
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => onPasswordChange(e.target.value)}
        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isLoading}
        required
      />
      
      {errorMessage && (
        <div className="bg-red-100 text-red-600 p-3 rounded-md text-sm">
          {errorMessage}
        </div>
      )}
      
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onLoginClick}
          disabled={isLoading}
          className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Processing...' : 'Login'}
        </button>
        <button
          type="button"
          onClick={onSignupClick}
          disabled={isLoading}
          className="flex-1 border border-gray-300 text-gray-800 py-3 rounded-lg font-medium bg-white hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Processing...' : 'Sign Up'}
        </button>
      </div>
    </form>
  );
}
