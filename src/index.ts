import './utils/devSetting.js';

// import App, { setStore } from './_Factory/App';
// import { Div, render } from './_Factory/Element';
// import store from './store';

// import Header from './Components/Header';
// import PageRouter from './Container/PageRouter';

// import './utils/stickyHeader';
import './style/global.scss';
// import './index.scss';

// const root = document.querySelector('#root');
// const header = document.querySelector('#header');

// setStore(store);

// App.renderOnce(Header, header);
// App.render(() => {
//   return render(
//     Div({ class: 'Main-Wrapper' })(
//       PageRouter()(),
//     )
//   );
// }, root);
import Header from './Components/ShadowHeader';
import MainPage from './Components/ShadowMainPage';
import TinyComponent from './_Factory/ShadowComponent.js';

const root = document.getElementById('root');
TinyComponent.render(root, Header, 'shadow-header');
TinyComponent.render(root, MainPage, 'shadow-main');
