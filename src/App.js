import React, { useState } from 'react';
import { MainMenu } from './components/MainMenu';
import { WordsTable } from './components/WordsTable';
import { wordsRepository } from './wordsRepository';

export const App = () => {
  const [words, setWords] = useState(wordsRepository.getAllWords());

  const addWord = ({ name, meaning }) =>
    setWords(wordsRepository.addWord({ name, meaning }));

  const importFromCsv = (file) => {
    wordsRepository.importFromCsv(file)
      .then(setWords)
      .catch(() => alert('Failed to import CSV file'));
  };

  const updateWord = ({ name, meaning }) =>
    setWords(wordsRepository.updateWord({ name, meaning }));

  return (
    <div id="app">
      <MainMenu addWord={addWord} importFromCsv={importFromCsv} />
      <WordsTable words={words} updateWord={updateWord} />
    </div>
  );
};
