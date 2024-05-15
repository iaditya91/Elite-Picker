import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import AuthContext from '../../authentication/AuthProvider';


const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogOut = () => {
    setAuth({});
    console.log("auth in logout:", auth);
    navigate('/signin');
  }

  return (
    <div className="bg-white min-h-screen">
    <Navbar />
    <main className="container mx-auto py-8">
    <div className="bg-white py-4 px-8 flex justify-between items-center shadow">
      <div className="text-lg font-semibold">
      <a href="/">
          Blood App
        </a>
        </div>
      <div className="flex items-center space-x-4">
        <a onClick={()=>navigate("/accountdetails")} className="text-gray-500 hover:text-gray-700">
          My Account
        </a>
        <a href="#" className="text-gray-500 hover:text-gray-700">
          Download Report
        </a>
        <a onClick={()=>navigate("/supportpage")} className="text-gray-500 hover:text-gray-700">
          Support
        </a>
        <a onClick={handleLogOut} className="text-gray-500 hover:text-gray-700">
          Logout
        </a>
        <div className="relative">
          <div
            className="text-gray-500 flex items-center space-x-2 hover:text-gray-700 cursor-pointer"
            onClick={toggleDropdown}
          >
            
            <div className="flex flex-col space-y-1">
              <div className="w-3 h-1 bg-gray-500 rounded"></div>
              <div className="w-3 h-1 bg-gray-500 rounded"></div>
              <div className="w-3 h-1 bg-gray-500 rounded"></div>
            </div>
          </div>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md py-2 w-48 z-10">
              <a onClick={()=>navigate("/reference")} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                Biomarkers Analysis
              </a>
              <a onClick={()=>navigate("/analysis")} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                Biomarker Visuals
              </a>
              <a onClick={()=>navigate("/recomendations")} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                Diet Recommendations
              </a>
            </div>
          )}
        </div>
      </div>
      </div>
      </main>
    </div>
  );
};

export default Navbar;