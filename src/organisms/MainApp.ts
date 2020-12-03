import { Component, Store } from '../AppFactory';
import Navigation from './Navigation';

const store = new Store();

const MainApp = () => {
  const navigationList = store.getStorage('navigationList');

  return (
    new Component('div')
      .setChild(Navigation, { navigationList })
      .render()
  );
}

export default MainApp;
