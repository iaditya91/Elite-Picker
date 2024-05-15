import React, { useState } from 'react';
import backgroundImage from '../images/background.jpg';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { FaDna } from 'react-icons/fa';
import { triggerPostFormWithAuth } from '../api/axiosFunctions';
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Signup request to the server
      const formData = new FormData();
      formData.append('username', email);
      formData.append('password', password);
      formData.append('name', name);
      await triggerPostFormWithAuth('/api/signup', formData);

      // Reset form fields
      setEmail('');
      setPassword('');
      setName('');
      navigate('/signin');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full opacity-95">
        <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center text-indigo-600">
          <span className="text-pink-500">Blood App</span>        
          <FaDna className="text-red-600 mx-2" />
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="flex items-center border rounded bg-gray-100 px-3 py-2">
              <FaUser className="text-gray-500 mr-2" />
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                className="bg-gray-100 w-full focus:outline-none"
                placeholder="Name"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-center border rounded bg-gray-100 px-3 py-2">
              <FaEnvelope className="text-gray-500 mr-2" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className="bg-gray-100 w-full focus:outline-none"
                placeholder="Email"
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <div className="flex items-center border rounded bg-gray-100 px-3 py-2">
              <FaLock className="text-gray-500 mr-2" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className="bg-gray-100 w-full focus:outline-none"
                placeholder="Password"
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
            
          </div>
        </form>
        <div>If already have an account? <a href='/signin' className="text-blue-500 underline">Sign In</a></div>
        <>
        </>
      </div>
    </div>
  );
};

export default SignupForm;