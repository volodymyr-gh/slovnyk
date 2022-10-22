import React from 'react';
import { Container, Table } from 'semantic-ui-react';
import { WithBlurEffect } from '../WithBlurEffect';
import { WordModal } from '../WordModal';
import { HidingMode } from './constants';

export const WordsTable = ({ hidingMode, words, updateWord }) => {
  const shouldBlurNames = hidingMode === HidingMode.NAMES_HIDDEN;
  const shouldBlurMeanings = hidingMode === HidingMode.MEANINGS_HIDDEN;

  return (
    <Container style={{ marginTop: '2em' }}>
      <Table fixed celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={4}>Word or idiom</Table.HeaderCell>
            <Table.HeaderCell>Meaning</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {words.map(word => (
            <Table.Row key={word.name}>
              <Table.Cell>
                <WithBlurEffect applyBlur={shouldBlurNames}>
                  <WordModal
                    trigger={<a href='#'>{word.name}</a>}
                    word={word}
                    saveWord={updateWord}
                  />
                </WithBlurEffect>
              </Table.Cell>
              <Table.Cell>
                <WithBlurEffect applyBlur={shouldBlurMeanings}>
                  {word.meaning}
                </WithBlurEffect>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
};
