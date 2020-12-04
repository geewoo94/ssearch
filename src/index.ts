import App, { useState } from './_Factory/App';
import { Div, render } from './_Factory/Element';

import NavigationContainer from './Container.ts/NavigationContainer';
import PageContainer from './Container.ts/PageContainer';

import './style/global.scss';
import './index.scss';

function Main(): Function {
  const [ currentPage, setCurrentPage ] = useState('Main');

  const handleChangeMenu = (page: string) => {
    setCurrentPage(page);
  }

  return render(
    Div({ class: 'Main-Wrapper' })(
      NavigationContainer({
        changeMenu: handleChangeMenu
      })(),
      PageContainer({ page: currentPage })(),
    )
  );
};

const root = document.querySelector('#root');
App.render(Main,root);
