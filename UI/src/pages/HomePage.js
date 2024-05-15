import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import AuthContext from '../authentication/AuthProvider';

function HomePage() {
  const { auth } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [voiceInput, setVoiceInput] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value;
      setSearchTerm(searchTerm);
      // const suggestions = get Suggestions(searchTerm);
      // setSuggestions(suggestions);
    });
  }, []);

  const Suggestions = (searchTerm) => {
    // Implement your search algorithm here
    // For example, you can use a simple autocomplete algorithm
    const suggestions = [];
    const words = searchTerm.split(' ');
    words.forEach((word) => {
      suggestions.push({ text: word, score: 1 });
    });
    return suggestions;
  };

  const handleVoiceInput = () => {
    // Implement your voice input logic here
    // For example, you can use the Web Speech API
    // const speechRecognition = new WebSpeechRecognition();
    // speechRecognition.onresult = (event) => {
    //   const voiceInput = event.results[0][0].transcript;
    //   setVoiceInput(voiceInput);
    // };
    // speechRecognition.start();
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <h1 className="text-3xl font-bold">Search Bar</h1>
      <div className="flex justify-center mb-4">
        <input
          id="search-input"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="w-3/4 p-2 text-lg text-gray-700 border border-gray-400 rounded"
        />
        <button
          onClick={handleVoiceInput}
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        >
          Voice
        </button>
      </div>
      <ul className="list-none p-0 m-0">
        {suggestions.map((suggestion) => (
          <li
            key={suggestion.text}
            className="py-2 px-4 border-b border-gray-400"
          >
            {suggestion.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;