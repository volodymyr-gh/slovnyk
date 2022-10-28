import React, { useState } from 'react';
import { pipe } from '../../helpers';
import { HidingMode, SortingMode } from './constants';
import { getFilterByNameFn, getSortFn } from './helpers';
import { WordsTable } from './WordsTable';
import { WordsTableMenu } from './WordsTableMenu';

export const WordsTableContainer = ({ words: initialWords, updateWord }) => {
  const [search, setSearch] = useState('');
  const [hidingMode, setHidingMode] = useState(HidingMode.ALL_VISIBLE);
  const [sortingMode, setSortingMode] = useState(SortingMode.DATE_ADDED_DESC);

  const sort = getSortFn(sortingMode);
  const filterByName = getFilterByNameFn(search);

  const words = pipe(filterByName, sort)(initialWords);

  return (
    <>
      <WordsTableMenu
        setSearch={setSearch}
        setSortingMode={setSortingMode}
        setHidingMode={setHidingMode}
      />
      <WordsTable
        hidingMode={hidingMode}
        words={words}
        updateWord={updateWord}
      />
    </>
  );
};
