import React, { useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { CsvImportForm } from '../CsvImportForm';

const CSV_IMPORT_FORM_ID = 'csv-import-form';

export const CsvImportModal = ({ trigger, importFromCsv }) => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const importFromCsvAndClose = (...args) => {
    importFromCsv(...args);
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
      <Modal.Header>Import from a CSV file</Modal.Header>
      <Modal.Content>
        <CsvImportForm
          formId={CSV_IMPORT_FORM_ID}
          importFromCsv={importFromCsvAndClose}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={close}>
          Cancel
        </Button>
        <Button type='submit' form={CSV_IMPORT_FORM_ID} color='green'>
          Import
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
