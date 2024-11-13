import React, { useState, useEffect } from 'react';
import Vapi from "@vapi-ai/web";
import AnimatedCharacter from './AnimatedCharacter';
import './App.css';

const vapi = new Vapi(process.env.REACT_APP_VAPI_PUBLIC_KEY);

function App() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);

  useEffect(() => {
    // Set up speech detection
    const handleSpeechStart = () => {
      console.log('Speech started');
      setIsSpeaking(true);
    };

    const handleSpeechEnd = () => {
      console.log('Speech ended');
      setIsSpeaking(false);
    };

    // Listen for Vapi events
    vapi.on('speech-start', handleSpeechStart);
    vapi.on('speech-end', handleSpeechEnd);

    // Cleanup listeners
    return () => {
      vapi.off('speechStart', handleSpeechStart);
      vapi.off('speechEnd', handleSpeechEnd);
    };
  }, []);

  const handleButtonClick = async () => {
    try {
      if (isSessionActive) {
        // Stop the session
        await vapi.stop();
        setIsSessionActive(false);
      } else {
        // Start the session
        await vapi.start(process.env.REACT_APP_VAPI_ASSISTANT_ID);
        setIsSessionActive(true);
      }

      // Button animation
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    } catch (error) {
      console.error('Error handling Vapi session:', error);
      setIsSessionActive(false);
    }
  };

  return (
    <div className="App">
      <h2>Testing LanguageBee</h2>
      <div className="character-container">
        <AnimatedCharacter isSpeaking={isSpeaking} />
      </div>
      <button
        className={`speak-button ${isAnimating ? 'animate' : ''}`}
        onClick={handleButtonClick}
      >
        {isSessionActive ? "Stop" : "Speak"}
      </button>
    </div>
  );
}

export default App;