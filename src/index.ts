import App, { useState } from './_Factory/App';
import { Div, render } from './_Factory/Element';

import NavigationContainer from './Container.ts/NavigationContainer';
import PageRouter from './Container.ts/PageRouter';

import './style/global.scss';
import './index.scss';

function Main(): render {
  const [ currentPage, setCurrentPage ] = useState('Main');

  function handleChangeMenu(page: string) {
    setCurrentPage(page);
  }

  return render(
    Div({ class: 'Main-Wrapper' })(
      NavigationContainer({
        changeMenu: handleChangeMenu
      })(),
      PageRouter({ page: currentPage })(),
    )
  );
}

const root = document.querySelector('#root');
App.render(Main, root);
