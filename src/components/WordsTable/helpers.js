import { SortingMode } from './constants';

export const getFilterByNameFn = name => words =>
  name
    ? words.filter(w => w.name.startsWith(name))
    : words;

const compareNames = (name1, name2) => {
  if (name1 > name2) return 1;
  if (name1 < name2) return -1;
  return 0;
};

const sortByNameAsc = words =>
  [...words].sort((w1, w2) => compareNames(w1.name, w2.name));

const sortByNameDesc = words =>
  [...words].sort((w1, w2) => compareNames(w2.name, w1.name));

const sortByDateAdded = words =>
  [...words].sort((w1, w2) => w2.addedAt - w1.addedAt);

export const getSortFn = (sortingMode) => {
  switch (sortingMode) {
    case SortingMode.DATE_ADDED_DESC:
      return sortByDateAdded;
    case SortingMode.NAME_ASC:
      return sortByNameAsc;
    case SortingMode.NAME_DESC:
      return sortByNameDesc;
    default:
      throw new Error(`Sorting mode ${sortingMode} is not implemented`);
  }
};
