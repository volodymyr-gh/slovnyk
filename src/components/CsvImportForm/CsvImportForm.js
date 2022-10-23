import React, { useState } from 'react';
import { Form, Input } from 'semantic-ui-react';

export const CsvImportForm = ({ formId, importFromCsv }) => {
  const [file, setFile] = useState(null);

  const submit = () => {
    if (!file) return;
    importFromCsv(file);
  };

  return (
    <Form id={formId} onSubmit={submit}>
      <Input type='file' onChange={e => setFile(e.target.files[0])} />
    </Form>
  );
};
