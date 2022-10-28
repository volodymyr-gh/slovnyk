import React, { useState } from 'react';
import { DictItemsTable } from './components/DictItemsTable';
import { MainMenu } from './components/MainMenu';
import { createCsvDownloadLink } from './helpers';
import { dictionary } from './dictionary';

export const App = () => {
  const [dictItems, setDictItems] = useState(dictionary.getAllItems());

  const addDictItem = ({ word, meaning }) =>
    setDictItems(dictionary.addItem({ word, meaning }));

  const importFromCsv = (file) => {
    dictionary.importFromCsv(file)
      .then(setDictItems)
      .catch(() => alert('Failed to import CSV file'));
  };

  const downloadAsCsv = () => {
    const csv = dictionary.exportAsCsv();
    const link = createCsvDownloadLink(csv);

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const updateDictItem = ({ word, meaning }) =>
    setDictItems(dictionary.updateItem({ word, meaning }));

  return (
    <div id="app">
      <MainMenu
        addDictItem={addDictItem}
        importFromCsv={importFromCsv}
        exportAsCsv={downloadAsCsv}
        appVersion={process.env.REACT_APP_VERSION}
      />
      <DictItemsTable
        dictItems={dictItems}
        addDictItem={addDictItem}
        updateDictItem={updateDictItem}
      />
    </div>
  );
};
