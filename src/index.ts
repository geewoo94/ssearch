import App, { useState } from './_Factory/App';
import { Div, render } from './_Factory/Element';

import NavigationContainer from './Container.ts/NavigationContainer';
import PageContainer from './Container.ts/PageContainer';

import styled from './utils/styled';

const styledDiv = styled(Div);

const style = `
  color: red;
`;

function Main(): Function {
  const [ currentPage, setCurrentPage ] = useState('Main');

  const handleChangeMenu = (page: string) => {
    setCurrentPage(page);
  }

  return render(
    styledDiv(style)(
      NavigationContainer({
        changeMenu: handleChangeMenu
      })(),
      PageContainer({ page: currentPage })(),
    )
  );
};

const root = document.querySelector('#root');
App.render(Main,root);
