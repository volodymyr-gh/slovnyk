const STORAGE_KEY = 'words';

export class WordsRepository {
  constructor(storage, requestIdleCallback, csvParser) {
    this._storage = storage;
    this._requestIdleCallback = requestIdleCallback;
    this._csvParser = csvParser;
    this._cache = null;
  }

  getAllWords() {
    this._readFromStorageIfNeeded();
    return this._getCachedWordsAsArray();
  }

  _readFromStorageIfNeeded() {
    if (this._cache === null) {
      const storedWords = this._storage.getItem(STORAGE_KEY) || '{}';

      this._cache = JSON.parse(storedWords, (key, value) => {
        if (key === 'addedAt') {
          return new Date(value);
        }
        return value;
      });
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
    this._requestIdleCallback(() => {
      if (this._cache === null) return;
      const wordsStringified = JSON.stringify(this._cache);
      this._storage.setItem(STORAGE_KEY, wordsStringified);
    });
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
