import React, { useState } from 'react';
import Vapi from "@vapi-ai/web";
import './App.css';

const vapi = new Vapi(process.env.REACT_APP_VAPI_PUBLIC_KEY);

function App() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false); // Track if speaking

  const handleButtonClick = () => {
    if (isSpeaking) {
      vapi.stop();
    } else {
      vapi.start(process.env.REACT_APP_VAPI_ASSISTANT_ID);
    }

    // Toggle the speaking state and play animation
    setIsSpeaking(!isSpeaking);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="App">
      <h2>Testing LanguageBee</h2>
      <img src="img.png" alt="company" />
      <button
        className={`speak-button ${isAnimating ? 'animate' : ''}`}
        onClick={handleButtonClick}
      >
        {isSpeaking ? "Stop" : "Speak"}
      </button>
    </div>
  );
}

export default App;
