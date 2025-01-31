import { create, createStore } from 'zustand';

type GameState = {
  words: { word: string; hint: string }[];
  currentWord: string;
  scrambledWord: string;
  hint: string;
  score: number;
  timer: number;
  isTimeUp: boolean;
  scrambleWord: () => void;
  decrementTimer: () => void;
  resetGame: () => void;
  checkGuess: (guess: string) => boolean;
};

const shuffle = (word: string) => word.split('').sort(() => Math.random() - 0.5).join('');
    
export const useGameStore = create<GameState>((set, get) => ({
    words: [
        { word: 'elephant', hint: 'A large mammal with a trunk' },
        { word: 'penguin', hint: 'A black and white bird that cannot fly' },
        { word: 'kangaroo', hint: 'An animal that jumps and carries babies in a pouch' },
        { word: 'giraffe', hint: 'The tallest animal on land' },
        { word: 'dolphin', hint: 'A smart marine mammal known for jumping' },
        { word: 'rainbow', hint: 'A colorful arc in the sky after rain' },
        { word: 'volcano', hint: 'A mountain that erupts lava' },
        { word: 'hurricane', hint: 'A powerful storm with strong winds' },
        { word: 'tsunami', hint: 'A giant ocean wave caused by an earthquake' },
        { word: 'sunflower', hint: 'A tall plant that follows the sun' },
        { word: 'chocolate', hint: 'A sweet treat made from cocoa' },
        { word: 'pancake', hint: 'A breakfast food made from batter' },
        { word: 'spaghetti', hint: 'A type of long, thin pasta' },
        { word: 'pineapple', hint: 'A tropical fruit with spiky leaves' },
        { word: 'strawberry', hint: 'A small red fruit with seeds on the outside' },
        { word: 'pyramid', hint: 'An ancient triangular structure' },
        { word: 'ocean', hint: 'A vast body of saltwater' },
        { word: 'desert', hint: 'A dry, sandy place with little rain' },
        { word: 'airport', hint: 'A place where airplanes take off and land' },
        { word: 'castle', hint: 'A large historical building where kings lived' },
        { word: 'guitar', hint: 'A musical instrument with strings' },
        { word: 'bicycle', hint: 'A two-wheeled vehicle you pedal' },
        { word: 'mirror', hint: 'You see your reflection in it' },
        { word: 'lantern', hint: 'A portable light source' },
        { word: 'umbrella', hint: 'Used to protect yourself from rain' },
        { word: 'baseball', hint: 'A sport played with a bat and ball' },
        { word: 'chess', hint: 'A strategy game played on a checkered board' },
        { word: 'bowling', hint: 'A game where you roll a ball to knock down pins' },
        { word: 'tennis', hint: 'A sport played with a racket and a ball' },
        { word: 'boxing', hint: 'A combat sport where players wear gloves' }
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
