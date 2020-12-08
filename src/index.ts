import './utils/devSetting.js';

import App, { setStore } from './_Factory/App';
import { Div, render } from './_Factory/Element';
import store from './store';

import Header from './Components/Header';
import PageRouter from './Container/PageRouter';

import './style/global.scss';
import './index.scss';

function Main() {
  return render(
    Div({ class: 'Main-Wrapper' })(
      PageRouter()(),
    )
  );
}

const root = document.querySelector('#root');
const header = document.querySelector('#header');

setStore(store);

App.renderOnce(Header, header);
App.render(Main, root);
