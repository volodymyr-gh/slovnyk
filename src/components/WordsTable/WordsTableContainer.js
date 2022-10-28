import React, { useState } from 'react';
import { Container } from 'semantic-ui-react';
import { pipe } from '../../helpers';
import { HidingMode, SortingMode } from './constants';
import { getFilterByNameFn, getSortFn } from './helpers';
import { WordsTable } from './WordsTable';
import { WordsTableMenu } from './WordsTableMenu';
import { WordsTablePlaceholder } from './WordsTablePlaceholder';

export const WordsTableContainer = ({
  words: initialWords,
  addWord,
  updateWord
}) => {
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
      <Container style={{ marginTop: '2em', paddingBottom: '4em' }}>
        {words.length > 0 ? (
          <WordsTable
            hidingMode={hidingMode}
            words={words}
            updateWord={updateWord}
          />
        ) : (
          <WordsTablePlaceholder
            search={search}
            addWord={addWord}
          />
        )}
      </Container>
    </>
  );
};
