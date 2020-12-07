import App from './_Factory/App';
import { Div, render } from './_Factory/Element';
import './utils/devSetting.js';

import PageRouter from './Container/PageRouter';

import './style/global.scss';
import './index.scss';

function Main(): render {
  return render(
    Div({ class: 'Main-Wrapper' })(
      PageRouter()(),
    )
  );
}

const root = document.querySelector('#root');
App.render(Main, root);
