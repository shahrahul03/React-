import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import logo from "../img/logo.png";
import { validateLoginForm, validateRegistrationForm, validateForgotPasswordForm } from './validation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerAddress, setRegisterAddress] = useState('');
  const [registerContactNumber, setRegisterContactNumber] = useState('');
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [activeForm, setActiveForm] = useState('login');

  const switchToForm = (formName) => {
    setActiveForm(formName);
    setErrors({});
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = validateLoginForm(email, password);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log('Logging in with:', email, password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const validationErrors = validateRegistrationForm(registerEmail, registerPassword, registerName, registerAddress, registerContactNumber);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: registerName,
          email: registerEmail,
          password: registerPassword,
          address: registerAddress,
          contactNumber: registerContactNumber,
        }),
      });

      const data = await response.json();
      if (response.status === 201) {
        console.log('User registered successfully:', data);
        switchToForm('login');
      } else {
        console.error('Error registering user:', data.message);
        setErrors({ registerEmail: data.message });
      }
    } catch (error) {
      console.error('Server error:', error);
      setErrors({ registerEmail: 'Server error' });
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const validationErrors = validateForgotPasswordForm(forgotPasswordEmail);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log('Forgot password for:', forgotPasswordEmail);
  };

  const handleGoogleLoginSuccess = (googleUser) => {
    const profile = googleUser.getBasicProfile();
    const email = profile.getEmail();
    console.log('Logged in with Google:', email);
  };

  const handleGoogleLoginFailure = (error) => {
    console.error('Google login failed:', error);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-r from-red-200 to-purple-200">
      <div className="w-full md:w-1/2 flex justify-center md:justify-end">
        <img src={logo} alt="Logo" className="hidden md:block max-h-full max-w-full object-contain rounded-3xl" />
      </div>
      <div className="w-full md:w-1/2 p-8 flex justify-center ">
        <div className="w-full max-w-sm">
          {activeForm === 'login' && (
            <form onSubmit={handleLogin} className="bg-white shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4 bg-gradient-to-r from-purple-300 to-red-300">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Login</h2>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-1 text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="Enter your email"
                  required
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block mb-1 text-gray-700">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : ''}`}
                  placeholder="Enter your password"
                  required
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>
              <button type="submit" className="w-1/2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-900 transition duration-200">Login</button>
              <p className="text-center mt-4 text-sm text-gray-600">
                <span className="cursor-pointer text-blue-700" onClick={() => switchToForm('register')}>Register</span> | <span className="cursor-pointer text-blue-600" onClick={() => switchToForm('forgot-password')}>Forgot Password?</span>
              </p>
              <GoogleLogin
                clientId="your-client-id-from-google-developer-console"
                buttonText="Login with Google"
                onSuccess={handleGoogleLoginSuccess}
                onFailure={handleGoogleLoginFailure}
                cookiePolicy={'single_host_origin'}
                className="w-full mt-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200"
              />
            </form>
          )}
          {activeForm === 'register' && (
            <form onSubmit={handleRegister} className="bg-white shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4 bg-gradient-to-r from-purple-300 to-red-300">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Register</h2>
              <div className="mb-4">
                <label htmlFor="registerName" className="block mb-1 text-gray-700">Name</label>
                <input
                  type="text"
                  id="registerName"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.registerName ? 'border-red-500' : ''}`}
                  placeholder="Enter your name"
                  required
                />
                {errors.registerName && <p className="text-red-500 text-sm mt-1">{errors.registerName}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="registerEmail" className="block mb-1 text-gray-700">Email</label>
                <input
                  type="email"
                  id="registerEmail"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.registerEmail ? 'border-red-500' : ''}`}
                  placeholder="Enter your email"
                  required
                />
                {errors.registerEmail && <p className="text-red-500 text-sm mt-1">{errors.registerEmail}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="registerPassword" className="block mb-1 text-gray-700">Password</label>
                <input
                  type="password"
                  id="registerPassword"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.registerPassword ? 'border-red-500' : ''}`}
                  placeholder="Enter your password"
                  required
                />
                {errors.registerPassword && <p className="text-red-500 text-sm mt-1">{errors.registerPassword}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="registerAddress" className="block mb-1 text-gray-700">Address</label>
                <input
                  type="text"
                  id="registerAddress"
                  value={registerAddress}
                  onChange={(e) => setRegisterAddress(e.target.value)}
                  className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.registerAddress ? 'border-red-500' : ''}`}
                  placeholder="Enter your address"
                  required
                />
                {errors.registerAddress && <p className="text-red-500 text-sm mt-1">{errors.registerAddress}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="registerContactNumber" className="block mb-1 text-gray-700">Contact Number</label>
                <input
                  type="text"
                  id="registerContactNumber"
                  value={registerContactNumber}
                  onChange={(e) => setRegisterContactNumber(e.target.value)}
                  className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.registerContactNumber ? 'border-red-500' : ''}`}
                  placeholder="Enter your contact number"
                  required
                />
                {errors.registerContactNumber && <p className="text-red-500 text-sm mt-1">{errors.registerContactNumber}</p>}
              </div>
              <button type="submit" className="w-1/2 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-900 transition duration-200">Register</button>
              <p className="text-center mt-4 text-lg text-gray-600">
                <span className="cursor-pointer text-blue-900" onClick={() => switchToForm('login')}>Back to Login</span>
              </p>
            </form>
          )}
          {activeForm === 'forgot-password' && (
            <form onSubmit={handleForgotPassword} className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 mt-0 bg-gradient-to-r from-purple-300 to-red-300">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Forgot Password</h2>
              <div className="mb-4">
                <label htmlFor="forgotPasswordEmail" className="block mb-1 text-gray-700">Email</label>
                <input
                  type="email"
                  id="forgotPasswordEmail"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                  className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.forgotPasswordEmail ? 'border-red-500' : ''}`}
                  placeholder="Enter your email"
                  required
                />
                {errors.forgotPasswordEmail && <p className="text-red-500 text-sm mt-1">{errors.forgotPasswordEmail}</p>}
              </div>
              <button type="submit" className="w-1/2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-900 transition duration-200">Send</button>
              <p className="text-center mt-4 text-lg text-gray-600">
                <span className="cursor-pointer text-blue-600" onClick={() => switchToForm('login')}>Back to Login</span>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
