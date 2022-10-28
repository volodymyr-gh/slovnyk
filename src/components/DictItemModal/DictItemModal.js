import React, { useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { DictItemForm } from '../DictItemForm';

const DICT_ITEM_FORM_ID = 'dict-item-form';

export const DictItemModal = ({ trigger, dictItem, saveDictItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const saveDictItemAndClose = (...args) => {
    saveDictItem(...args);
    close();
  };

  return (
    <Modal
      centered={false}
      dimmer={'blurring'}
      size={'fullscreen'}
      open={isOpen}
      closeOnDimmerClick={false}
      onClose={close}
      onOpen={open}
      trigger={trigger}
    >
      <Modal.Header>Save word or idiom</Modal.Header>
      <Modal.Content>
        <DictItemForm
          formId={DICT_ITEM_FORM_ID}
          dictItem={dictItem}
          saveDictItem={saveDictItemAndClose}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button color='teal' onClick={close}>
          Cancel
        </Button>
        <Button type='submit' form={DICT_ITEM_FORM_ID} color='pink'>
          Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
