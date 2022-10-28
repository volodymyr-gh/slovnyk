import React from 'react';
import debounce from 'debounce';
import { Container, Dropdown, Input, Menu } from 'semantic-ui-react';
import { HidingMode, SortingMode } from './constants';

export const DictItemsTableMenu = ({
  setSearch,
  setSortingMode,
  setHidingMode
}) => {
  const onSearchInputChange = debounce(e => setSearch(e.target.value), 500);

  return (
    <Menu secondary>
      <Container style={{ marginTop: '5em' }}>
        <Menu.Item fitted>
          <Input
            icon='search'
            placeholder='Search...'
            onChange={onSearchInputChange}
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
                  onClick={() => setHidingMode(HidingMode.WORDS_HIDDEN)}
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
                  onClick={() => setSortingMode(SortingMode.WORD_ASC)}
                />
                <Dropdown.Item
                  text='Z-A'
                  onClick={() => setSortingMode(SortingMode.WORD_DESC)}
                />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};
