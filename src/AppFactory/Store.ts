import App from './App';
import { storage, storageItems, storageValues } from '../types';

const initialStorage: storage = {
  navigationList: ['Main Menu', 'Liked'],
}

class Store {
  static rendered: Store;
  private storage: storage;
  public app: App;

  constructor() {
    this.storage = initialStorage;
    this.app = null;

    if (!Store.rendered) {
      Store.rendered = this;
    }

    return Store.rendered;
  }

  setStorage(item: storageItems, value: storageValues) {
    this.storage[item] = value;
    return this;
  }

  getStorage(item: storageItems) {
    return this.storage[item];
  }

  dispatch(action: string, payload: any) {
    switch (action) {
      case 'change': {
        this.storage.navigationList = payload;
      }
    }

    this.app.rerender();
  }
}

export default Store;
