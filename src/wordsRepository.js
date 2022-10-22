import { WordsRepository } from './lib/WordsRepository';

export const wordsRepository = new WordsRepository(window.localStorage);
