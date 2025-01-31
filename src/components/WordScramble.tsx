'use client';

import React, { useState, useEffect } from 'react';
import { useGameStore } from '../app/store/useGameStore';

const WordScramble = () => {
  const { scrambledWord, hint, scrambleWord, checkGuess, score, timer, decrementTimer, isTimeUp, resetGame } = useGameStore();
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    scrambleWord();
  }, [scrambleWord]);

  useEffect(() => {
    if (isTimeUp) return;

    const interval = setInterval(() => {
      decrementTimer();
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, isTimeUp, decrementTimer]);

  const handleGuess = () => {
    if (checkGuess(guess)) {
      setFeedback('Correct! 🎉');
    } else {
      setFeedback('Try again! ❌');
    }
    setGuess('');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Word Scramble Game</h1>
      <div className="bg-white shadow-md rounded-md p-6 w-full max-w-md">
        {isTimeUp ? (
          <div className="flex flex-col items-center">
            <p className="text-xl font-semibold text-red-600 mb-4">Time’s up! ⏰</p>
            <button
              onClick={resetGame}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <p className="text-xl font-semibold mb-2">Scrambled Word:</p>
            <p className="text-2xl lg:text-3xl font-bold text-blue-600 mb-4">{scrambledWord}</p>
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
            {feedback && <p className="mt-4 text-lg">{feedback}</p>}
            <p className="mt-4 text-gray-700">Score: {score}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default WordScramble;
