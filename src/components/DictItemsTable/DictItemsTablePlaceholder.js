import React from 'react';
import { Button, Message } from 'semantic-ui-react';
import { DictItemModal } from '../DictItemModal';

export const DictItemsTablePlaceholder = ({ search, addDictItem }) => {
  const dictItemModalTrigger = (
    <Button style={{ marginLeft: '1em' }} color='pink'>
      Add
    </Button>
  );

  return (
    <Message visible>
      {search.length > 0 ? (
        <>
          "{search}" not found
          <DictItemModal
            trigger={dictItemModalTrigger}
            dictItem={{ word: search, meaning: '' }}
            saveDictItem={addDictItem}
          />
        </>
      ) : (
        <>No words found</>
      )}
    </Message>
  );
};
