import React, { useState, useEffect } from 'react';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');
  
  const loadingSteps = [
    { progress: 10, text: 'Loading game engine...' },
    { progress: 25, text: 'Creating world zones...' },
    { progress: 40, text: 'Spawning interactive objects...' },
    { progress: 55, text: 'Generating particle effects...' },
    { progress: 70, text: 'Preparing audio system...' },
    { progress: 85, text: 'Finalizing experience...' },
    { progress: 100, text: 'Ready to explore!' }
  ];

  useEffect(() => {
    let currentStep = 0;
    
    const interval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep];
        setProgress(step.progress);
        setLoadingText(step.text);
        currentStep++;
      } else {
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-game-bg z-50 flex items-center justify-center">
      <div className="max-w-md w-full px-8">
        <div className="text-center mb-8">
          {/* Animated Logo */}
          <div className="mb-6 relative">
            <div className="text-8xl animate-bounce-slow">🎮</div>
            <div className="absolute inset-0 text-8xl animate-ping opacity-30">🎮</div>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-2 animate-pulse">
            Android Dev World
          </h1>
          <p className="text-gray-400">An Interactive Portfolio Experience</p>
        </div>
        
        {/* Loading Bar */}
        <div className="mb-4">
          <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        {/* Loading Text */}
        <p className="text-center text-gray-400 text-sm animate-pulse">
          {loadingText}
        </p>
        
        {/* Loading Tips */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            💡 Tip: Use WASD or arrow keys to move around the world
          </p>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;