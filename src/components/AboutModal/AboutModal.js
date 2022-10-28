import React, { useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';

export const AboutModal = ({ trigger, appVersion }) => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

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
      <Modal.Header>About</Modal.Header>
      <Modal.Content>
        <p>Version {appVersion}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button color='pink' onClick={close}>
          OK
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
