import './utils/devSetting.js';

import simpleShadowDom from 'simple-shadow-dom';
import eachStyle from './style/each';
import './style/global.scss';

import Header from './Components/Header';
import MainPage from './Components/MainPage';
import LikedPage from './Components/LikedPage';
import PreviewPage from './Components/PreviewPage';
import DetailPage from './Components/DetailPage';

const root = document.getElementById('root');
const render = (shadowClass: typeof simpleShadowDom, tagName: string) =>
  simpleShadowDom.render(root, shadowClass, tagName);

simpleShadowDom.setEachStyle(eachStyle);

render(Header, 'shadow-header');
render(MainPage, 'shadow-main');
render(LikedPage, 'shadow-liked');
render(PreviewPage, 'shadow-preview');
render(DetailPage, 'shadow-detail');
