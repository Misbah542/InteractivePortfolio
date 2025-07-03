import React from 'react';
import { X, Keyboard, Mouse, Gamepad2, Smartphone } from 'lucide-react';

const Controls = ({ onClose }) => {
  return (
    <div className="absolute top-24 left-4 bg-gray-900/95 backdrop-blur-sm rounded-lg p-6 max-w-sm pointer-events-auto shadow-2xl border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-bold text-lg flex items-center gap-2">
          <Gamepad2 className="w-5 h-5 text-blue-400" />
          Controls
        </h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-800 rounded"
          aria-label="Close controls"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <div className="space-y-4">
        {/* Desktop Controls */}
        <div className="space-y-2">
          <h4 className="text-blue-400 font-semibold flex items-center gap-2">
            <Keyboard className="w-4 h-4" />
            Keyboard
          </h4>
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2 text-gray-300">
              <kbd className="px-2 py-1 bg-gray-800 rounded text-xs font-mono">W</kbd>
              <kbd className="px-2 py-1 bg-gray-800 rounded text-xs font-mono">A</kbd>
              <kbd className="px-2 py-1 bg-gray-800 rounded text-xs font-mono">S</kbd>
              <kbd className="px-2 py-1 bg-gray-800 rounded text-xs font-mono">D</kbd>
              <span className="text-gray-400">Move character</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <kbd className="px-2 py-1 bg-gray-800 rounded text-xs font-mono">↑</kbd>
              <kbd className="px-2 py-1 bg-gray-800 rounded text-xs font-mono">←</kbd>
              <kbd className="px-2 py-1 bg-gray-800 rounded text-xs font-mono">↓</kbd>
              <kbd className="px-2 py-1 bg-gray-800 rounded text-xs font-mono">→</kbd>
              <span className="text-gray-400">Alternative movement</span>
            </div>
          </div>
        </div>
        
        {/* Mouse Controls */}
        <div className="space-y-2">
          <h4 className="text-blue-400 font-semibold flex items-center gap-2">
            <Mouse className="w-4 h-4" />
            Mouse
          </h4>
          <div className="space-y-1 text-sm text-gray-300">
            <p>🖱️ Click on objects to interact</p>
            <p>🎯 Hover for information</p>
          </div>
        </div>
        
        {/* Mobile Controls */}
        <div className="space-y-2">
          <h4 className="text-blue-400 font-semibold flex items-center gap-2">
            <Smartphone className="w-4 h-4" />
            Mobile
          </h4>
          <div className="space-y-1 text-sm text-gray-300">
            <p>👆 Swipe to move</p>
            <p>👇 Tap objects to interact</p>
          </div>
        </div>
        
        {/* Tips */}
        <div className="border-t border-gray-700 pt-3">
          <p className="text-xs text-gray-400">
            💡 <span className="text-gray-300">Tip:</span> Look for glowing objects - they're interactive! Explore all zones to discover hidden secrets.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Controls;