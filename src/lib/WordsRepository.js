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
  constructor(storage) {
    this._storage = storage;
    this._cache = null;
  }

  getAllWords() {
    if (this._cache === null) {
      this._cache = this._readFromStorage();
    }

    return this._cacheAsArray();
  }

  _readFromStorage() {
    return MOCK_WORDS;
  }

  _cacheAsArray() {
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
      this._cache = Object.assign({}, this._cache, {
        [name]: { meaning, addedAt: new Date() }
      });
    }

    this._updateStorage();

    return this._cacheAsArray();
  }

  _updateStorage() {

  }
}
