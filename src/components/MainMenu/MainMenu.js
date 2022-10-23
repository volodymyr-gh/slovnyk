import React from 'react';
import { Container, Menu } from 'semantic-ui-react';
import { AboutModal } from '../AboutModal';
import { CsvImportModal } from '../CsvImportModal';
import { WordModal } from '../WordModal';

export const MainMenu = ({
  addWord,
  importFromCsv,
  exportAsCsv,
  appVersion
}) => (
  <Menu fixed='top'>
    <Container>
      <Menu.Item header>
        Slovnyk
      </Menu.Item>
      <WordModal
        trigger={<Menu.Item>Add</Menu.Item>}
        saveWord={addWord}
      />
      <CsvImportModal
        trigger={<Menu.Item>Import</Menu.Item>}
        importFromCsv={importFromCsv}
      />
      <Menu.Item onClick={exportAsCsv}>
        Export
      </Menu.Item>
      <Menu.Menu position='right'>
        <AboutModal
          trigger={<Menu.Item>About</Menu.Item>}
          appVersion={appVersion}
        />
      </Menu.Menu>
    </Container>
  </Menu>
);
