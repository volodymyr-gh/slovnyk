import React, { useState } from 'react';
import { Container } from 'semantic-ui-react';
import { pipe } from '../../helpers';
import { HidingMode, SortingMode } from './constants';
import { getFilterByWordFn, getSortFn } from './helpers';
import { DictItemsTable } from './DictItemsTable';
import { DictItemsTableMenu } from './DictItemsTableMenu';
import { DictItemsTablePlaceholder } from './DictItemsTablePlaceholder';

export const DictItemsTableContainer = ({
  dictItems: initialDictItems,
  addDictItem,
  updateDictItem
}) => {
  const [search, setSearch] = useState('');
  const [hidingMode, setHidingMode] = useState(HidingMode.ALL_VISIBLE);
  const [sortingMode, setSortingMode] = useState(SortingMode.DATE_ADDED_DESC);

  const sort = getSortFn(sortingMode);
  const filterByWord = getFilterByWordFn(search);

  const dictItems = pipe(filterByWord, sort)(initialDictItems);

  return (
    <>
      <DictItemsTableMenu
        setSearch={setSearch}
        setSortingMode={setSortingMode}
        setHidingMode={setHidingMode}
      />
      <Container style={{ marginTop: '2em', paddingBottom: '4em' }}>
        {dictItems.length > 0 ? (
          <DictItemsTable
            hidingMode={hidingMode}
            dictItems={dictItems}
            updateDictItem={updateDictItem}
          />
        ) : (
          <DictItemsTablePlaceholder
            search={search}
            addDictItem={addDictItem}
          />
        )}
      </Container>
    </>
  );
};
