import { createContext, useContext, useState } from 'react';

// Create the context:
const PhraseContext = createContext();

// Create a provider:
export function PhraseContextProvider({ children }) {
  const [currentPhrase, setCurrentPhrase] = useState('');

  function addWord(word) {
    setCurrentPhrase((prevPhrase) => {
      const newPhrase = prevPhrase.length > 0
        ? `${prevPhrase} ${word}`
        : word;
      return newPhrase;
    });
  }

  function deleteWord() {
    setCurrentPhrase((prevPhrase) => {
      // Remove first and last white spaces, and split in words:
      const words = prevPhrase.trim().split(' ');

      // Remove last word:
      words.pop();

      return words.join(' ');
    });
  }

  function clearPhrase() {
    setCurrentPhrase('');
  }

function speech() {
  const voices = speechSynthesis.getVoices();

  const femaleVoice = voices.find(v => 
    v.lang === "pt-BR" && v.name.toLowerCase().includes("female")
  ) || voices.find(v => v.lang === "pt-BR");

  const words = currentPhrase.trim().split(' ');
  const delay = 10;

  let index = 0;

  function speakNext() {
    if (index >= words.length) return;

    const utterance = new SpeechSynthesisUtterance(words[index]);
    utterance.lang = "pt-BR";
    utterance.voice = femaleVoice;
    utterance.pitch = 0.6;
    utterance.rate = 1.02;

    utterance.onend = () => {
      index++;
      setTimeout(speakNext, delay);
    };

    speechSynthesis.speak(utterance);
  }

  speakNext();
}

  return (
    <PhraseContext.Provider value={{ currentPhrase, addWord, clearPhrase, deleteWord, speech }}>
      {children}
    </PhraseContext.Provider>
  );
}

// Hook for context usage:
export function usePhrase() {
  return useContext(PhraseContext);
}