import { request as requestIdleCallbackShim } from 'requestidlecallback';
import { CsvParser } from './lib/CsvParser';
import { Dictionary } from './lib/Dictionary';

export const dictionary = new Dictionary(
  window.localStorage,
  requestIdleCallbackShim,
  new CsvParser()
);
