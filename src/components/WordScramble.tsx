'use client';

import React, { useState, useEffect } from 'react';
import { useGameStore } from '../app/store/useGameStore';

const WordScramble = () => {
  const {
    scrambledWord,
    hint,
    scrambleWord,
    checkGuess,
    score,
    timer,
    decrementTimer,
    isTimeUp,
    resetGame,
  } = useGameStore();
  
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [showTryAgain, setShowTryAgain] = useState(false);

  useEffect(() => {
    scrambleWord();
  }, [scrambleWord]);

  useEffect(() => {
    if (isTimeUp) return; // Stop countdown if time is up

    const interval = setInterval(() => {
      decrementTimer();
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, isTimeUp, decrementTimer]);

  useEffect(() => {
    if (isTimeUp) {
      setShowTryAgain(true); // Show button when time is up

    }
  }, [isTimeUp]);

  const handleGuess = () => {
    if (checkGuess(guess)) {
      setFeedback('✅ Correct! 🎉');
    } else {
      setFeedback('❌ Try again!');
    }
    
    setShowFeedback(true);
    
    // Hide feedback after 5s
    setTimeout(() => {
      setShowFeedback(false);
    }, 5000);
    
    setGuess('');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Word Scramble Game</h1>
      <div className="bg-white shadow-md rounded-md p-6 w-full max-w-md">
        {isTimeUp ? (
          <div className="flex flex-col items-center">
            <p className="text-xl font-semibold text-red-600 mb-4">Time’s up! ⏰</p>
            {showTryAgain && (
              <button
                onClick={resetGame}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all"
              >
                Try Again
              </button>
            )}
          </div>
        ) : (
          <>
            <p className="text-xl font-semibold mb-2">Scrambled Word:</p>
            <p className="text-2xl font-bold text-blue-600 mb-4">{scrambledWord}</p>
            <p className="text-sm text-gray-600 mb-4">Hint: {hint}</p>
            <p className="text-sm text-red-600 mb-4">Time Left: {timer}s</p>
            <input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              className="w-full p-2 border rounded-md mb-4"
              placeholder="Your guess..."
            />
            <button
              onClick={handleGuess}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Submit Guess
            </button>
            {showFeedback && (
              <p className={`mt-4 text-lg font-semibold ${feedback.includes('Correct') ? 'text-green-600' : 'text-red-600'}`}>
                {feedback}
              </p>
            )}
            <p className="mt-4 text-gray-700">Score: {score}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default WordScramble;
