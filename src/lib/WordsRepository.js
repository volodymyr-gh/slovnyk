const STORAGE_KEY = 'words';

const MOCK_WORDS = {
  ditch: {
    meaning: 'a narrow channel dug in the ground, typically used for drainage alongside a road or the edge of a field (канава)',
    addedAt: new Date('2022-10-19T21:35:16.437Z')
  },
  trait: {
    meaning: 'a particular characteristic, quality, or tendency that someone or something has (риса)',
    addedAt: new Date('2022-10-18T21:35:16.437Z')
  },
  inculcate: {
    meaning: 'to cause someone to have particular beliefs or values by repeating them frequently (прищеплювати)',
    addedAt: new Date('2022-10-20T21:35:16.437Z')
  }
};

export class WordsRepository {
  constructor(storage, csvParser) {
    this._storage = storage;
    this._csvParser = csvParser;
    this._cache = null;
  }

  getAllWords() {
    this._readFromStorageIfNeeded();
    return this._getCachedWordsAsArray();
  }

  _readFromStorageIfNeeded() {
    if (this._cache === null) {
      this._cache = MOCK_WORDS;
    }
  }

  _getCachedWordsAsArray() {
    return Object.entries(this._cache)
      .map(([name, { meaning, addedAt }]) => ({ name, meaning, addedAt }));
  }

  addWord({ name, meaning }) {
    return this._saveWord(name, meaning, false);
  }

  updateWord({ name, meaning }) {
    return this._saveWord(name, meaning, true);
  }

  _saveWord(name, meaning, shouldReplaceExisting = false) {
    const doesNotExist = !(name in this._cache);

    if (doesNotExist || shouldReplaceExisting) {
      const updatedWords = Object.assign({}, this._cache, {
        [name]: { meaning, addedAt: new Date() }
      });

      this._updateCache(updatedWords);
    }

    return this._getCachedWordsAsArray();
  }

  _updateCache(updatedWords) {
    this._cache = updatedWords;
    this._updateStorage();
  }

  _updateStorage() {

  }

  async importFromCsv(file) {
    const parseResult = await this._csvParser.parseFile(file);

    const updatedWords = parseResult
      .reduce((acc, [name, meaning, addedAtStr]) => ({
        ...acc,
        [name]: { meaning, addedAt: new Date(addedAtStr) }
      }), {});

    this._updateCache(updatedWords);

    return this._getCachedWordsAsArray();
  }

  exportAsCsv() {
    const words = this._getCachedWordsAsArray()
      .map(({ name, meaning, addedAt }) =>
        [name, meaning, addedAt.toISOString()]);

    return this._csvParser.toCsv(words);
  }
}
