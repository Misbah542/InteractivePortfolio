import React, { useState, useEffect, useRef } from 'react';
import GameEngine from './components/GameEngine';
import LoadingScreen from './components/UI/LoadingScreen';
import Modal from './components/UI/Modal';
import Controls from './components/UI/Controls';
import { portfolioData } from './data/portfolio.json';
import { gameConfig } from './data/gameConfig';
import AudioManager from './components/AudioManager';
import './assets/sprites/sprites.css';

function App() {
  const canvasRef = useRef(null);
  const gameEngineRef = useRef(null);
  const audioManagerRef = useRef(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [showControls, setShowControls] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentZone, setCurrentZone] = useState('Home Base');

  useEffect(() => {
    // Initialize audio manager
    audioManagerRef.current = new AudioManager();
    
    // Initialize game after a short delay
    const initTimer = setTimeout(() => {
      initializeGame();
    }, 1000);

    return () => clearTimeout(initTimer);
  }, []);

  const initializeGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gameEngine = new GameEngine(canvas, {
      ...gameConfig,
      onZoneChange: (zoneName) => setCurrentZone(zoneName),
      onInteract: (type, data) => handleInteraction(type, data),
      audioManager: audioManagerRef.current
    });

    gameEngineRef.current = gameEngine;
    gameEngine.start();
    
    // Hide loading screen
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleInteraction = (type, data) => {
    if (soundEnabled) {
      audioManagerRef.current.playSound('interact');
    }
    
    setModalContent({ type, data });
    setShowModal(true);
  };

  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    audioManagerRef.current.toggleMute(!newState);
  };

  const handleCloseModal = () => {
    if (soundEnabled) {
      audioManagerRef.current.playSound('ui_close');
    }
    setShowModal(false);
  };

  return (
    <div className="w-full h-screen bg-game-bg relative overflow-hidden font-game">
      {/* Game Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 cursor-pointer"
        id="gameCanvas"
      />
      
      {/* Loading Screen */}
      {isLoading && <LoadingScreen />}
      
      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {/* Current Zone Display */}
        <div className="absolute top-4 left-4 bg-gray-900/80 px-4 py-2 rounded-lg pointer-events-auto">
          <p className="text-white text-lg flex items-center gap-2">
            <span className="text-2xl">📍</span>
            <span className="font-bold">{currentZone}</span>
          </p>
        </div>
        
        {/* Controls */}
        {showControls && (
          <Controls onClose={() => setShowControls(false)} />
        )}
        
        {/* Sound Toggle */}
        <button
          onClick={toggleSound}
          className="absolute top-4 right-52 bg-gray-900/80 p-3 rounded-lg pointer-events-auto hover:bg-gray-800 transition-all"
          aria-label={soundEnabled ? "Mute sound" : "Unmute sound"}
        >
          {soundEnabled ? (
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          )}
        </button>
        
        {/* Help Button */}
        <button
          onClick={() => setShowControls(true)}
          className="absolute top-4 right-32 bg-gray-900/80 p-3 rounded-lg pointer-events-auto hover:bg-gray-800 transition-all"
          aria-label="Show controls"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
        
        {/* Download Resume Button */}
        <button
          onClick={() => window.open('/resume.pdf', '_blank')}
          className="absolute top-4 right-12 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg pointer-events-auto transition-all flex items-center gap-2 text-white"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Resume
        </button>
      </div>
      
      {/* Modal */}
      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={handleCloseModal}
          content={modalContent}
          portfolioData={portfolioData}
        />
      )}
    </div>
  );
}

export default App;