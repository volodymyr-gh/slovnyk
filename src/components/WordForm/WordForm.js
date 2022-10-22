import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';

export const WordForm = ({ formId, word, saveWord }) => {
  const [updatedName, updateName] = useState(word ? word.name : '');
  const [updatedMeaning, updateMeaning] = useState(word ? word.meaning : '');

  const submit = () => {
    if (!updatedName || !updatedMeaning) {
      return;
    }

    saveWord({
      name: updatedName,
      meaning: updatedMeaning
    });
  };

  return (
    <Form id={formId} onSubmit={submit}>
      <Form.Field>
        <label>Word or idiom</label>
        <input
          readOnly={!!word}
          value={updatedName}
          onChange={e => updateName(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>Meaning</label>
        <textarea
          value={updatedMeaning}
          onChange={e => updateMeaning(e.target.value)}
        />
      </Form.Field>
    </Form>
  );
};
