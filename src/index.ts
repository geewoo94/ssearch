import {
  App,
  Store,
} from './AppFactory';
import MainApp from './organisms/MainApp';

const app = new App();
const store = new Store();

app.setStore(store);
app.render(MainApp, document.querySelector('#root'));
