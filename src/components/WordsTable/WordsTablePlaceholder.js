import React from 'react';
import { Button, Message } from 'semantic-ui-react';
import { WordModal } from '../WordModal';

export const WordsTablePlaceholder = ({ search, addWord }) => {
  const wordModalTrigger = (
    <Button style={{ marginLeft: '1em' }} color='green'>
      Add
    </Button>
  );

  return (
    <Message visible>
      {search.length > 0 ? (
        <>
          "{search}" not found
          <WordModal
            trigger={wordModalTrigger}
            word={{ name: search, meaning: '' }}
            saveWord={addWord}
          />
        </>
      ) : (
        <>No words found</>
      )}
    </Message>
  );
};
