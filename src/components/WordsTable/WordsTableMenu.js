import React from 'react';
import { Container, Dropdown, Input, Menu } from 'semantic-ui-react';
import { HidingMode, SortingMode } from './constants';

export const WordsTableMenu = ({
  search,
  setSearch,
  setSortingMode,
  setHidingMode
}) => (
  <Menu secondary>
    <Container style={{ marginTop: '5em' }}>
      <Menu.Item fitted>
        <Input
          icon='search'
          placeholder='Search...'
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </Menu.Item>
      <Menu.Menu position='right'>
        <Menu.Item fitted>
          <Dropdown
            text='Hide'
            icon='eye slash'
            floating
            labeled
            button
            className='icon'
          >
            <Dropdown.Menu>
              <Dropdown.Item
                text='Do not hide'
                onClick={() => setHidingMode(HidingMode.ALL_VISIBLE)}
              />
              <Dropdown.Item
                text='Hide words'
                onClick={() => setHidingMode(HidingMode.NAMES_HIDDEN)}
              />
              <Dropdown.Item
                text='Hide meanings'
                onClick={() => setHidingMode(HidingMode.MEANINGS_HIDDEN)}
              />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
        <Menu.Item fitted>
          <Dropdown
            text='Sort'
            icon='sort'
            floating
            labeled
            button
            className='icon'
          >
            <Dropdown.Menu>
              <Dropdown.Item
                text='Date added'
                onClick={() => setSortingMode(SortingMode.DATE_ADDED_DESC)}
              />
              <Dropdown.Item
                text='A-Z'
                onClick={() => setSortingMode(SortingMode.NAME_ASC)}
              />
              <Dropdown.Item
                text='Z-A'
                onClick={() => setSortingMode(SortingMode.NAME_DESC)}
              />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Menu.Menu>
    </Container>
  </Menu>
);
