import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';

export const DictItemForm = ({ formId, dictItem, saveDictItem }) => {
  const [updatedWord, updateWord] = useState(dictItem ? dictItem.word : '');
  const [updatedMeaning, updateMeaning] = useState(dictItem ? dictItem.meaning : '');

  const submit = () => {
    if (!updatedWord || !updatedMeaning) {
      return;
    }

    saveDictItem({
      word: updatedWord,
      meaning: updatedMeaning
    });
  };

  return (
    <Form id={formId} onSubmit={submit}>
      <Form.Field>
        <label>Word or idiom</label>
        <input
          readOnly={!!dictItem}
          value={updatedWord}
          onChange={e => updateWord(e.target.value)}
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
