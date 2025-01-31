import { create, createStore } from 'zustand';

type GameState = {
  words: { word: string; hint: string }[];
  currentWord: string;
  scrambledWord: string;
  hint: string;
  score: number;
  timer: number;
  isTimeUp: boolean;
  scrambleWord: () => any;
  decrementTimer: () => any;
  resetGame: () => any;
  checkGuess: (guess: string) => boolean;
};

const shuffle = (word: string) => word.split('').sort(() => Math.random() - 0.5).join('');

export const useGameStore = create<GameState>((set, get) => ({
  words: [
    { word: 'elephant', hint: 'A large mammal with a trunk' },
    { word: 'pyramid', hint: 'An ancient triangular structure' },
    { word: 'ocean', hint: 'A vast body of saltwater' },
    { word: 'guitar', hint: 'A musical instrument with strings' },
    { word: 'sunflower', hint: 'A tall plant that follows the sun' },
    { word: 'diamond', hint: 'A precious gemstone' },
    { word: 'chocolate', hint: 'A sweet treat made from cocoa' },
    { word: 'volcano', hint: 'A mountain that erupts lava' },
    { word: 'penguin', hint: 'A black and white bird that cannot fly' },
    { word: 'rainbow', hint: 'A colorful arc in the sky after rain' },
  ],
  currentWord: '',
  scrambledWord: '',
  hint: '',
  score: 0,
  timer: 30,
  isTimeUp: false,
  
  scrambleWord: () => {
    const { words } = get();
    const randomWord = words[Math.floor(Math.random() * words.length)];
    set({
      currentWord: randomWord.word,
      scrambledWord: shuffle(randomWord.word),
      hint: randomWord.hint,
      timer: 30,
      isTimeUp: false,
    });
  },

  decrementTimer: () => {
    const { timer } = get();
    if (timer > 0) {
      set({ timer: timer - 1 });
    } else {
      set({ isTimeUp: true });
    }
  },

  resetGame: () => {
    get().scrambleWord();
    set({ score: 0 });
  },

  checkGuess: (guess) => {
    const { currentWord, score } = get();
    if (guess.toLowerCase() === currentWord.toLowerCase()) {
      set({ score: score + 1 });
      get().scrambleWord();
      return true;
    }
    return false;
  },
}));
