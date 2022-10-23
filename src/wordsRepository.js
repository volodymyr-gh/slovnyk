import { request as requestIdleCallbackShim } from 'requestidlecallback';
import { CsvParser } from './lib/CsvParser';
import { WordsRepository } from './lib/WordsRepository';

export const wordsRepository = new WordsRepository(
  window.localStorage,
  requestIdleCallbackShim,
  new CsvParser()
);
