import React, { useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { WordForm } from '../WordForm';

const WORD_FORM_ID = 'word-form';

export const WordModal = ({ trigger, word, saveWord }) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const saveWordAndClose = (...args) => {
    saveWord(...args);
    close();
  };

  return (
    <Modal
      open={isOpen}
      centered={false}
      closeOnDimmerClick={false}
      onClose={close}
      onOpen={open}
      trigger={trigger}
    >
      <Modal.Header>Save word or idiom</Modal.Header>
      <Modal.Content>
        <WordForm
          formId={WORD_FORM_ID}
          word={word}
          saveWord={saveWordAndClose}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={close}>
          Cancel
        </Button>
        <Button type='submit' form={WORD_FORM_ID} color='green'>
          Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
