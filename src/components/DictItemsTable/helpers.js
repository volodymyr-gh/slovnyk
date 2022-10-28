import { SortingMode } from './constants';

export const getFilterByWordFn = (word) => {
  const re = new RegExp(`^${word}`, 'i');

  return dictItems => word
    ? dictItems.filter(item => re.test(item.word))
    : dictItems;
};

const compareWords = (word1, word2) => {
  if (word1 > word2) return 1;
  if (word1 < word2) return -1;
  return 0;
};

const sortByWordAsc = dictItems =>
  [...dictItems].sort((di1, di2) => compareWords(di1.word, di2.word));

const sortByWordDesc = dictItems =>
  [...dictItems].sort((di1, di2) => compareWords(di2.word, di1.word));

const sortByDateAdded = dictItems =>
  [...dictItems].sort((di1, di2) => di2.addedAt - di1.addedAt);

export const getSortFn = (sortingMode) => {
  switch (sortingMode) {
    case SortingMode.DATE_ADDED_DESC:
      return sortByDateAdded;
    case SortingMode.WORD_ASC:
      return sortByWordAsc;
    case SortingMode.WORD_DESC:
      return sortByWordDesc;
    default:
      throw new Error(`Sorting mode ${sortingMode} is not implemented`);
  }
};
