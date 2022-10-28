import React from 'react';
import { Table } from 'semantic-ui-react';
import { DictItemModal } from '../DictItemModal';
import { WithBlurEffect } from '../WithBlurEffect';
import { HidingMode } from './constants';

export const DictItemsTable = ({ hidingMode, dictItems, updateDictItem }) => {
  const shouldBlurNames = hidingMode === HidingMode.WORDS_HIDDEN;
  const shouldBlurMeanings = hidingMode === HidingMode.MEANINGS_HIDDEN;

  return (
    <Table fixed celled striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={4}>Word or idiom</Table.HeaderCell>
          <Table.HeaderCell>Meaning</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {dictItems.map(di => (
          <Table.Row key={di.word}>
            <Table.Cell>
              <WithBlurEffect applyBlur={shouldBlurNames}>
                <DictItemModal
                  trigger={<a href='#'>{di.word}</a>}
                  dictItem={di}
                  saveDictItem={updateDictItem}
                />
              </WithBlurEffect>
            </Table.Cell>
            <Table.Cell>
              <WithBlurEffect applyBlur={shouldBlurMeanings}>
                {di.meaning}
              </WithBlurEffect>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
