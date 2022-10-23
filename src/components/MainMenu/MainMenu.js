import React from 'react';
import { Container, Menu } from 'semantic-ui-react';
import { CsvImportModal } from '../CsvImportModal';
import { WordModal } from '../WordModal';

export const MainMenu = ({ addWord, importFromCsv }) => (
  <Menu fixed='top' inverted>
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
      <Menu.Item onClick={() => alert("You clicked Export")}>
        Export
      </Menu.Item>
      <Menu.Menu position='right'>
        <Menu.Item onClick={() => alert("You clicked About")}>
          About
        </Menu.Item>
      </Menu.Menu>
    </Container>
  </Menu>
);
