const STORAGE_KEY = 'words';

export class Dictionary {
  constructor(storage, requestIdleCallback, csvParser) {
    this._storage = storage;
    this._requestIdleCallback = requestIdleCallback;
    this._csvParser = csvParser;
    this._cache = null;
  }

  getAllItems() {
    this._readFromStorageIfNeeded();
    return this._getCachedItemsAsArray();
  }

  _readFromStorageIfNeeded() {
    if (this._cache === null) {
      const storedItems = this._storage.getItem(STORAGE_KEY) || '{}';

      this._cache = JSON.parse(storedItems, (key, value) => {
        if (key === 'addedAt') {
          return new Date(value);
        }
        return value;
      });
    }
  }

  _getCachedItemsAsArray() {
    return Object.entries(this._cache)
      .map(([word, { meaning, addedAt }]) => ({ word, meaning, addedAt }));
  }

  addItem({ word, meaning }) {
    return this._saveItem(word, meaning, false);
  }

  updateItem({ word, meaning }) {
    return this._saveItem(word, meaning, true);
  }

  _saveItem(word, meaning, shouldReplaceExisting = false) {
    const doesNotExist = !(word in this._cache);

    if (doesNotExist || shouldReplaceExisting) {
      const updatedItems = Object.assign({}, this._cache, {
        [word]: { meaning, addedAt: new Date() }
      });

      this._updateCache(updatedItems);
    }

    return this._getCachedItemsAsArray();
  }

  _updateCache(updatedItems) {
    this._cache = updatedItems;
    this._updateStorage();
  }

  _updateStorage() {
    this._requestIdleCallback(() => {
      if (this._cache === null) return;
      const itemsStringified = JSON.stringify(this._cache);
      this._storage.setItem(STORAGE_KEY, itemsStringified);
    });
  }

  async importFromCsv(file) {
    const parseResult = await this._csvParser.parseFile(file);

    const updatedItems = parseResult
      .reduce((acc, [word, meaning, addedAtStr]) => ({
        ...acc,
        [word]: { meaning, addedAt: new Date(addedAtStr) }
      }), {});

    this._updateCache(updatedItems);

    return this._getCachedItemsAsArray();
  }

  exportAsCsv() {
    const items = this._getCachedItemsAsArray()
      .map(({ word, meaning, addedAt }) =>
        [word, meaning, addedAt.toISOString()]);

    return this._csvParser.toCsv(items);
  }
}
