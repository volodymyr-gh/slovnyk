import React from 'react';
import { Container, Menu } from 'semantic-ui-react';
import { WordModal } from '../WordModal';

export const MainMenu = ({ addWord }) => (
  <Menu fixed='top' inverted>
    <Container>
      <Menu.Item header>
        Slovnyk
      </Menu.Item>
      <WordModal
        trigger={<Menu.Item>Add</Menu.Item>}
        saveWord={addWord}
      />
      <Menu.Item onClick={() => alert("You clicked Import")}>
        Import
      </Menu.Item>
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
