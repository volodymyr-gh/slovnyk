import { CsvParser } from './lib/CsvParser';
import { WordsRepository } from './lib/WordsRepository';

export const wordsRepository = new WordsRepository(
  window.localStorage,
  window.requestIdleCallback.bind(window),
  new CsvParser()
);
